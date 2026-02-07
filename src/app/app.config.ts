import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    // withComponentInputBinding allows us to pass Route Data to components easily
    provideRouter(routes, withComponentInputBinding(), withViewTransitions()),
    provideClientHydration()
  ]
};
