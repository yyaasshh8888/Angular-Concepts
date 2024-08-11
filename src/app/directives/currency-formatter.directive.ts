import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appCurrencyFormatter]',
  standalone: true,
})
export class CurrencyFormatterDirective {
  @Input() cents: boolean = false;

  constructor(private el: ElementRef) {}

  @HostListener('focus') onFocus() {
    const value = this.el.nativeElement.value;
    this.el.nativeElement.value = this.stripCurrencyFormatting(value);
  }

  @HostListener('blur') onBlur() {
    const value = this.el.nativeElement.value;
    this.el.nativeElement.value = this.formatToCurrency(value);
  }

  private stripCurrencyFormatting(value: string): string {
    return value.replace(/[^0-9.]/g, '');
  }

  private formatToCurrency(value: string): string {
    if (!value) {
      return '';
    }

    // Ensure the value has two decimal places if cents is true
    let [integerPart, decimalPart] = value.split('.');

    if (this.cents) {
      // Ensure two decimal places are always shown
      decimalPart = (decimalPart || '') + '00';
      decimalPart = decimalPart.substring(0, 2);
    } else if (decimalPart) {
      // If cents is false, remove any decimal part
      decimalPart = '';
    }

    const formattedValue = decimalPart
      ? `${integerPart}.${decimalPart}`
      : integerPart;

    // Format the value as US currency without rounding
    return parseFloat(formattedValue).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: this.cents ? 2 : 0,
      maximumFractionDigits: this.cents ? 2 : 0,
    });
  }
}
