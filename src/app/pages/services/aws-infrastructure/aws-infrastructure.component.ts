import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SeoService } from '../../../shared/seo/seo.service';

@Component({
  standalone: true,
  selector: 'app-aws-infrastructure',
  imports: [CommonModule, RouterModule],
  templateUrl: './aws-infrastructure.component.html',
  styleUrls: ['./aws-infrastructure.component.css']
})
export class AwsInfrastructureComponent {
  private seo = inject(SeoService);

  constructor() {
    const pageTitle = 'AWS Infrastructure Support | CtrlShift IT Services';
    const description = 'Secure cloud foundations for line-of-business systems. We help you host workloads safely, with cost awareness and solid backups.';
    this.seo.update({
      title: pageTitle,
      description,
      type: 'website',
      canonicalPath: '/aws-infrastructure'
    });
  }
}
