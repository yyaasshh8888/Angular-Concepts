import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { RouteTrackerService } from './services/route-tracker.service';
import { NotFound404Component } from './components/404/404.component';
import { NgIf } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    NgIf,
    HeaderComponent,
    HttpClientModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'acc';
  showHeader: boolean = true;

  constructor(private routeTracker: RouteTrackerService) {
    this.routeTracker.getActiveComponent().subscribe((component) => {
      this.showHeader = component !== NotFound404Component;
    });
  }

  ngOnInit(): void {}
}
