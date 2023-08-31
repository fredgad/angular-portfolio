import {
  HostListener,
  Injectable,
  Signal,
  WritableSignal,
  signal,
} from '@angular/core';
import { BehaviorSubject, Observable, of, shareReplay, timer } from 'rxjs';
import {
  MAX_GEAR_SCREEN,
  MIN_GEAR_SCREEN,
  GearPositions,
} from '../../constants/gear.constants';
import { GearPositionsI } from '../../interfaces';

@Injectable({
  providedIn: 'root',
})
export class GearService {
  public initialGearPositions$: BehaviorSubject<GearPositionsI[]> =
    new BehaviorSubject(GearPositions);
  public gearPosition$i: WritableSignal<GearPositionsI> = signal(
    this.initialGearPositions$.value[0]
  );

  public currentScreen$i: WritableSignal<number> = signal(0);
  public isScreenDelay$i: WritableSignal<boolean> = signal(false);

  public setScreenDelay(value: boolean): void {
    this.isScreenDelay$i.set(value);
  }

  public rewriteSecondGearPositions(top: string, left: string): void {
    this.initialGearPositions$.value[1] = { top, left };
  }

  public changeGearPositionByScreen(screen: number): void {
    const { top, left } = GearPositions[screen];
    this.changeGearPosition(top, left);
  }

  public changeGearPosition(top: string, left: string): void {
    this.gearPosition$i.set({ top, left });
  }

  public nextScreen(): void {
    const newScreen =
      this.currentScreen$i() === MAX_GEAR_SCREEN
        ? MAX_GEAR_SCREEN
        : this.currentScreen$i() + 1;
    this.currentScreen$i.set(newScreen);
    this.changeGearPositionByScreen(newScreen);
  }

  public prevScreen(): void {
    const newScreen =
      this.currentScreen$i() === MIN_GEAR_SCREEN
        ? MIN_GEAR_SCREEN
        : this.currentScreen$i() - 1;

    this.currentScreen$i.set(newScreen);
    this.changeGearPositionByScreen(newScreen);
  }
}
