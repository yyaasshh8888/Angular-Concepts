import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true,
})
export class HighlightDirective {
  @Input('appHighlight') color!: string;
  constructor(private elementRef: ElementRef, private renderer2: Renderer2) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.change(this.color || 'yellow', true);
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.change('', false);
  }
  // ngOnInit() {
  //   this.change(this.color || 'yellow', true);
  // }
  change(color: string, isEnter: boolean) {
    this.renderer2.setStyle(
      this.elementRef.nativeElement,
      'backgroundColor',
      color
    );
    this.renderer2.setStyle(
      this.elementRef.nativeElement,
      'color',
      isEnter ? 'white' : 'black'
    );
  }
}
