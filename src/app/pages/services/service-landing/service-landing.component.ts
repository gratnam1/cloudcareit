import { AfterViewInit, ChangeDetectorRef, Component, Input, OnDestroy, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ServiceLandingPage, TenantHardeningControl } from './service-landing.model';

@Component({
  standalone: true,
  selector: 'app-service-landing',
  imports: [CommonModule, RouterModule],
  templateUrl: './service-landing.component.html',
  styleUrls: ['./service-landing.component.css'],
})
export class ServiceLandingComponent implements AfterViewInit, OnDestroy {
  @Input({ required: true }) page!: ServiceLandingPage;

  private readonly platformId = inject(PLATFORM_ID);
  private readonly cdr = inject(ChangeDetectorRef);
  private animationContext?: { revert: () => void };
  private tenantOrbitTimer?: number;
  private resizeObserver?: ResizeObserver;
  private prefersReducedMotion = false;
  private orbitRadius = 330;
  rotationAngle = 270;
  autoRotateTenantMap = true;
  activeTenantControlKey: string | null = null;

  get activeTenantControl(): TenantHardeningControl | undefined {
    if (!this.activeTenantControlKey) return undefined;
    return this.page.tenantHardening?.controls.find((control) => control.key === this.activeTenantControlKey);
  }

  get activeRelatedTenantControls(): TenantHardeningControl[] {
    const controls = this.page.tenantHardening?.controls ?? [];
    const relatedKeys = this.activeTenantControl?.relatedKeys ?? [];
    return controls.filter((control) => relatedKeys.includes(control.key));
  }

  setActiveTenantControl(control: TenantHardeningControl): void {
    this.activeTenantControlKey = control.key;
    this.centerTenantControl(control);
    this.autoRotateTenantMap = false;
  }

  resumeTenantOrbit(): void {
    this.autoRotateTenantMap = !this.prefersReducedMotion;
  }

  clearActiveTenantControl(): void {
    this.activeTenantControlKey = null;
    this.autoRotateTenantMap = !this.prefersReducedMotion;
  }

  isRelatedTenantControl(control: TenantHardeningControl): boolean {
    const active = this.activeTenantControl;
    return !!active?.relatedKeys?.includes(control.key);
  }

  getTenantNodeStyle(control: TenantHardeningControl, index: number, total: number): Record<string, string | number> {
    const angle = ((index / total) * 360 + this.rotationAngle) % 360;
    const radius = this.orbitRadius;
    const radian = (angle * Math.PI) / 180;
    const x = Math.cos(radian) * radius;
    const y = Math.sin(radian) * radius;
    const depth = (Math.sin(radian) + 1) / 2;
    const isActive = this.activeTenantControl?.key === control.key;

    return {
      transform: `translate(-50%, -50%) translate(${x}px, ${y}px) scale(${isActive ? 1.18 : 0.88 + depth * 0.2})`,
      zIndex: isActive ? 20 : Math.round(8 + depth * 8),
      opacity: isActive ? 1 : 0.54 + depth * 0.46,
    };
  }

  getTenantEnergy(control: TenantHardeningControl): number {
    return control.energy ?? 72;
  }

  private centerTenantControl(control: TenantHardeningControl): void {
    const controls = this.page.tenantHardening?.controls;
    if (!controls?.length) return;

    const index = controls.findIndex((item) => item.key === control.key);
    if (index < 0) return;

    this.rotationAngle = 270 - (index / controls.length) * 360;
  }

  private syncOrbitRadius(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const ring = document.querySelector('.tenant-map-orbits') as HTMLElement | null;
    if (ring) {
      const w = ring.getBoundingClientRect().width;
      if (w > 0) this.orbitRadius = Math.round(w / 2);
    }
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.autoRotateTenantMap = !this.prefersReducedMotion;
    this.initAnimations();

    if (this.page.tenantHardening) {
      this.syncOrbitRadius();
      this.initTenantOrbit();
      const ring = document.querySelector('.tenant-map-orbits') as HTMLElement | null;
      if (ring) {
        this.resizeObserver = new ResizeObserver(() => {
          this.syncOrbitRadius();
          this.cdr.detectChanges();
        });
        this.resizeObserver.observe(ring);
      }
    }
  }

  ngOnDestroy(): void {
    this.animationContext?.revert();
    if (this.tenantOrbitTimer) {
      window.clearInterval(this.tenantOrbitTimer);
    }
    this.resizeObserver?.disconnect();
  }

  private initTenantOrbit(): void {
    if (!this.page.tenantHardening || this.prefersReducedMotion) return;

    this.tenantOrbitTimer = window.setInterval(() => {
      if (!this.autoRotateTenantMap) return;
      this.rotationAngle = Number(((this.rotationAngle + 0.3) % 360).toFixed(3));
      this.cdr.detectChanges();
    }, 50);
  }

  private async initAnimations(): Promise<void> {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const { gsap } = await import('gsap');
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    gsap.registerPlugin(ScrollTrigger);

    this.animationContext = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set('.service-reveal, .service-card, .service-diagram-item, .service-process-step', {
          y: 0,
          opacity: 1,
          clearProps: 'transform',
        });
        return;
      }

      ScrollTrigger.batch('.service-reveal', {
        start: 'top 86%',
        once: true,
        onEnter: (batch) => {
          gsap.fromTo(
            batch,
            { y: 24, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.55, ease: 'power2.out', stagger: 0.08 }
          );
        },
      });

      ScrollTrigger.batch('.service-card', {
        start: 'top 87%',
        once: true,
        onEnter: (batch) => {
          gsap.fromTo(
            batch,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.55, ease: 'power2.out', stagger: 0.08 }
          );
        },
      });

      ScrollTrigger.batch('.service-diagram-item, .service-process-step', {
        start: 'top 85%',
        once: true,
        onEnter: (batch) => {
          gsap.fromTo(
            batch,
            { y: 18, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out', stagger: 0.07 }
          );
        },
      });
    });
  }
}
