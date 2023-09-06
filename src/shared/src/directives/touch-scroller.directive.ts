import { Directive, HostListener, inject } from '@angular/core';
import { GearService, TabsService } from '../services';
import { timer } from 'rxjs';

@Directive({
  selector: '[appTouchScroller]',
  standalone: true,
})
export class TouchScrollerDirective {
  private gearService: GearService = inject(GearService);
  private tabsService: TabsService = inject(TabsService);
  private isTouchEnteredTab$i = this.tabsService.isTouchEnteredTab$i;

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
  }

  @HostListener('touchmove', ['$event'])
  private onTouchMove(event: TouchEvent): void {
    this.endX = event.touches[0].clientX;
    this.endY = event.touches[0].clientY;
  }

  @HostListener('touchend', ['$event'])
  private onTouchEnd(): void {
    this.deltaX = this.endX - this.startX;
    this.deltaY = this.endY - this.startY;

    this.countSwipeDirection();
  }

  private countSwipeDirection(): void {
    if (this.gearService.isScreenDelay$i() || this.tabsService.isEnteredTab$i())
      return;

    const delatXAbs = Math.abs(this.deltaX);
    const delatYAbs = Math.abs(this.deltaY);
    const realDelta = delatXAbs > delatYAbs ? this.deltaX : this.deltaY;

    if (delatXAbs < delatYAbs && this.isTouchEnteredTab$i()) return;

    if (realDelta !== 0) {
      this.gearService.setScreenDelay(true);
      timer(500).subscribe(() => {
        this.gearService.setScreenDelay(false);
      });
    }

    if (realDelta > 0) {
      this.gearService.prevScreen();
    } else if (realDelta < 0) {
      this.gearService.nextScreen();
    }
  }
}
