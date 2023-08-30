import {
  Component,
  OnInit,
  WritableSignal,
  effect,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CubePageComponent } from '@app/cube';
import { GearService } from '../../../../../shared/src';

@Component({
  selector: 'app-third-screen',
  standalone: true,
  imports: [CommonModule, CubePageComponent],
  templateUrl: './third-screen.component.html',
  styleUrls: ['./third-screen.component.scss'],
})
export class ThirdScreenComponent {
  public currentScreen$i: WritableSignal<number> =
    this.gearService.currentScreen$i;
  public currentScreen = 0;

  constructor(private gearService: GearService) {
    effect(() => {
      this.currentScreen = this.currentScreen$i();
    });
  }
}
