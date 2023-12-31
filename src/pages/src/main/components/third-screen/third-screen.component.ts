import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Signal,
  effect,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { GearService, LangService } from '@services';
import { NgOptimizedImage } from '@angular/common';
import { BarMenu } from '@constants';
import { BarMenuI } from '@interfaces';

@Component({
  selector: 'app-third-screen',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './third-screen.component.html',
  styleUrls: ['./third-screen.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThirdScreenComponent {
  public currentScreen$i = this.gearService.currentScreen$i;
  public barMenu: BarMenuI[] = BarMenu;

  public imagesPaths = 'assets/images/main/';
  public isTopClass = true;
  public isRightClass = false;

  public isEngLang$i: Signal<boolean> = this.langService.isEngLang$i;

  constructor(
    private gearService: GearService,
    private langService: LangService,
    private cdr: ChangeDetectorRef
  ) {
    effect(() => {
      switch (this.currentScreen$i()) {
        case 1:
          this.isTopClass = true;
          break;
        case 2:
          this.isTopClass = false;
          this.isRightClass = false;
          break;
        case 3:
          this.isRightClass = true;
          break;
      }
      this.cdr.markForCheck();
    });
  }
}
