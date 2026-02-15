import { Component, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-service-area',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="service-area-grid" *ngIf="city">
      <div class="service-copy-card p-4 p-lg-5">
        <h2 class="h3 fw-bold mb-3">Service Area: {{ city }}</h2>
        <p class="lead mb-3 text-secondary" *ngIf="region">
          Proudly serving {{ city }} and the wider {{ region }}.
        </p>
        <p class="text-muted mb-4">
          {{ areasServedText || 'Our local technicians provide rapid on-site response to businesses across the surrounding districts.' }}
        </p>

        <div class="d-flex flex-wrap gap-2">
          <span *ngFor="let area of nearbyAreas" class="area-chip badge p-2 d-flex align-items-center">
            <i class="bi bi-geo-alt-fill me-2" aria-hidden="true"></i>{{ area }}
          </span>
        </div>
      </div>

      <div class="service-map-card p-3 p-lg-4">
        <div class="map-media rounded-3 shadow border overflow-hidden">
          <img
            *ngIf="hasMapImage"
            [src]="mapImage"
            [alt]="'IT Service Area Map for ' + city"
            class="map-frame"
            loading="lazy"
            (error)="onMapImageError()"
          >
          <iframe
            *ngIf="!hasMapImage"
            [src]="safeEmbedUrl"
            [title]="'Google Map for ' + city"
            class="map-frame"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        <a
          class="btn btn-outline-primary btn-sm rounded-pill mt-3 px-3"
          [href]="mapOpenUrl"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i class="bi bi-map me-1" aria-hidden="true"></i>Open in Google Maps
        </a>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }

    .service-area-grid {
      display: grid;
      grid-template-columns: 1fr 1.1fr;
      gap: 1rem;
      align-items: stretch;
    }

    .service-copy-card,
    .service-map-card {
      border-radius: 1.1rem;
      border: 1px solid #e2e8f0;
      background: #ffffff;
      box-shadow: 0 14px 30px rgba(15, 23, 42, 0.08);
    }

    .area-chip {
      font-weight: 500;
      font-size: 0.9rem;
      background: #ffffff;
      color: #1e293b;
      border: 1px solid #d5dbe3;
    }

    .area-chip .bi {
      color: #2563eb;
    }

    .map-media {
      aspect-ratio: 16 / 10;
      min-height: 280px;
      border-color: #d5dbe3 !important;
      background: #ffffff;
      box-shadow: 0 14px 30px rgba(15, 23, 42, 0.12);
    }

    .map-frame {
      display: block;
      width: 100%;
      height: 100%;
      border: 0;
      background: #ffffff;
    }

    @media (max-width: 991.98px) {
      .service-area-grid {
        grid-template-columns: 1fr;
      }

      .map-media {
        min-height: 240px;
      }
    }
  `]
})
export class ServiceAreaComponent implements OnChanges {
  private sanitizer = inject(DomSanitizer);
  private _mapImage = '';

  @Input() city = '';
  @Input() region = '';
  @Input() nearbyAreas: string[] = [];
  @Input() areasServedText = '';

  @Input()
  set mapImage(value: string) {
    this._mapImage = (value ?? '').trim();
    this.mapImageFailed = false;
  }

  get mapImage(): string {
    return this._mapImage;
  }

  mapImageFailed = false;
  safeEmbedUrl: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl('about:blank');

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['city'] || changes['region']) {
      const embedUrl = `https://www.google.com/maps?q=${encodeURIComponent(this.mapQuery)}&output=embed`;
      this.safeEmbedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
    }
  }

  get hasMapImage(): boolean {
    return Boolean(this.mapImage) && !this.mapImageFailed;
  }

  get mapOpenUrl(): string {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(this.mapQuery)}`;
  }

  onMapImageError(): void {
    this.mapImageFailed = true;
  }

  private get mapQuery(): string {
    const parts = [this.city, this.region, 'Ontario', 'Canada']
      .map((part) => part.trim())
      .filter((part) => part.length > 0);
    return parts.join(', ');
  }
}
