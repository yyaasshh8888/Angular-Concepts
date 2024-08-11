import { Component } from '@angular/core';
import { LoremComponent } from '../lorem/lorem.component';
import { HighlightDirective } from '../../directives/highlight.directive';
import { MagnifierDirective } from '../../directives/magnifier.directive';
import { NumbersOnlyDirective } from '../../directives/number-only.directive';
import { CurrencyFormatterDirective } from '../../directives/currency-formatter.directive';
import { InfoBannerComponent } from '../info-banner/info-banner.component';

@Component({
  selector: 'app-highlight-example',
  standalone: true,
  imports: [
    LoremComponent,
    HighlightDirective,
    MagnifierDirective,
    NumbersOnlyDirective,
    CurrencyFormatterDirective,
    InfoBannerComponent,
  ],
  templateUrl: './highlight-example.component.html',
  styleUrl: './highlight-example.component.scss',
})
export class HighlightExampleComponent {}
