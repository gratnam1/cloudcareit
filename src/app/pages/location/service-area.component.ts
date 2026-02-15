import { Component, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-service-area',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="py-5 bg-light" *ngIf="city">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6 mb-4 mb-lg-0">
            <h2 class="h3 mb-3">Service Area: {{ city }}</h2>
            <p class="lead mb-4" *ngIf="region">
              Proudly serving {{ city }} and the wider {{ region }}.
            </p>
            <p class="mb-4">
              Our local technicians provide rapid on-site response to businesses in these key districts:
            </p>
            <div class="d-flex flex-wrap gap-2">
              <span *ngFor="let area of nearbyAreas" class="badge bg-white text-dark border shadow-sm p-2 d-flex align-items-center">
                <i class="bi bi-geo-alt-fill text-primary me-2" aria-hidden="true"></i> {{ area }}
              </span>
            </div>
          </div>
          <div class="col-lg-6 text-center">
            <div class="map-media rounded-3 shadow border bg-white overflow-hidden">
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
              class="btn btn-outline-dark btn-sm rounded-pill mt-3 px-3"
              [href]="mapOpenUrl"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i class="bi bi-map me-1" aria-hidden="true"></i> Open in Google Maps
            </a>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    :host { display: block; }
    .badge { font-weight: 500; font-size: 0.95rem; }
    .map-media {
      aspect-ratio: 16 / 10;
      min-height: 280px;
    }
    .map-frame {
      display: block;
      width: 100%;
      height: 100%;
      border: 0;
      background: #ffffff;
    }
    @media (max-width: 991.98px) {
      .map-media { min-height: 240px; }
    }
  `]
})
export class ServiceAreaComponent implements OnChanges {
  private sanitizer = inject(DomSanitizer);
  private _mapImage = '';

  @Input() city = '';
  @Input() region = '';
  @Input() nearbyAreas: string[] = [];
  @Input()
  set mapImage(value: string) {
    this._mapImage = (value ?? '').trim();
    this.mapImageFailed = false;
  }

  get mapImage(): string {
    return this._mapImage;
  }

  mapImageFailed = false;
  safeEmbedUrl: SafeResourceUrl =
    this.sanitizer.bypassSecurityTrustResourceUrl('about:blank');

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
