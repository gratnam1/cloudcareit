import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SeoService } from '../../../shared/seo/seo.service';

@Component({
  standalone: true,
  selector: 'app-microsoft-365',
  imports: [CommonModule, RouterModule],
  templateUrl: './microsoft-365.component.html',
  styleUrls: ['./microsoft-365.component.css']
})
export class Microsoft365Component {
  private seo = inject(SeoService);

  constructor() {
    const pageTitle = 'Microsoft 365 Support | CtrlShift IT Services';
    const description = 'User lifecycle management, mailbox reliability, Teams support, and SharePoint security. We keep Microsoft 365 stable and secure for your staff.';
    this.seo.update({
      title: pageTitle,
      description,
      type: 'website',
      canonicalPath: '/microsoft-365'
    });
  }
}
