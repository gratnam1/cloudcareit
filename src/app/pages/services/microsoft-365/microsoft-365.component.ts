import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  standalone: true,
  selector: 'app-microsoft-365',
  imports: [CommonModule, RouterModule],
  templateUrl: './microsoft-365.component.html',
  styleUrls: ['./microsoft-365.component.css']
})
export class Microsoft365Component {
  private meta = inject(Meta);
  private title = inject(Title);

  constructor() {
    const pageTitle = 'Microsoft 365 Support | CtrlShift IT Services';
    this.title.setTitle(pageTitle);
    this.meta.updateTag({ name: 'description', content: 'User lifecycle management, mailbox reliability, Teams support, and SharePoint security. We keep Microsoft 365 stable and secure for your staff.' });
    this.meta.updateTag({ property: 'og:title', content: pageTitle });
    this.meta.updateTag({ property: 'og:description', content: 'User lifecycle management, mailbox reliability, Teams support, and SharePoint security. We keep Microsoft 365 stable and secure for your staff.' });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
  }
}
