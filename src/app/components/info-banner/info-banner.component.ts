import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-info-banner',
  standalone: true,
  imports: [],
  templateUrl: './info-banner.component.html',
  styleUrl: './info-banner.component.scss',
})
export class InfoBannerComponent {
  @Input() msgText!: string;
  @Input() icon!: string;
}
