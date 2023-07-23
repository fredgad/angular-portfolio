import {
  Component,
  HostListener,
  Inject,
  OnDestroy,
  OnInit,
  Self,
  WritableSignal,
  computed,
  effect,
} from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import {
  FirstScreenComponent,
  SecondScreenComponent,
  ThirdScreenComponent,
  FourthScreenComponent,
} from './components';
import { interval, Subscription, takeWhile, timer } from 'rxjs';
import { screensArray } from '@constants';
import { GearComponent, NavBarComponent } from '@app/features';
import { ScreensAnimation } from '@animations';
import { GearService } from '@services';
import { EventsService } from '@services';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    CommonModule,
    FirstScreenComponent,
    SecondScreenComponent,
    ThirdScreenComponent,
    FourthScreenComponent,
    GearComponent,
    NavBarComponent,
  ],
  animations: [ScreensAnimation],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  providers: [EventsService],
})
export class MainComponent implements OnDestroy {
  public currentScreen: WritableSignal<number> =
    this.gearService.currentScreen$i;
  public screens: string[] = screensArray;

  public newFontSize = 10;

  private aboutEntered = false;
  private delay = false;
  private subscription: Subscription = new Subscription();

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private gearService: GearService
  ) {
    effect(() => {
      this.newFontSize = 10;

      switch (this.currentScreen()) {
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

  public onTabsEntered(value: boolean): void {
    this.aboutEntered = value;
  }

  @HostListener('window:wheel', ['$event']) onWindowScroll(
    event: WheelEvent
  ): void {
    if (!this.delay && !this.aboutEntered) {
      this.screenCounter(event);
    }
  }

  private screenCounter(event: WheelEvent): void {
    this.delay = true;

    if (event.deltaY > 0) {
      this.gearService.nextScreen();
    } else {
      this.gearService.prevScreen();
    }

    timer(500).subscribe(() => {
      this.delay = false;
    });
  }

  public changeGearSize(): void {
    const htmlElement = this.document.documentElement;
    const styles = window.getComputedStyle(htmlElement);
    const fontSize = styles.getPropertyValue('font-size');

    let currentSize = Number(fontSize.split('px')[0]);
    const direction = currentSize - this.newFontSize;

    this.subscription.add(
      interval(1)
        .pipe(
          takeWhile(() => {
            if (direction > 0) {
              return currentSize > this.newFontSize;
            } else {
              return currentSize < this.newFontSize;
            }
          })
        )
        .subscribe(() => {
          if (direction > 0) {
            currentSize = currentSize - 0.25;
          } else {
            currentSize = currentSize + 0.25;
          }
          htmlElement.style.fontSize = currentSize + 'px';
        })
    );
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // public ngOnDestroy(): void {
  //   this.subscriptions.forEach((s) => s?.unsubscribe());
  // }
}
