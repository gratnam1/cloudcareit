import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SeoService } from '../../shared/seo/seo.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit {
  constructor(private seo: SeoService) {}

  ngOnInit() {
    this.seo.update({
      title: 'About CtrlShift IT Services | Founder Story | GTA Managed IT',
      description: 'Learn about CtrlShift IT Services — our founder story, mission, 15+ years of experience, and why we built a cybersecurity-first IT company for GTA businesses.',
      type: 'website',
      canonicalPath: '/about'
    });
  }
}
