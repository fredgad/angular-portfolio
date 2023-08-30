import { Component, HostListener, Input, inject } from '@angular/core';
import { CommonModule, KeyValue } from '@angular/common';
import {
  CubePositionI,
  GenericKeyStringObject,
} from '../entities/cube.interfaces';
import { Observable, take, takeWhile, timer } from 'rxjs';
import { CubeFacade } from '../store/cube.facade';
import { EdgeCubeComponent } from './edge-cube/edge-cube.component';
import { StoreModule } from '@ngrx/store';
import { reducerCube } from '../store/cube.reducer';
import { CubeInitialPositions } from '../entities/cube.constants';

@Component({
  selector: 'cube-page',
  standalone: true,
  imports: [
    CommonModule,
    EdgeCubeComponent,
    // StoreModule.forRoot({ Cube: reducerCube }),
  ],
  templateUrl: './cube-page.component.html',
  styleUrls: ['./cube-page.component.scss'],
})
export class CubePageComponent {
  @Input() set currentPage(value: number) {
    this.cubeSwiper(value);
  }

  private cubeFacade = inject(CubeFacade);

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
    this.cubePositions$.subscribe((x) => {
      // console.log(x, 'CubePosition');
      this.straight = x['t_l_F'].pos_X === 0;
    });
  }

  public cubeSwiper(screen: number): void {
    if (screen === 2) {
      this.cubeExploded = false;
      timer(0)
        .pipe(take(1))
        .subscribe(() => {
          this.stopCube();
        });
    }
    if (!this.cubeExploded && screen !== 2) {
      this.cubeExploded = true;

      timer(450)
        .pipe(take(1))
        .subscribe(() => {
          this.explodeCube();
        });
    }
    console.log(screen, '!current!');
  }

  public explodeCube() {
    this.cubeKeys.forEach((key) => {
      const speed1 = Math.random() * 360;
      const speed2 = Math.random() * 360;
      const speed3 = Math.random() * 360;
      // if (this.cubeStrikt === true) {
      //   speed1 = 0;
      //   speed2 = 0;
      //   speed3 = 0;
      // }

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

    // this.cubeStrikt = !this.cubeStrikt;
  }

  public stopCube() {
    this.cubeStrikt = !this.cubeStrikt;
    console.log('sad');
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
    console.log('mouse Down');
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
        console.log('Right');
        Ydirection += 90;
      } else {
        console.log('Left');
        Ydirection -= 90;
      }
    } else {
      if (offsetY > 0) {
        console.log('Down');
        Xdirection -= 90;
      } else {
        console.log('Up');
        Xdirection += 90;
      }
    }

    const changeTopPositions = {
      key: this.currentKey,
      values: {
        topLayer: {
          posT_X: this.currentValues.pos_X + Xdirection,
          posT_Y: this.currentValues.pos_Y + Ydirection,
          posT_Z: this.currentValues.pos_Z,
        },
      },
    };

    this.cubeFacade.setAddCubePositions(changeTopPositions);
  }

  public onMouseMove(event: MouseEvent): void {
    if (!this.isMouseDown) {
      return;
    }
    console.log('MouseMove');
  }

  public trackByFn(_: number, item: KeyValue<string, any>): string {
    return item.key;
  }
}
