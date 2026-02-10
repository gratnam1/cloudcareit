import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  standalone: true,
  selector: 'app-office-networking',
  imports: [CommonModule, RouterModule],
  templateUrl: './office-networking.component.html',
  styleUrls: ['./office-networking.component.css']
})
export class OfficeNetworkingComponent {
  private meta = inject(Meta);
  private title = inject(Title);

  constructor() {
    const pageTitle = 'Office Networking & Wi‑Fi | CtrlShift IT Services';
    this.title.setTitle(pageTitle);
    this.meta.updateTag({ name: 'description', content: 'Moving or expanding? We handle structured cabling planning, network gear setup, and Wi‑Fi performance so your office stays connected.' });
    this.meta.updateTag({ property: 'og:title', content: pageTitle });
    this.meta.updateTag({ property: 'og:description', content: 'Moving or expanding? We handle structured cabling planning, network gear setup, and Wi‑Fi performance so your office stays connected.' });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
  }
}
