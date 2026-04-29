import {
  AfterViewInit,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  PLATFORM_ID,
  ViewChild,
  inject,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-shader-background',
  standalone: true,
  imports: [CommonModule],
  template: `
    <canvas #canvas class="shader-background-canvas" aria-hidden="true"></canvas>
    <div class="shader-background-overlay" aria-hidden="true"></div>
  `,
  styleUrl: './shader-background.component.css',
})
export class ShaderBackgroundComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas', { static: true }) private canvasRef?: ElementRef<HTMLCanvasElement>;

  private readonly platformId = inject(PLATFORM_ID);
  private readonly ngZone = inject(NgZone);

  private animationFrameId = 0;
  private resizeObserver?: ResizeObserver;
  private resizeListener?: () => void;
  private startTime = 0;
  private reducedMotion = false;
  private lowPowerViewport = false;

  private gl?: WebGLRenderingContext;
  private program?: WebGLProgram;
  private positionBuffer?: WebGLBuffer;
  private uniforms?: {
    resolution: WebGLUniformLocation | null;
    time: WebGLUniformLocation | null;
  };

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.ngZone.runOutsideAngular(() => {
      this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      this.lowPowerViewport = window.matchMedia('(max-width: 767px)').matches;
      this.initWebGl();
    });
  }

  ngOnDestroy(): void {
    this.stopAnimation();
    this.resizeObserver?.disconnect();
    this.resizeListener?.();
    this.releaseWebGl();
  }

  private initWebGl(): void {
    const canvas = this.canvasRef?.nativeElement;
    if (!canvas) {
      return;
    }

    const gl = canvas.getContext('webgl', {
      alpha: true,
      antialias: false,
      depth: false,
      failIfMajorPerformanceCaveat: true,
      powerPreference: 'low-power',
      premultipliedAlpha: true,
      stencil: false,
    });

    if (!gl) {
      canvas.classList.add('shader-background-canvas--unsupported');
      return;
    }

    const program = this.createProgram(gl);
    if (!program) {
      canvas.classList.add('shader-background-canvas--unsupported');
      return;
    }

    const positionBuffer = gl.createBuffer();
    if (!positionBuffer) {
      canvas.classList.add('shader-background-canvas--unsupported');
      gl.deleteProgram(program);
      return;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    this.gl = gl;
    this.program = program;
    this.positionBuffer = positionBuffer;
    this.uniforms = {
      resolution: gl.getUniformLocation(program, 'u_resolution'),
      time: gl.getUniformLocation(program, 'u_time'),
    };
    this.startTime = performance.now();

    this.watchResize(canvas);
    this.resizeCanvas();
    this.renderFrame(0);

    if (!this.reducedMotion && !this.lowPowerViewport) {
      this.animate();
    }
  }

  private watchResize(canvas: HTMLCanvasElement): void {
    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(() => {
        this.resizeCanvas();
        this.renderFrame(this.currentTime());
      });
      this.resizeObserver.observe(canvas);
      return;
    }

    const onResize = () => {
      this.resizeCanvas();
      this.renderFrame(this.currentTime());
    };
    window.addEventListener('resize', onResize, { passive: true });
    this.resizeListener = () => window.removeEventListener('resize', onResize);
  }

  private animate(): void {
    this.animationFrameId = window.requestAnimationFrame(() => {
      this.renderFrame(this.currentTime());
      this.animate();
    });
  }

  private stopAnimation(): void {
    if (this.animationFrameId) {
      window.cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = 0;
    }
  }

  private resizeCanvas(): void {
    const canvas = this.canvasRef?.nativeElement;
    if (!canvas) {
      return;
    }

    const dpr = Math.min(window.devicePixelRatio || 1, this.lowPowerViewport ? 1.25 : 1.5);
    const rect = canvas.getBoundingClientRect();
    const width = Math.max(1, Math.floor(rect.width * dpr));
    const height = Math.max(1, Math.floor(rect.height * dpr));

    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
      this.gl?.viewport(0, 0, width, height);
    }
  }

  private renderFrame(time: number): void {
    const gl = this.gl;
    const program = this.program;
    if (!gl || !program) {
      return;
    }

    gl.useProgram(program);
    gl.uniform2f(this.uniforms?.resolution ?? null, gl.drawingBufferWidth, gl.drawingBufferHeight);
    gl.uniform1f(this.uniforms?.time ?? null, time);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }

  private currentTime(): number {
    if (this.reducedMotion || this.lowPowerViewport) {
      return 0;
    }

    return (performance.now() - this.startTime) * 0.001;
  }

  private createProgram(gl: WebGLRenderingContext): WebGLProgram | null {
    const vertexShader = this.createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = this.createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    if (!vertexShader || !fragmentShader) {
      if (vertexShader) {
        gl.deleteShader(vertexShader);
      }
      if (fragmentShader) {
        gl.deleteShader(fragmentShader);
      }
      return null;
    }

    const program = gl.createProgram();
    if (!program) {
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      return null;
    }

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      gl.deleteProgram(program);
      return null;
    }

    return program;
  }

  private createShader(
    gl: WebGLRenderingContext,
    type: number,
    source: string,
  ): WebGLShader | null {
    const shader = gl.createShader(type);
    if (!shader) {
      return null;
    }

    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      gl.deleteShader(shader);
      return null;
    }

    return shader;
  }

  private releaseWebGl(): void {
    const gl = this.gl;
    if (!gl) {
      return;
    }

    if (this.positionBuffer) {
      gl.deleteBuffer(this.positionBuffer);
    }
    if (this.program) {
      gl.deleteProgram(this.program);
    }

    this.positionBuffer = undefined;
    this.program = undefined;
    this.gl = undefined;
  }
}

const vertexShaderSource = `
  attribute vec2 a_position;

  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const fragmentShaderSource = `
  precision highp float;

  uniform vec2 u_resolution;
  uniform float u_time;

  const float overallSpeed = 0.2;
  const float gridSmoothWidth = 0.015;
  const float axisWidth = 0.05;
  const float majorLineWidth = 0.025;
  const float minorLineWidth = 0.0125;
  const float majorLineFrequency = 5.0;
  const float minorLineFrequency = 1.0;
  const vec4 gridColor = vec4(0.42, 0.42, 0.56, 1.0);
  const float scale = 5.0;
  const vec4 lineColor = vec4(0.42, 0.22, 0.9, 1.0);
  const float minLineWidth = 0.01;
  const float maxLineWidth = 0.2;
  const float lineSpeed = 1.0 * overallSpeed;
  const float lineAmplitude = 1.0;
  const float lineFrequency = 0.2;
  const float warpSpeed = 0.2 * overallSpeed;
  const float warpFrequency = 0.5;
  const float warpAmplitude = 1.0;
  const float offsetFrequency = 0.5;
  const float offsetSpeed = 1.33 * overallSpeed;
  const float minOffsetSpread = 0.6;
  const float maxOffsetSpread = 2.0;
  const int linesPerGroup = 16;

  #define drawCircle(pos, radius, coord) smoothstep(radius + gridSmoothWidth, radius, length(coord - (pos)))
  #define drawSmoothLine(pos, halfWidth, t) smoothstep(halfWidth, 0.0, abs(pos - (t)))
  #define drawCrispLine(pos, halfWidth, t) smoothstep(halfWidth + gridSmoothWidth, halfWidth, abs(pos - (t)))
  #define drawPeriodicLine(freq, width, t) drawCrispLine(freq / 2.0, width, abs(mod(t, freq) - (freq) / 2.0))

  float drawGridLines(float axis) {
    return drawCrispLine(0.0, axisWidth, axis)
      + drawPeriodicLine(majorLineFrequency, majorLineWidth, axis)
      + drawPeriodicLine(minorLineFrequency, minorLineWidth, axis);
  }

  float drawGrid(vec2 space) {
    return min(1.0, drawGridLines(space.x) + drawGridLines(space.y));
  }

  float random(float t) {
    return (cos(t) + cos(t * 1.3 + 1.3) + cos(t * 1.4 + 1.4)) / 3.0;
  }

  float getPlasmaY(float x, float horizontalFade, float offset) {
    return random(x * lineFrequency + u_time * lineSpeed) * horizontalFade * lineAmplitude + offset;
  }

  void main() {
    vec2 fragCoord = gl_FragCoord.xy;
    vec2 uv = fragCoord.xy / u_resolution.xy;
    vec2 space = (fragCoord - u_resolution.xy / 2.0) / u_resolution.x * 2.0 * scale;

    float horizontalFade = 1.0 - (cos(uv.x * 6.28318530718) * 0.5 + 0.5);
    float verticalFade = 1.0 - (cos(uv.y * 6.28318530718) * 0.5 + 0.5);

    space.y += random(space.x * warpFrequency + u_time * warpSpeed) * warpAmplitude * (0.5 + horizontalFade);
    space.x += random(space.y * warpFrequency + u_time * warpSpeed + 2.0) * warpAmplitude * horizontalFade;

    vec4 lines = vec4(0.0);
    vec4 bgColor1 = vec4(0.055, 0.065, 0.18, 1.0);
    vec4 bgColor2 = vec4(0.22, 0.07, 0.38, 1.0);

    float grid = drawGrid(space);
    lines += grid * gridColor * 0.11 * verticalFade;

    for(int l = 0; l < linesPerGroup; l++) {
      float normalizedLineIndex = float(l) / float(linesPerGroup);
      float offsetTime = u_time * offsetSpeed;
      float offsetPosition = float(l) + space.x * offsetFrequency;
      float rand = random(offsetPosition + offsetTime) * 0.5 + 0.5;
      float halfWidth = mix(minLineWidth, maxLineWidth, rand * horizontalFade) / 2.0;
      float offset = random(offsetPosition + offsetTime * (1.0 + normalizedLineIndex)) * mix(minOffsetSpread, maxOffsetSpread, horizontalFade);
      float linePosition = getPlasmaY(space.x, horizontalFade, offset);
      float line = drawSmoothLine(linePosition, halfWidth, space.y) / 2.0
        + drawCrispLine(linePosition, halfWidth * 0.15, space.y);

      float circleX = mod(float(l) + u_time * lineSpeed, 25.0) - 12.0;
      vec2 circlePosition = vec2(circleX, getPlasmaY(circleX, horizontalFade, offset));
      float circle = drawCircle(circlePosition, 0.014, space) * 4.0;

      line += circle;
      lines += line * lineColor * rand;
    }

    vec4 fragColor = mix(bgColor1, bgColor2, uv.x);
    fragColor *= 0.34 + verticalFade * 0.82;
    fragColor += lines;
    fragColor.rgb += vec3(0.02, 0.09, 0.13) * smoothstep(0.8, 0.05, distance(uv, vec2(0.18, 0.74)));
    fragColor.a = 0.94;

    gl_FragColor = fragColor;
  }
`;
