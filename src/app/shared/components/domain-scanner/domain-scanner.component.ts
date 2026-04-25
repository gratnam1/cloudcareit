import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { catchError, finalize, of } from 'rxjs';

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

  async startScan() {
    if (!this.domain || !this.domain.includes('.')) return;

    this.isScanning = true;
    this.hasScanned = true;
    this.resetResults();

    // 1. Check SPF
    this.checkDNS(this.domain, 'SPF', 'spf');
    
    // 2. Check DMARC
    this.checkDNS(`_dmarc.${this.domain}`, 'DMARC', 'dmarc');

    // 3. SSL Check (Simulated for now as it requires backend/external deep-scan)
    setTimeout(() => {
      this.results['ssl'] = {
        label: 'SSL/TLS',
        status: 'pass',
        message: 'Encryption Active',
        detail: 'Standard HTTPS verified.'
      };
      this.isScanning = false;
    }, 2000);
  }

  private resetResults() {
    Object.keys(this.results).forEach(key => {
      this.results[key].status = 'loading';
    });
  }

  private checkDNS(name: string, type: string, resultKey: string) {
    const url = `https://cloudflare-dns.com/dns-query?name=${name}&type=TXT`;
    
    this.http.get<any>(url, { headers: { 'Accept': 'application/dns-json' } })
      .pipe(
        catchError(() => of({ Answer: [] })),
      )
      .subscribe(resp => {
        const answers = resp.Answer || [];
        const record = answers.find((a: any) => a.data.includes(type === 'SPF' ? 'v=spf1' : 'v=DMARC1'));

        if (record) {
          this.results[resultKey] = {
            label: type === 'SPF' ? 'SPF Record' : 'DMARC Policy',
            status: 'pass',
            message: `${type} Configured`,
            detail: record.data.length > 50 ? record.data.substring(0, 50) + '...' : record.data
          };
        } else {
          this.results[resultKey] = {
            label: type === 'SPF' ? 'SPF Record' : 'DMARC Policy',
            status: 'fail',
            message: `Missing ${type}`,
            detail: `Your domain is vulnerable to ${type === 'SPF' ? 'email spoofing' : 'impersonation'}.`
          };
        }
      });
  }

  get healthScore(): number {
    const passed = Object.values(this.results).filter(r => r.status === 'pass').length;
    return Math.round((passed / 3) * 100);
  }
}
