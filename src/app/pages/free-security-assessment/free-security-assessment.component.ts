import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SeoService } from '../../shared/seo/seo.service';

@Component({
  selector: 'app-free-security-assessment',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './free-security-assessment.component.html',
  styleUrl: './free-security-assessment.component.css'
})
export class FreeSecurityAssessmentComponent implements OnInit {
  submitted = false;
  isLoading = false;

  constructor(private seo: SeoService) {}

  ngOnInit() {
    this.seo.update({
      title: 'Free IT Security Assessment for GTA Businesses | CtrlShift IT',
      description: 'Book your free cybersecurity risk assessment. We scan your network, review Microsoft 365 security, analyze ransomware risk, verify backups, and check cyber insurance readiness.',
      type: 'website',
      canonicalPath: '/free-security-assessment'
    });
  }

  async onSubmit(event: Event) {
    event.preventDefault();
    this.isLoading = true;
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());
    try {
      const response = await fetch('https://formspree.io/f/mwvozjnn', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' }
      });
      this.submitted = response.ok;
      this.isLoading = false;
      if (response.ok) form.reset();
    } catch {
      this.isLoading = false;
    }
  }
}
