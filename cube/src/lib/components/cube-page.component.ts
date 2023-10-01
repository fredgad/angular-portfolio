import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule, KeyValue } from '@angular/common';
import {
  CubePositionI,
  GenericKeyStringObject,
} from '../entities/cube.interfaces';
import { Observable, Subscription, take, timer } from 'rxjs';
import { CubeFacade } from '../store/cube.facade';
import { EdgeCubeComponent } from './edge-cube/edge-cube.component';
import { CubeInitialPositions } from '../entities/cube.constants';

@Component({
  selector: 'cube-page',
  standalone: true,
  imports: [CommonModule, EdgeCubeComponent],
  templateUrl: './cube-page.component.html',
  styleUrls: ['./cube-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CubePageComponent implements OnInit, OnDestroy {
  @Input() set currentPage(value: number) {
    this.cubeSwiper(value);
  }

  private cubeFacade: CubeFacade = inject(CubeFacade);

  private subscription: Subscription = new Subscription();

  public isMouseDown = false;
  public startX = 0;
  public startY = 0;
  public straight = true;
  public cubeExploded = false;

  private currentKey = '';
  private currentValues: CubePositionI = {
    pos_X: 0,
    pos_Y: 0,
    pos_Z: 0,
  };

  private cubeStrikt = false;

  private cubeKeys = Object.keys(CubeInitialPositions);

  public cubePositions$: Observable<GenericKeyStringObject<CubePositionI>> =
    this.cubeFacade.cubePositions$;

  public ngOnInit(): void {
    this.subscription.add(
      this.cubePositions$.subscribe((x) => {
        this.straight = x['t_l_F'].pos_X === 0;
      })
    );
  }

  public cubeSwiper(screen: number): void {
    if (screen === 3) {
      this.cubeExploded = false;
      timer(0)
        .pipe(take(1))
        .subscribe(() => {
          this.stopCube();
        });
    }
    if (!this.cubeExploded && screen !== 3) {
      this.cubeExploded = true;

      timer(450)
        .pipe(take(1))
        .subscribe(() => {
          this.explodeCube();
        });
    }
  }

  public explodeCube() {
    this.cubeKeys.forEach((key) => {
      const speed1 = Math.random() * 360;
      const speed2 = Math.random() * 360;
      const speed3 = Math.random() * 360;

      const changeTopPositions = {
        key: key,
        values: {
          pos_X: speed1,
          pos_Y: speed2,
          pos_Z: speed3,
        },
      };

      this.cubeFacade.setAddCubePositions(changeTopPositions);
    });
  }

  public stopCube() {
    this.cubeStrikt = !this.cubeStrikt;
    this.cubeKeys.forEach((key) => {
      const changeTopPositions = {
        key: key,
        values: {
          pos_X: 0,
          pos_Y: 0,
          pos_Z: 0,
        },
      };

      this.cubeFacade.setAddCubePositions(changeTopPositions);
    });
  }

  public onWheelCube(
    event: WheelEvent,
    { key, value }: KeyValue<string, CubePositionI>
  ): void {
    this.currentKey = key;
    this.currentValues = value;
    let tZdirection = 0;
    if (event.deltaY < 0) {
      tZdirection += 0;
    } else {
      tZdirection -= 0;
    }

    this.cubeFacade.setAddCubePositions({
      key: key,
      values: {
        pos_X: this.currentValues.pos_X,
        pos_Y: this.currentValues.pos_Y,
        pos_Z: tZdirection,
      },
    });
  }

  public onMouseDown(
    event: MouseEvent,
    { key, value }: KeyValue<string, CubePositionI>
  ): void {
    this.isMouseDown = true;
    this.startX = event.clientX;
    this.startY = event.clientY;
    this.currentKey = key;
    this.currentValues = value;
  }

  public onMouseUp(event: MouseEvent): void {
    this.isMouseDown = false;
    const offsetX = event.clientX - this.startX;
    const offsetY = event.clientY - this.startY;

    let Xdirection = 0;
    let Ydirection = 0;

    if (Math.abs(offsetX) === Math.abs(offsetY)) {
      return;
    }
    if (Math.abs(offsetX) > Math.abs(offsetY)) {
      if (offsetX > 0) {
        Ydirection += 90;
      } else {
        Ydirection -= 90;
      }
    } else {
      if (offsetY > 0) {
        Xdirection -= 90;
      } else {
        Xdirection += 90;
      }
    }

    const changeTopPositions = {
      key: this.currentKey,
      values: {
        pos_X: this.currentValues.pos_X + Xdirection,
        pos_Y: this.currentValues.pos_Y + Ydirection,
        pos_Z: this.currentValues.pos_Z,
      },
    };

    this.cubeFacade.setAddCubePositions(changeTopPositions);
  }

  public trackByFn(_: number, item: KeyValue<string, any>): string {
    return item.key;
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
