import { createAction, props } from '@ngrx/store';
// import { ErrorList } from '@interfaces';

export const addCubePositions = createAction(
  '[Cube] Add Cube Position',
  props<{ props: any }>()
);
