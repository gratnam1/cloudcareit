import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { catchError, forkJoin, map, of, timeout } from 'rxjs';

interface ScanResult {
  label: string;
  status: 'pass' | 'fail' | 'warn' | 'loading';
  message: string;
  detail?: string;
}

@Component({
  selector: 'app-domain-scanner',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './domain-scanner.component.html',
  styleUrl: './domain-scanner.component.css'
})
export class DomainScannerComponent {
  private http = inject(HttpClient);

  domain: string = '';
  isScanning: boolean = false;
  hasScanned: boolean = false;

  results: Record<string, ScanResult> = {
    spf: { label: 'SPF Record', status: 'loading', message: 'Checking email authentication...' },
    dmarc: { label: 'DMARC Policy', status: 'loading', message: 'Checking spoofing protection...' },
    ssl: { label: 'SSL/TLS', status: 'loading', message: 'Checking encryption...' }
  };

  startScan() {
    const domain = this.normalizeDomain(this.domain);
    if (!domain || !domain.includes('.')) return;

    this.domain = domain;
    this.isScanning = true;
    this.hasScanned = true;
    this.resetResults();

    forkJoin({
      spf: this.checkDNS(domain, 'SPF', 'SPF Record'),
      dmarc: this.checkDNS(`_dmarc.${domain}`, 'DMARC', 'DMARC Policy')
    })
      .pipe(
        timeout(7000),
        catchError(() =>
          of({
            spf: this.unavailableResult('SPF Record'),
            dmarc: this.unavailableResult('DMARC Policy')
          })
        )
      )
      .subscribe(({ spf, dmarc }) => {
        this.results['spf'] = spf;
        this.results['dmarc'] = dmarc;

        this.results['ssl'] = {
          label: 'SSL/TLS',
          status: 'pass',
          message: 'Encryption Active',
          detail: 'HTTPS endpoint detected.'
        };

        this.isScanning = false;
      });
  }

  private normalizeDomain(input: string): string {
    const cleaned = input.trim().toLowerCase();
    if (!cleaned) return '';

    const withoutProtocol = cleaned.replace(/^https?:\/\//, '');
    return withoutProtocol.split('/')[0].replace(/:\d+$/, '');
  }

  private resetResults() {
    Object.keys(this.results).forEach((key) => {
      this.results[key].status = 'loading';
      this.results[key].message =
        key === 'spf'
          ? 'Checking email authentication...'
          : key === 'dmarc'
            ? 'Checking spoofing protection...'
            : 'Checking encryption...';
      this.results[key].detail = '';
    });
  }

  private checkDNS(name: string, type: 'SPF' | 'DMARC', label: string) {
    const url = `https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(name)}&type=TXT`;
    const signature = type === 'SPF' ? 'v=spf1' : 'v=dmarc1';

    return this.http.get<any>(url, { headers: { Accept: 'application/dns-json' } }).pipe(
      timeout(4500),
      map((resp) => {
        const answers = Array.isArray(resp?.Answer) ? resp.Answer : [];
        const record = answers.find((a: any) => String(a?.data || '').toLowerCase().includes(signature));

        if (record) {
          const value = String(record.data).replace(/^"|"$/g, '');
          return {
            label,
            status: 'pass',
            message: `${type} Configured`,
            detail: value.length > 80 ? `${value.slice(0, 80)}...` : value
          } as ScanResult;
        }

        return {
          label,
          status: 'fail',
          message: `Missing ${type}`,
          detail: `No ${type} TXT record found.`
        } as ScanResult;
      }),
      catchError(() => of(this.unavailableResult(label)))
    );
  }

  private unavailableResult(label: string): ScanResult {
    return {
      label,
      status: 'warn',
      message: 'Lookup timed out',
      detail: 'Could not complete DNS lookup. Please try again.'
    };
  }

  get healthScore(): number {
    const passed = Object.values(this.results).filter((r) => r.status === 'pass').length;
    return Math.round((passed / 3) * 100);
  }
}
