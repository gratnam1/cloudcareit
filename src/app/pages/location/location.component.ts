import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser'; // Important for SEO

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './location.component.html'
})
export class LocationComponent implements OnInit {
  // These inputs come automatically from app.routes.ts data
  @Input() city: string = '';
  @Input() region: string = '';
  @Input() landmark: string = '';

  constructor(private title: Title, private meta: Meta) {}

  ngOnInit() {
    // DYNAMICALLY UPDATE SEO TAGS
    this.title.setTitle(`IT Support ${this.city} | Managed IT Services`);
    this.meta.updateTag({ name: 'description', content: `Reliable IT support in ${this.city}. 15-minute response times for offices near ${this.landmark} and ${this.region}.` });
  }
}
