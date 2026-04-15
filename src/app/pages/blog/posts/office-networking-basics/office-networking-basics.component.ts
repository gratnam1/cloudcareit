import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-office-networking-basics',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './office-networking-basics.component.html',
  styleUrl: './office-networking-basics.component.css'
})
export class OfficeNetworkingBasicsComponent {
  publishedDate = 'February 14, 2026';
  readingTime = '8 min read';
}
