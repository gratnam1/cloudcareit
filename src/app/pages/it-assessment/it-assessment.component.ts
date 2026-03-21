import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SeoService } from '../../shared/seo/seo.service';

@Component({
  selector: 'app-it-assessment',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './it-assessment.component.html',
  styleUrl: './it-assessment.component.css'
})
export class ItAssessmentComponent {
  submitted = false;
  isLoading = false;
  errorMessage = '';

  constructor(private seo: SeoService) {
    this.seo.update({
      title: 'Book a Free IT Assessment | CtrlShift IT Services',
      description: 'Request a free IT assessment for your GTA business. A senior engineer will review your IT environment and provide a clear, prioritized report.',
      type: 'website',
      canonicalPath: '/it-assessment'
    });
  }

  async onSubmit(event: Event) {
    event.preventDefault();
    this.errorMessage = '';
    this.isLoading = true;

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const payload = {
      fullName: String(formData.get('name') || '').trim(),
      companyName: String(formData.get('company') || '').trim(),
      email: String(formData.get('email') || '').trim(),
      phone: String(formData.get('phone') || '').trim(),
      officeSize: String(formData.get('office_size') || '').trim(),
      industry: String(formData.get('industry') || '').trim(),
      message: String(formData.get('message') || '').trim(),
      website: String(formData.get('website') || '').trim(),
    };

    // Honeypot check (client side)
    if (payload.website) {
      this.isLoading = false;
      return;
    }

    try {
      const response = await fetch('/api/it-assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as { error?: string } | null;
        this.errorMessage = data?.error || 'Unable to submit right now. Please try again.';
        this.isLoading = false;
        return;
      }

      this.submitted = true;
      form.reset();
    } catch {
      this.errorMessage = 'Unable to submit right now. Please try again.';
    } finally {
      this.isLoading = false;
    }
  }
}
