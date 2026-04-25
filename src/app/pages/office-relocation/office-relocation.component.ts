import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SeoService } from '../../shared/seo/seo.service';

interface ChecklistItem {
  id: string;
  task: string;
  category: 'network' | 'hardware' | 'comms' | 'security';
  completed: boolean;
}

@Component({
  selector: 'app-office-relocation',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './office-relocation.component.html',
  styleUrl: './office-relocation.component.css'
})
export class OfficeRelocationComponent implements OnInit {
  private seo = inject(SeoService);

  checklist: ChecklistItem[] = [
    { id: '1', task: 'Audit current IT infrastructure & inventory', category: 'hardware', completed: false },
    { id: '2', task: 'Coordinate ISP / Fiber installation at new site (Lead time: 60-90 days)', category: 'network', completed: false },
    { id: '3', task: 'Plan low-voltage cabling (Cat6) & server room layout', category: 'network', completed: false },
    { id: '4', task: 'Verify VoIP / Phone system portability & cutover plan', category: 'comms', completed: false },
    { id: '5', task: 'Perform full data backup & off-site verification', category: 'security', completed: false },
    { id: '6', task: 'Schedule hardware decommissioning & secure transport', category: 'hardware', completed: false },
    { id: '7', task: 'Test firewall & Wi-Fi mesh at new location', category: 'network', completed: false },
    { id: '8', task: 'Update business listings & emergency contact protocols', category: 'comms', completed: false }
  ];

  ngOnInit() {
    this.seo.update({
      title: 'Office IT Relocation Services Toronto & GTA | CtrlShift IT Services',
      description: 'Moving your office in the GTA? We handle full IT infrastructure relocation, cabling, ISP coordination, and server moves with zero data loss and minimal downtime.',
      type: 'website',
      canonicalPath: '/office-it-relocation'
    });
  }

  get progress(): number {
    const completed = this.checklist.filter(i => i.completed).length;
    return Math.round((completed / this.checklist.length) * 100);
  }
}
