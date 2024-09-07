// xss.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class XssInterceptor implements HttpInterceptor {
  // Define potential XSS patterns, like script tags and event handlers
  private xssPatterns: RegExp[] = [
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, // Script tags
    /javascript:/gi, // JavaScript protocol
    /onerror\s*=/gi, // Onerror event
    /onload\s*=/gi, // Onload event
  ];

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Clone the request to modify it (useful if we need to sanitize something)
    let clonedRequest = req;

    // Check if the request body contains any potential XSS patterns
    if (req.body) {
      const sanitizedBody = this.sanitizeXss(req.body);

      // If sanitization happens, update the request
      if (sanitizedBody !== req.body) {
        clonedRequest = req.clone({ body: sanitizedBody });
      }
    }

    // Pass the request to the next handler in the chain
    return next.handle(clonedRequest);
  }

  // Function to sanitize the body for XSS and log the matched patterns
  private sanitizeXss(body: any): any {
    let sanitizedBody = JSON.stringify(body);

    this.xssPatterns.forEach((pattern) => {
      const matches = sanitizedBody.match(pattern);
      if (matches) {
        console.warn('Potential XSS detected:', matches[0]);
        sanitizedBody = sanitizedBody.replace(pattern, ''); // Remove the XSS pattern
      }
    });

    return JSON.parse(sanitizedBody);
  }
}
