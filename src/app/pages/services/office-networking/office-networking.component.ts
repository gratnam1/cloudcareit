import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SeoService } from '../../../shared/seo/seo.service';

@Component({
  standalone: true,
  selector: 'app-office-networking',
  imports: [CommonModule, RouterModule],
  templateUrl: './office-networking.component.html',
  styleUrls: ['./office-networking.component.css']
})
export class OfficeNetworkingComponent {
  private seo = inject(SeoService);

  constructor() {
    const pageTitle = 'Office Networking & Wi‑Fi | CtrlShift IT Services';
    const description = 'Moving or expanding? We handle structured cabling planning, network gear setup, and Wi‑Fi performance so your office stays connected.';
    this.seo.update({
      title: pageTitle,
      description,
      type: 'website',
      canonicalPath: '/office-networking'
    });
  }
}
