import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component'; // <--- CHANGED: Import from app.component

bootstrapApplication(AppComponent, appConfig)       // <--- CHANGED: Bootstrap AppComponent
  .catch((err) => console.error(err));
