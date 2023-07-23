import { Action, createReducer, on } from '@ngrx/store';
import * as CubeActions from './cube.actions';
import { CubeStatePropsI } from '../entities/cube.interfaces';
import { AppWithCubeState } from './cube.selectors';
import { CubeInitialPositions } from '../entities/cube.constants';

export const storeFeatureKey = 'Cube';

export const initialState: CubeStatePropsI = {
  data: {
    CubePositions: CubeInitialPositions,
  },
};

const cubeReducer = createReducer(
  initialState,
  on(CubeActions.addCubePositions, (state, { props }) => {
    console.log(state, props, ' addCubePositions : state, props');
    return {
      ...state,
      data: {
        CubePositions: {
          ...state.data.CubePositions,
          [props.key]: {
            ...state.data.CubePositions[props.key],
            ...props.values,
          },
        },
      },
    };
  })
  // on(CubeActions.getPageFail, (state) => ({ ...state, loading: false })),
  // on(CubeActions.getPageSuccess, (state, { data }): AppWideStateProps => ({ ...state, data, loading: false })),
);

export function reducerCube(
  state: CubeStatePropsI | undefined,
  action: Action
) {
  return cubeReducer(state, action);
}
