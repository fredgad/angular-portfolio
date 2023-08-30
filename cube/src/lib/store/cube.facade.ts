import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as CubeActions from './cube.actions';

import {
  AppWithCubeState,
  selectCubeData,
  selectCubePositions,
} from './cube.selectors';
import {
  CubePositionI,
  CubePositionsI,
  GenericKeyStringObject,
} from '../entities/cube.interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CubeFacade {
  public cubeData$: Observable<CubePositionsI> = this.store$.pipe(
    select(selectCubeData)
  );

  public cubePositions$: Observable<GenericKeyStringObject<CubePositionI>> =
    this.store$.pipe(select(selectCubePositions));

  constructor(private store$: Store<AppWithCubeState>) {}

  public setAddCubePositions(props: any): void {
    // console.log(props, 'props setAddCubePositions');
    this.store$.dispatch(CubeActions.addCubePositions({ props }));
  }
}
