import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appNumbersOnly]',
  standalone: true,
})
export class NumbersOnlyDirective {
  private regex: RegExp = new RegExp(/^\d*\.?\d{0,4}$/); // Regex to match valid decimal numbers
  private specialKeys: Array<string> = [
    'Backspace',
    'Tab',
    'End',
    'Home',
    'ArrowLeft',
    'ArrowRight',
    'Delete',
  ]; // Allow special keys
  private ctrlKeys: Array<string> = ['c', 'v', 'x', 'a']; // Allow Ctrl+C, Ctrl+V, Ctrl+X, Ctrl+A

  constructor(private el: ElementRef) {}

  @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
    const current: string = this.el.nativeElement.value;
    const position = this.el.nativeElement.selectionStart;
    const next: string = [
      current.slice(0, position),
      event.key === 'Decimal' ? '.' : event.key,
      current.slice(position),
    ].join('');

    if (
      this.specialKeys.indexOf(event.key) !== -1 ||
      (event.ctrlKey && this.ctrlKeys.indexOf(event.key.toLowerCase()) !== -1)
    ) {
      return;
    }

    if (!this.regex.test(next) || this.isModifierKey(event)) {
      event.preventDefault();
    }
  }

  @HostListener('paste', ['$event']) onPaste(event: ClipboardEvent) {
    const clipboardData = event.clipboardData;
    const pastedInput = clipboardData?.getData('text');

    if (
      pastedInput &&
      (!this.regex.test(pastedInput) ||
        (pastedInput.match(/\./g) || []).length > 1)
    ) {
      event.preventDefault();
    }
  }

  @HostListener('input', ['$event']) onInputChange(event: Event) {
    this.ensureNumberOnly(event);
  }

  ensureNumberOnly(event: Event) {
    const input = this.el.nativeElement;
    const initialValue = input.value;

    // Remove all non-numeric characters except a single decimal point
    input.value = initialValue.replace(/[^0-9.]/g, '');

    // Ensure there is only one decimal point
    const decimalIndex = input.value.indexOf('.');
    if (decimalIndex !== -1) {
      input.value =
        input.value.slice(0, decimalIndex + 1) +
        input.value.slice(decimalIndex + 1).replace(/\./g, '');
    }

    // If the value was altered, trigger the input event manually
    if (initialValue !== input.value) {
      event.stopPropagation();
    }
  }
  private isModifierKey(event: KeyboardEvent): boolean {
    return event.ctrlKey || event.metaKey || event.altKey;
  }
}
