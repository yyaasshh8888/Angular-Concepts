import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { XssInterceptor } from './xss.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: XssInterceptor,
    //   multi: true,
    // },
  ],
};
