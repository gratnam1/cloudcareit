import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SeoService } from '../../shared/seo/seo.service';
import { IndustryQuizComponent } from '../../shared/components/industry-quiz/industry-quiz.component';

export interface IndustryPageData {
  title: string;
  badge: string;
  headline: string;
  subheadline: string;
  painPoints: { icon: string; title: string; detail: string }[];
  compliance: { icon: string; title: string; detail: string }[];
  caseStudy: { problem: string; solution: string; result: string; metrics: { value: string; label: string }[] };
  seoTitle: string;
  seoDescription: string;
}

@Component({
  selector: 'app-industry-page',
  standalone: true,
  imports: [CommonModule, RouterModule, IndustryQuizComponent],
  templateUrl: './industry-page.component.html',
  styleUrl: './industry-page.component.css'
})
export class IndustryPageComponent implements OnInit {
  page!: IndustryPageData;
  industryKey: string = '';

  private pages: Record<string, IndustryPageData> = {
    'law-firms': {
      title: 'IT Support for Law Firms in Toronto',
      badge: 'Legal IT Specialists',
      headline: 'Managed IT for Toronto Law Firms',
      subheadline: 'PIPEDA-compliant IT support, client confidentiality protection, and cybersecurity-first infrastructure for law firms across the GTA.',
      painPoints: [
        { icon: 'bi-lock-fill', title: 'Client Confidentiality at Risk', detail: 'A breach of client data can trigger Law Society disciplinary action, mandatory client notifications, and significant legal liability. Unencrypted files on laptops, shared passwords, and unsecured remote access are the top vectors we see in legal offices.' },
        { icon: 'bi-clock-fill', title: 'Downtime Means Missed Deadlines', detail: 'Court filings and client deliverables don\'t wait for your IT to come back online. You need infrastructure that simply doesn\'t fail.' },
        { icon: 'bi-file-earmark-x-fill', title: 'Compliance Getting Harder', detail: 'The Law Society of Ontario increasingly expects firms to demonstrate data governance. Cyber insurance underwriters now require MFA, EDR, and backup verification.' },
        { icon: 'bi-people-fill', title: 'Staff Working from Multiple Locations', detail: 'Remote lawyers accessing files over unsecured connections is a major liability. Zero-trust access solves this without the VPN complexity.' }
      ],
      compliance: [
        { icon: 'bi-shield-check-fill', title: 'PIPEDA Compliance', detail: 'Data retention policies, encrypted storage, and audit trails aligned with Canadian privacy requirements.' },
        { icon: 'bi-building-fill', title: 'Law Society Requirements', detail: 'Infrastructure controls that align with Law Society of Ontario guidance on technology and security.' },
        { icon: 'bi-file-earmark-lock-fill', title: 'Cyber Insurance Readiness', detail: 'MFA, EDR, encrypted backups — the exact controls your insurer requires, already built in.' }
      ],
      caseStudy: {
        problem: 'A downtown Toronto law firm with 18 lawyers had no endpoint protection, shared admin credentials, unencrypted client files on laptops, and a legacy VPN with exposed RDP ports. Cyber insurance renewal was denied.',
        solution: 'CtrlShift IT Services deployed Huntress EDR across all endpoints, replaced the legacy VPN with Tailscale zero-trust access, enforced MFA for all users, implemented BitLocker encryption, and set up encrypted daily backups to a Canadian AWS region.',
        result: 'Cyber insurance was reinstated within 30 days. The firm passed a Law Society technology audit. Zero breaches or unauthorized access in 12 months of continuous monitoring.',
        metrics: [{ value: '100%', label: 'Endpoints Secured' }, { value: '30d', label: 'Insurance Reinstated' }, { value: '0', label: 'Data Breaches' }]
      },
      seoTitle: 'IT Support for Law Firms Toronto | CtrlShift IT Services',
      seoDescription: 'Managed IT for Toronto law firms. PIPEDA compliance, Law Society–aligned controls, cyber insurance readiness, and 24/7 security monitoring. GTA-based engineers.'
    },
    'accounting-firms': {
      title: 'IT Support for Accounting Firms in the GTA',
      badge: 'Accounting IT Specialists',
      headline: 'Managed IT for GTA Accounting Firms',
      subheadline: 'CRA-compliant IT infrastructure, encrypted client data handling, and cybersecurity-first support for accounting and financial services firms across the GTA.',
      painPoints: [
        { icon: 'bi-safe-fill', title: 'Client Financial Data Is a Target', detail: 'Accounting firms hold sensitive financial records that make you a high-value target. A single breach can trigger CRA reporting obligations and client liability.' },
        { icon: 'bi-calendar-x-fill', title: 'Tax Season Downtime Is Catastrophic', detail: 'Filing deadlines don\'t move. If your systems go down in March or April, the consequences are immediate and severe for your clients and your reputation.' },
        { icon: 'bi-file-earmark-ruled-fill', title: 'CRA Compliance Expectations', detail: 'CRA increasingly scrutinizes electronic record-keeping. Proper encryption, retention policies, and access controls are becoming table stakes.' },
        { icon: 'bi-usb-drive-fill', title: 'Staff Using Personal Devices', detail: 'Unmanaged personal devices accessing client files are a compliance gap. Device management and encryption policies fix this.' }
      ],
      compliance: [
        { icon: 'bi-shield-check-fill', title: 'CRA Data Handling', detail: 'Encrypted storage, access logging, and retention schedules aligned with CRA digital record-keeping requirements.' },
        { icon: 'bi-lock-fill', title: 'PIPEDA Compliance', detail: 'Personal financial data handled with full PIPEDA-compliant infrastructure, including breach response planning.' },
        { icon: 'bi-file-earmark-check-fill', title: 'Cyber Insurance Readiness', detail: 'Your policy requires MFA, endpoint protection, and verified backups. We build all of that in from day one.' }
      ],
      caseStudy: {
        problem: 'A Vaughan accounting firm with 12 staff had client files on unencrypted personal laptops, no patch management, staff sharing passwords, and a CRA audit flagging unacceptable digital record-keeping.',
        solution: 'Microsoft 365 Business Premium rollout with BitLocker encryption on all devices, Intune device management, password manager across all staff, automated patching, and PIPEDA-aligned retention policies.',
        result: 'Full compliance achieved within 45 days. 87% fewer helpdesk tickets in the first quarter after rollout. Cyber insurance renewed with better coverage. CRA audit passed without issue.',
        metrics: [{ value: '87%', label: 'Fewer Tickets (Q1)' }, { value: '45d', label: 'Full Compliance' }, { value: '$0', label: 'Compliance Fines' }]
      },
      seoTitle: 'Accounting Firm IT Support GTA | CtrlShift IT Services',
      seoDescription: 'Managed IT for GTA accounting firms with secure Microsoft 365, endpoint protection, encrypted backups, and CRA-aware workflows.'
    },
    'medical-clinics': {
      title: 'IT Support for Medical Clinics in Ontario',
      badge: 'Healthcare IT Specialists',
      headline: 'Managed IT for Medical Clinics in Ontario',
      subheadline: 'PHIPA-compliant IT infrastructure, EMR security, and 24/7 monitoring for medical clinics and healthcare practices across the GTA and Ontario.',
      painPoints: [
        { icon: 'bi-hospital-fill', title: 'EMR Downtime Stops Your Clinic', detail: 'When your EMR system goes down, appointments get cancelled and patients are turned away. Every hour of downtime has a direct, quantifiable cost.' },
        { icon: 'bi-file-medical-fill', title: 'PHI Must Be Protected', detail: 'Personal health information is among the most regulated data in Canada. A PHIPA breach can result in significant fines and reputational damage.' },
        { icon: 'bi-wifi-off', title: 'Unreliable Office Network', detail: 'Clinics depending on a single ISP connection for their EMR, PACS systems, and all communications are one router failure away from chaos.' },
        { icon: 'bi-cloud-slash-fill', title: 'No Tested Disaster Recovery', detail: 'Most clinics assume their backup is working. Few have ever actually tested restoring it. We verify and test your recovery plan.' }
      ],
      compliance: [
        { icon: 'bi-shield-check-fill', title: 'PHIPA Compliance', detail: 'Personal health information handled with PHIPA-required access controls, encryption, and audit logs.' },
        { icon: 'bi-cloud-check-fill', title: 'Canadian Data Residency', detail: 'All data stored in encrypted Canadian AWS regions — no cross-border PHI exposure.' },
        { icon: 'bi-arrow-repeat', title: 'Business Continuity', detail: '4-hour RTO with tested backups and a documented recovery plan for every system your clinic depends on.' }
      ],
      caseStudy: {
        problem: 'A Richmond Hill medical clinic had their EMR system crash twice in one quarter, causing appointment cancellations and a locum revenue loss. They had no backup strategy and no PHIPA-compliant data handling.',
        solution: 'CtrlShift IT Services implemented encrypted cloud backups with 4-hour RTO, migrated EMR to AWS Canadian region, established 24/7 uptime monitoring, and documented a full business continuity plan.',
        result: 'Zero unplanned downtime in the first 10 months. PHIPA compliance achieved. Estimated $15,000+ in recovered appointment revenue in year one — based on prior cancellation rates.',
        metrics: [{ value: '0', label: 'Downtime Events' }, { value: '4hr', label: 'Recovery Time' }, { value: '$15K+', label: 'Est. Revenue Recovered' }]
      },
      seoTitle: 'Medical Clinic IT Support Ontario | CtrlShift IT Services',
      seoDescription: 'PHIPA-compliant managed IT for medical clinics and healthcare practices in Ontario. EMR security, Canadian cloud hosting, 24/7 monitoring, and disaster recovery. GTA-based.'
    },
    'engineering-firms': {
      title: 'IT Support for Engineering Firms in Toronto',
      badge: 'Engineering IT Specialists',
      headline: 'Managed IT for Toronto Engineering Firms',
      subheadline: 'IP-protecting IT infrastructure, large-file collaboration support, and secure remote access for engineering and design firms across the GTA.',
      painPoints: [
        { icon: 'bi-file-earmark-code-fill', title: 'Intellectual Property at Risk', detail: 'CAD files, design documents, and project specifications represent your firm\'s core IP. Ransomware or insider threats can destroy years of work in hours.' },
        { icon: 'bi-hdd-fill', title: 'Large File Workflows Are Slow', detail: 'Engineering firms work with massive files across multiple collaborators. Poor storage architecture and network design creates friction your billing team notices.' },
        { icon: 'bi-building-gear', title: 'Regulatory Document Control', detail: 'Professional Engineers Ontario and project contracts often require version control, access logs, and secure document management. Most IT setups don\'t support this.' },
        { icon: 'bi-person-fill-gear', title: 'Remote Site Access', detail: 'Engineers need secure access to project files from field sites, client offices, and home — without exposing your internal network.' }
      ],
      compliance: [
        { icon: 'bi-shield-check-fill', title: 'PEO Technology Guidance', detail: 'Document control and data management aligned with Professional Engineers Ontario requirements.' },
        { icon: 'bi-lock-fill', title: 'IP Protection Controls', detail: 'DLP policies, access logging, and device management to prevent unauthorized exfiltration of proprietary designs.' },
        { icon: 'bi-cloud-check-fill', title: 'Secure Large File Collaboration', detail: 'SharePoint or AWS-based large file storage with version control, access permissions, and secure external sharing.' }
      ],
      caseStudy: {
        problem: 'A Toronto structural engineering firm had all its CAD files stored on a single on-premise server with no backup. Staff accessed files via unsecured RDP. A near-miss ransomware event prompted an urgent overhaul.',
        solution: 'Migration to SharePoint with version history and DLP policies, Tailscale replacing RDP for all remote access, Huntress EDR on all workstations, and nightly encrypted backups to AWS Canada.',
        result: 'No data loss events in 18 months. SharePoint version control recovered a critical file overwrite that would have cost 40+ hours of rework. Insurance renewed at preferred rates.',
        metrics: [{ value: '0', label: 'Data Loss Events' }, { value: '40hrs', label: 'Rework Avoided' }, { value: '100%', label: 'Endpoints Protected' }]
      },
      seoTitle: 'IT Support for Engineering Firms Toronto | CtrlShift IT Services',
      seoDescription: 'Managed IT for engineering firms in Toronto and GTA. IP protection, CAD file security, secure remote access, and 24/7 monitoring. Vaughan-based senior IT engineers.'
    },
    'small-businesses': {
      title: 'IT Support for Small Businesses in the GTA',
      badge: 'SMB IT Specialists',
      headline: 'Managed IT for Small Businesses in the GTA',
      subheadline: 'Enterprise-quality IT support at a small business price. Flat-rate managed IT, cybersecurity, and 24/7 monitoring for 5–50 person offices across the Greater Toronto Area.',
      painPoints: [
        { icon: 'bi-cash-coin', title: 'IT Costs Are Unpredictable', detail: 'Break-fix IT means you never know what you\'ll pay this month. One hardware failure or ransomware incident can cost thousands with no warning.' },
        { icon: 'bi-person-lock', title: 'No Dedicated IT Staff', detail: 'Small businesses can\'t afford full-time IT. But running without proper IT support is a much more expensive gamble long-term.' },
        { icon: 'bi-exclamation-triangle-fill', title: 'Cybercriminals Target SMBs', detail: '43% of cyberattacks target small businesses. Attackers know SMBs often lack the defences of larger companies. Ransomware doesn\'t discriminate by company size.' },
        { icon: 'bi-arrow-up-right-circle-fill', title: 'Growing Faster Than Your IT', detail: 'Adding staff, opening new locations, or shifting to hybrid work all create IT complexity that needs proactive management.' }
      ],
      compliance: [
        { icon: 'bi-shield-check-fill', title: 'PIPEDA Compliance', detail: 'Baseline privacy controls, encrypted data handling, and incident response procedures for any business collecting customer data.' },
        { icon: 'bi-file-earmark-check-fill', title: 'Cyber Insurance Eligibility', detail: 'MFA, EDR, and verified backups — the three controls most insurers require for SMB cyber coverage.' },
        { icon: 'bi-arrow-repeat', title: 'Business Continuity', detail: 'A plan so your business can recover from hardware failure, ransomware, or a major incident without losing critical data.' }
      ],
      caseStudy: {
        problem: 'A 15-person GTA professional services firm was spending $2,000+/month on reactive IT support — paying per ticket, per incident, with no monitoring and frequent outages disrupting client work.',
        solution: 'Transitioned to CtrlShift IT Services\' Growth plan at $549/month with proactive monitoring, Huntress EDR-backed endpoint protection, automated patching, and a priority helpdesk. All devices enrolled, MFA enforced.',
        result: 'IT incidents dropped 70% in the first 90 days. Monthly IT spend reduced by $1,200. Staff satisfaction with IT improved measurably. One ransomware attempt blocked automatically by Huntress.',
        metrics: [{ value: '70%', label: 'Fewer Incidents' }, { value: '$1.2K', label: 'Monthly Savings' }, { value: '1', label: 'Attack Blocked' }]
      },
      seoTitle: 'Small Business IT Support GTA | CtrlShift IT Services',
      seoDescription: 'Managed IT for small businesses in the GTA. Flat-rate plans starting at $299/month. Huntress EDR, 24/7 monitoring, cybersecurity, and Microsoft 365 support. No surprise invoices.'
    }
  };

  private route = inject(ActivatedRoute);
  private seo = inject(SeoService);

  ngOnInit() {
    this.industryKey = this.route.snapshot.data['industry'] as string;
    this.page = this.pages[this.industryKey];
    if (this.page) {
      (this.seo as SeoService).update({
        title: this.page.seoTitle,
        description: this.page.seoDescription,
        type: 'website',
        canonicalPath: this.route.snapshot.url.map(s => s.path).join('/')
      });
    }
  }
}
