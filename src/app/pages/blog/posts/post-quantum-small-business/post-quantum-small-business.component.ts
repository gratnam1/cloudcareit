import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-post-quantum-small-business',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './post-quantum-small-business.component.html',
  styleUrl: './post-quantum-small-business.component.css'
})
export class PostQuantumSmallBusinessComponent {
  publishedDate = 'February 9, 2026';
  readingTime = '6 min read';
}
