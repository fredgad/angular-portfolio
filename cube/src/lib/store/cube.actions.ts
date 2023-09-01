import { createAction, props } from '@ngrx/store';
import { PropsCubePositionI } from '../entities/cube.interfaces';

export const addCubePositions = createAction(
  '[Cube] Add Cube Position',
  props<{ props: PropsCubePositionI }>()
);
