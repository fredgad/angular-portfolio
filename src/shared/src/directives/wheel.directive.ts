import {
  Directive,
  HostListener,
  Inject,
  OnDestroy,
  WritableSignal,
  effect,
} from '@angular/core';
import { EventsService, GearService, TabsService } from '../services';
import { DOCUMENT } from '@angular/common';
import { Subscription, interval, takeWhile, timer } from 'rxjs';

@Directive({
  selector: '[appWheel]',
  standalone: true,
})
export class WheelDirective implements OnDestroy {
  public currentScreen$i: WritableSignal<number> =
    this.gearService.currentScreen$i;
  private isTabEntered$i = this.tabsService.isEnteredTab$i;
  private isScreenDelay$i = this.gearService.isScreenDelay$i;

  public newFontSize = 10;
  private subscription: Subscription = new Subscription();

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private gearService: GearService,
    private tabsService: TabsService,
    private eventsService: EventsService
  ) {
    effect(() => {
      this.newFontSize = 10;

      switch (this.currentScreen$i()) {
        case 0:
          this.newFontSize = 10;
          break;
        case 1:
          this.newFontSize = 1.5;
          break;
        case 2:
          this.newFontSize = 3;
          break;
        case 3:
          this.newFontSize = 3;
          break;
      }

      this.changeGearSize();
    });
  }

  @HostListener('window:wheel', ['$event']) onWindowScroll(
    event: WheelEvent
  ): void {
    if (!this.isScreenDelay$i() && !this.isTabEntered$i()) {
      this.screenCounter(event);
    }
  }

  private screenCounter(event: WheelEvent): void {
    this.gearService.setScreenDelay(true);

    if (event.deltaY > 0) {
      this.gearService.nextScreen();
    } else {
      this.gearService.prevScreen();
    }

    timer(500).subscribe(() => {
      this.gearService.setScreenDelay(false);
    });
  }

  public changeGearSize(): void {
    const htmlElement = this.document.documentElement;
    const styles = window.getComputedStyle(htmlElement);
    const fontSize = styles.getPropertyValue('font-size');

    let currentSize = Number(fontSize.split('px')[0]);
    const direction = currentSize - this.newFontSize > 0;

    if (this.eventsService.windowWidth < 767) {
      htmlElement.style.fontSize = this.newFontSize + 'px';
    } else {
      this.subscription.add(
        interval(1)
          .pipe(
            takeWhile(() => {
              if (direction) {
                return currentSize > this.newFontSize;
              } else {
                return currentSize < this.newFontSize;
              }
            })
          )
          .subscribe(() => {
            if (direction) {
              currentSize = currentSize - 0.25;
            } else {
              currentSize = currentSize + 0.25;
            }
            htmlElement.style.fontSize = currentSize + 'px';
          })
      );
    }
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
