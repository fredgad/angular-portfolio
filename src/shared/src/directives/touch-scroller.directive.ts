import { Directive, HostListener, inject } from '@angular/core';
import { GearService } from '@services';

@Directive({
  selector: '[appTouchScroller]',
  standalone: true,
})
export class TouchScrollerDirective {
  private gearService: GearService = inject(GearService);

  private startX = 0;
  private startY = 0;
  private deltaX = 0;
  private deltaY = 0;
  private endX = 0;
  private endY = 0;

  @HostListener('touchstart', ['$event'])
  private onTouchStart(event: TouchEvent): void {
    this.startX = event.touches[0].clientX;
    this.startY = event.touches[0].clientY;
    this.endX = event.touches[0].clientX;
    this.endY = event.touches[0].clientY;
    console.log(this.startX, this.startY, 'touchstart');
  }

  @HostListener('touchmove', ['$event'])
  private onTouchMove(event: TouchEvent): void {
    this.endX = event.touches[0].clientX;
    this.endY = event.touches[0].clientY;
    // const scrollContainer = event.target as HTMLElement;
    // scrollContainer.scrollTop += deltaY;
    // console.log(this.endX, this.endY, 'touchmove');
  }

  @HostListener('touchend', ['$event'])
  private onTouchEnd(): void {
    this.deltaX = this.endX - this.startX;
    this.deltaY = this.endY - this.startY;

    this.countSwipeDirection();
  }

  private countSwipeDirection(): void {
    const delatXAbs = Math.abs(this.deltaX);
    const delatYAbs = Math.abs(this.deltaY);
    const realDelta = delatXAbs > delatYAbs ? this.deltaX : this.deltaY;

    console.log(realDelta, 'touchend');

    if (realDelta > 0) {
      this.gearService.prevScreen();
    } else if (realDelta < 0) {
      this.gearService.nextScreen();
      console.log('touchEND!');
    }
  }
}
