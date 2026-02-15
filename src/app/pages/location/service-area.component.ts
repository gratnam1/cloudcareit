import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-service-area',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="py-5 bg-light" *ngIf="mapImage">
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
            <img [src]="mapImage"
                 [alt]="'IT Service Area Map for ' + city"
                 class="img-fluid rounded-3 shadow border bg-white"
                 loading="lazy">
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    :host { display: block; }
    .badge { font-weight: 500; font-size: 0.95rem; }
  `]
})
export class ServiceAreaComponent {
  @Input() city = '';
  @Input() region = '';
  @Input() nearbyAreas: string[] = [];
  @Input() mapImage = '';
}