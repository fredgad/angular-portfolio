import {
  Component,
  HostListener,
  Inject,
  OnDestroy,
  OnInit,
  WritableSignal,
  effect,
  inject,
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
import { GearService, EventsService, TabsService } from '@services';
import { TouchScrollerDirective, WheelDirective } from '@directives';

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
    TouchScrollerDirective,
    WheelDirective,
  ],
  animations: [ScreensAnimation],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  providers: [EventsService],
})
export class MainComponent {
  private gearService = inject(GearService);

  public currentScreen: WritableSignal<number> =
    this.gearService.currentScreen$i;

  public screens: string[] = screensArray;

  // public ngOnDestroy(): void {
  //   this.subscriptions.forEach((s) => s?.unsubscribe());
  // }
}
