import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  standalone: true,
  selector: 'app-aws-infrastructure',
  imports: [CommonModule, RouterModule],
  templateUrl: './aws-infrastructure.component.html',
  styleUrls: ['./aws-infrastructure.component.css']
})
export class AwsInfrastructureComponent {
  private meta = inject(Meta);
  private title = inject(Title);

  constructor() {
    const pageTitle = 'AWS Infrastructure Support | CtrlShift IT Services';
    this.title.setTitle(pageTitle);
    this.meta.updateTag({ name: 'description', content: 'Secure cloud foundations for line-of-business systems. We help you host workloads safely, with cost awareness and solid backups.' });
    this.meta.updateTag({ property: 'og:title', content: pageTitle });
    this.meta.updateTag({ property: 'og:description', content: 'Secure cloud foundations for line-of-business systems. We help you host workloads safely, with cost awareness and solid backups.' });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
  }
}
