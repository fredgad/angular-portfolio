import {
  ChangeDetectionStrategy,
  Component,
  WritableSignal,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { GearService } from '@services';
import { CubePageComponent } from '@app/cube';

@Component({
  selector: 'app-fourth-screen',
  standalone: true,
  imports: [CommonModule, CubePageComponent],
  templateUrl: './fourth-screen.component.html',
  styleUrls: ['./fourth-screen.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FourthScreenComponent {
  private gearService = inject(GearService);

  public currentScreen$i: WritableSignal<number> =
    this.gearService.currentScreen$i;
}
