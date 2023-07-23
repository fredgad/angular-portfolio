import { Component, WritableSignal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface TransformI {
  X: number;
  Y: number;
  Z: number;
}
type xyzT = 'X' | 'Y' | 'Z';

@Component({
  selector: 'angular-portfolio-rotate',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rotate.component.html',
  styleUrls: ['./rotate.component.scss'],
})
export class RotateComponent {
  public transform: WritableSignal<TransformI> = signal({
    X: 0,
    Y: 0,
    Z: 0,
  });

  public transform2: WritableSignal<TransformI> = signal({
    X: 0,
    Y: 0,
    Z: 0,
  });
  public transform3: WritableSignal<TransformI> = signal({
    X: 0,
    Y: 0,
    Z: 0,
  });

  public addPos(side: xyzT, angle: number) {
    console.log('addPos', side, angle);

    this.transform.mutate((x) => {
      x[side] = x[side] + angle;
    });
  }

  public addPos2(side: xyzT, angle: number) {
    const newAngle = angle > 0 ? (90 * Math.PI) / 180 : -(90 * Math.PI) / 180;
    console.log('addPos2', side, angle);

    this.transform2.mutate((x) => {
      x[side] = x[side] + newAngle;
    });
  }
  public addPos3(side: xyzT, angle: number) {
    console.log('addPos3', side, angle);

    this.transform3.mutate((x) => {
      x[side] = x[side] + angle;
    });
  }
}
