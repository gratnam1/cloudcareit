import { Component, NgZone, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
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
export class FreeSecurityAssessmentComponent implements OnInit, OnDestroy {
  private readonly requestTimeoutMs = 20000;
  submitted = false;
  isLoading = false;
  submitProgress = 0;
  submitStatusMessage = '';
  errorMessage = '';
  scanRequestId = '';
  scanStatus = '';
  scanSummary = '';
  scanChecks: Array<{id: string; label: string; status: string; detail: string}> = [];
  public pollTimer: ReturnType<typeof setInterval> | null = null;
  public osType: 'windows' | 'mac' | 'linux' | 'mobile' | 'unknown' = 'unknown';
  private submitProgressTimer: ReturnType<typeof setInterval> | null = null;
  private submitWatchdogTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(
    private seo: SeoService,
    private zone: NgZone,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.seo.update({
      title: 'Free IT Security Assessment for GTA Businesses | CtrlShift IT Services',
      description: 'Request a free external IT security assessment for your GTA business. We run safe, non-intrusive checks on DNS health, TLS certificates, security headers, and email configuration — then deliver a prioritized risk summary.',
      type: 'website',
      canonicalPath: '/free-security-assessment'
    });
    
    // Safely detect if the executing browser is Windows, Mac, Linux, or Mobile
    if (typeof window !== 'undefined' && window.navigator && window.navigator.userAgent) {
      const ua = window.navigator.userAgent.toLowerCase();
      if (/mobi|android|iphone|ipad|ipod/i.test(ua)) {
        this.osType = 'mobile';
      } else if (/windows/i.test(ua)) {
        this.osType = 'windows';
      } else if (/mac os/i.test(ua) || /macintosh/i.test(ua)) {
        this.osType = 'mac';
      } else if (/linux/i.test(ua)) {
        this.osType = 'linux';
      }
    }
  }

  ngOnDestroy() {
    this.stopPolling();
    this.stopSubmitProgress();
    this.clearSubmitWatchdog();
  }

  async onSubmit(event: Event) {
    event.preventDefault();
    this.errorMessage = '';
    this.isLoading = true;
    this.startSubmitProgress();
    this.startSubmitWatchdog();
    this.logClientDebug('submit_clicked');
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const payload = {
      fullName: String(formData.get('name') || '').trim(),
      companyName: String(formData.get('company') || '').trim(),
      email: String(formData.get('email') || '').trim(),
      phone: String(formData.get('phone') || '').trim(),
      officeSize: String(formData.get('office_size') || '').trim(),
      industry: String(formData.get('industry') || '').trim(),
      targetDomain: String(formData.get('target_domain') || '').trim(),
      message: String(formData.get('message') || '').trim(),
      consentAuthorized: formData.get('consent_authorized') === 'on',
      consentTerms: formData.get('consent_terms') === 'on',
      captchaToken: String(formData.get('captcha_token') || '').trim(),
      website: String(formData.get('website') || '').trim(),
    };

    if (!payload.consentAuthorized || !payload.consentTerms) {
      this.logClientDebug('submit_validation_failed', {
        consentAuthorized: payload.consentAuthorized,
        consentTerms: payload.consentTerms,
      });
      this.errorMessage = 'Please confirm authorization and consent to proceed.';
      this.isLoading = false;
      this.stopSubmitProgress();
      this.clearSubmitWatchdog();
      return;
    }

    try {
      this.logClientDebug('request_started', { targetDomain: payload.targetDomain });
      const response = await this.fetchWithTimeout('/api/security-scans/request', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      });
      this.logClientDebug('request_resolved', { ok: response.ok, status: response.status });

      if (!response.ok) {
        const responsePayload = (await response.json().catch(() => null)) as
          | { error?: string }
          | null;
        this.zone.run(() => {
          this.errorMessage =
            responsePayload?.error || 'Unable to submit your request right now.';
          this.isLoading = false;
          this.stopSubmitProgress();
          this.clearSubmitWatchdog();
        });
        return;
      }

      const responsePayload = (await response.json()) as {
        requestId: string;
        status: string;
      };
      this.zone.run(() => {
        this.scanRequestId = responsePayload.requestId;
        this.scanStatus = responsePayload.status;
        this.completeSubmitProgress();
        this.submitted = true;
        this.isLoading = false;
        this.clearSubmitWatchdog();
      });
      form.reset();
      this.beginPolling();

      // Keep the lead notification in Formspree, but do not block scan flow on failures.
      void fetch('https://formspree.io/f/mwvozjnn', {
        method: 'POST',
        body: JSON.stringify({ ...payload, scanRequestId: this.scanRequestId }),
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      }).catch(() => undefined);
    } catch (error) {
      this.logClientDebug('request_failed', {
        errorName: error instanceof Error ? error.name : 'unknown',
        errorMessage: error instanceof Error ? error.message : 'unknown',
      });
      this.zone.run(() => {
        this.errorMessage =
          error instanceof DOMException && error.name === 'AbortError'
            ? 'This is taking longer than expected. Please try again in a moment.'
            : 'Unable to submit your request right now.';
        this.isLoading = false;
        this.stopSubmitProgress();
        this.clearSubmitWatchdog();
      });
    } finally {
      this.zone.run(() => {
        if (this.isLoading && !this.submitted) {
          this.errorMessage = 'Submission interrupted. Please try again.';
          this.isLoading = false;
          this.stopSubmitProgress();
          this.clearSubmitWatchdog();
          this.logClientDebug('finally_forced_release');
        }
      });
    }
  }

  private startSubmitProgress() {
    this.stopSubmitProgress();
    this.submitProgress = 8;
    this.submitStatusMessage = 'Validating your request...';
    this.submitProgressTimer = setInterval(() => {
      if (this.submitProgress >= 92) return;
      this.submitProgress = Math.min(92, this.submitProgress + 6);

      if (this.submitProgress >= 70) {
        this.submitStatusMessage = 'Running initial external checks...';
      } else if (this.submitProgress >= 35) {
        this.submitStatusMessage = 'Submitting request to scan engine...';
      }
      this.cdr.detectChanges();
    }, 350);

    setTimeout(() => {
      if (!this.isLoading || this.submitted) return;
      this.submitStatusMessage = 'Still working... this is slower than usual.';
      this.cdr.detectChanges();
    }, 12000);
  }

  private completeSubmitProgress() {
    this.submitProgress = 100;
    this.submitStatusMessage = 'Request submitted successfully.';
    this.stopSubmitProgress();
  }

  private stopSubmitProgress() {
    if (!this.submitProgressTimer) return;
    clearInterval(this.submitProgressTimer);
    this.submitProgressTimer = null;
  }

  private startSubmitWatchdog() {
    this.clearSubmitWatchdog();
    this.submitWatchdogTimer = setTimeout(() => {
      if (!this.isLoading || this.submitted) return;
      this.zone.run(() => {
        this.errorMessage = 'Submission timed out. Please try again.';
        this.isLoading = false;
        this.stopSubmitProgress();
        this.logClientDebug('watchdog_timeout');
        this.cdr.detectChanges();
      });
    }, this.requestTimeoutMs + 3000);
  }

  private clearSubmitWatchdog() {
    if (!this.submitWatchdogTimer) return;
    clearTimeout(this.submitWatchdogTimer);
    this.submitWatchdogTimer = null;
  }

  private beginPolling() {
    this.stopPolling();
    if (!this.scanRequestId) return;

    void this.loadScanStatus();
    this.pollTimer = setInterval(() => {
      void this.loadScanStatus();
    }, 4000);
    
    // Stop continuous polling after 15 minutes to save resources
    // The user can still manually refresh after this point
    setTimeout(() => this.stopPolling(), 15 * 60 * 1000);
  }

  private stopPolling() {
    if (!this.pollTimer) return;
    clearInterval(this.pollTimer);
    this.pollTimer = null;
  }

  public async loadScanStatus() {
    if (!this.scanRequestId) return;

    try {
      const response = await fetch(`/api/security-scans/${encodeURIComponent(this.scanRequestId)}`);
      if (!response.ok) return;

      const payload = (await response.json()) as {
        status: string;
        reportSummary?: string;
        checks?: Array<{id: string; label: string; status: string; detail: string}>;
      };

      this.scanStatus = payload.status;
      this.scanSummary = payload.reportSummary || '';
      this.scanChecks = payload.checks || [];

      // We no longer stop polling when status is 'completed'
      // to allow the local scan script results to automatically appear
      if (
        payload.status === 'failed' ||
        payload.status === 'review_required'
      ) {
        this.stopPolling();
      }
      this.cdr.detectChanges();
    } catch {
      // Polling errors should not interrupt the user's view.
    }
  }

  private async fetchWithTimeout(input: string, init: RequestInit): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.requestTimeoutMs);

    try {
      return await fetch(input, { ...init, signal: controller.signal });
    } finally {
      clearTimeout(timeoutId);
    }
  }

  private logClientDebug(stage: string, detail: Record<string, unknown> = {}) {
    void fetch('/api/security-scans/client-debug', {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ stage, detail }),
      keepalive: true,
    }).catch(() => undefined);
  }
}
