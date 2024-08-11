import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appMagnifier]',
  standalone: true,
})
export class MagnifierDirective {
  originalFontSize!: string;
  constructor(private el: ElementRef, private renderer2: Renderer2) {}

  ngOnInit() {
    this.originalFontSize = window.getComputedStyle(
      this.el.nativeElement
    ).fontSize;
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.el.nativeElement.style.fontSize = '32px';
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.el.nativeElement.style.fontSize = this.originalFontSize;
  }
}
