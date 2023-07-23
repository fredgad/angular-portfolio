import { Directive, Input, ElementRef, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[appBackgroundImage]',
  standalone: true,
})
export class BackgroundImageDirective implements OnInit {
  @Input('appBackgroundImage') imageUrl = '';

  private imagesPath = '../../assets/images/';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.renderer.setStyle(
      this.el.nativeElement,
      'background-image',
      `url(${this.imagesPath + this.imageUrl})`
    );
  }
}
