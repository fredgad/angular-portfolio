import { Component, HostListener, inject } from '@angular/core';
import { CommonModule, KeyValue } from '@angular/common';
import {
  CubePositionI,
  GenericKeyStringObject,
} from '../entities/cube.interfaces';
import { Observable, timer } from 'rxjs';
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
  private cubeFacade = inject(CubeFacade);

  public isMouseDown = false;
  public startX = 0;
  public startY = 0;

  private currentKey = '';
  private currentValues: CubePositionI = {
    botLayer: {
      pos_X: 0,
      pos_Y: 0,
      pos_Z: 0,
    },
    topLayer: {
      posT_X: 0,
      posT_Y: 0,
      posT_Z: 0,
    },
    axes: [],
  };

  private cubeKeys = Object.keys(CubeInitialPositions);

  public cubePositions$: Observable<GenericKeyStringObject<CubePositionI>> =
    this.cubeFacade.cubePositions$;

  public ngOnInit(): void {
    this.cubePositions$.subscribe((x) => {
      console.log(x, 'CubePosition');
    });
    this.cubeKeys.forEach((key) => {
      timer(2000, 16).subscribe(() => {
        const speed1 = Math.random() * 5;
        const speed2 = Math.random() * 5;
        const speed3 = Math.random() * 5;
        const speed4 = Math.random() * 5;
        const speed5 = Math.random() * 5;
        const speed6 = Math.random() * 5;

        const changeTopPositions = {
          key: key,
          values: {
            botLayer: {
              pos_X: speed1,
              pos_Y: speed2,
              pos_Z: speed3,
            },
            topLayer: {
              posT_X: speed4,
              posT_Y: speed5,
              posT_Z: speed6,
            },
            axes: this.currentValues.axes,
          },
        };

        // this.cubeFacade.setAddCubePositions(changeTopPositions);
      });
    });

    console.log('z2');
  }

  public onWheelCube(
    event: WheelEvent,
    { key, value }: KeyValue<string, CubePositionI>
  ): void {
    this.currentKey = key;
    this.currentValues = value;
    let tZdirection = 0;
    if (event.deltaY < 0) {
      tZdirection += 90;
    } else {
      tZdirection -= 90;
    }

    this.cubeFacade.setAddCubePositions({
      key: key,
      values: {
        botLayer: {
          pos_X: 0,
          pos_Y: 0,
          pos_Z: 0,
        },
        topLayer: {
          posT_X: this.currentValues.topLayer.posT_X,
          posT_Y: this.currentValues.topLayer.posT_Y,
          posT_Z: tZdirection,
        },
        axes: this.currentValues.axes,
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

    let tXdirection = 0;
    let tYdirection = 0;

    if (Math.abs(offsetX) === Math.abs(offsetY)) {
      return;
    }
    if (Math.abs(offsetX) > Math.abs(offsetY)) {
      if (offsetX > 0) {
        console.log('Right');
        tYdirection += 90;
      } else {
        console.log('Left');
        tYdirection -= 90;
      }
    } else {
      if (offsetY > 0) {
        console.log('Down');
        tXdirection -= 90;
      } else {
        console.log('Up');
        tXdirection += 90;
      }
    }

    const changeTopPositions = {
      key: this.currentKey,
      values: {
        topLayer: {
          posT_X: this.currentValues.topLayer.posT_X + tXdirection,
          posT_Y: this.currentValues.topLayer.posT_Y + tYdirection,
          posT_Z: this.currentValues.topLayer.posT_Z,
        },
        axes: this.currentValues.axes,
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
