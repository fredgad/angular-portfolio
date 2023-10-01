import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  WritableSignal,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FirstScreenComponent,
  SecondScreenComponent,
  ThirdScreenComponent,
  FourthScreenComponent,
} from './components';
import { screensArray } from '@constants';
import {
  GearComponent,
  NavBarComponent,
  LangComponent,
  MusicComponent,
} from '@app/features';
import { ScreensAnimation } from '@animations';
import { GearService, EventsService, LangService } from '@services';
import { TouchScrollerDirective, WheelDirective } from '@directives';
import { LangEnum } from '@interfaces';

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
    LangComponent,
    MusicComponent,
    NavBarComponent,
    TouchScrollerDirective,
    WheelDirective,
  ],
  animations: [ScreensAnimation],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  providers: [EventsService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent implements OnInit {
  private gearService: GearService = inject(GearService);
  private langService: LangService = inject(LangService);

  public currentScreen: WritableSignal<number> =
    this.gearService.currentScreen$i;

  public screens: string[] = screensArray;

  public ngOnInit(): void {
    this.initialiseLanguge();
  }
  public ngDoCheck(value1: any, value2: any): void {
    console.log('ngDoCheck', value1, value2);
  }

  private initialiseLanguge(): void {
    const storageLang = window.localStorage.getItem('lang');
    const initialLang = storageLang || LangEnum.ENG;

    this.langService.changeLang(initialLang as LangEnum);
  }
}
