import { createFeatureSelector, createSelector } from '@ngrx/store';
import { storeFeatureKey } from './cube.reducer';
import {
  CubeStatePropsI,
  State,
  CubePositionsI,
  GenericKeyStringObject,
  CubePositionI,
} from '../entities/cube.interfaces';

export interface AppWithCubeState extends State {
  [storeFeatureKey]: CubeStatePropsI;
}

export const selectFeature = createFeatureSelector<
  AppWithCubeState,
  CubeStatePropsI
>(storeFeatureKey);

// export const selectMobileMenuIsOpen = createSelector(
//   selectFeature,
//   (state: CubeStatePropsI): CubeStatePropsI['mobileMenuState']['isOpen'] => state.mobileMenuState.isOpen
// );

export const selectCubeData = createSelector(
  selectFeature,
  (state: CubeStatePropsI): CubePositionsI => state?.data
);

export const selectCubePositions = createSelector(
  selectCubeData,
  (state: CubePositionsI): GenericKeyStringObject<CubePositionI> => {
    return state?.CubePositions;
  }
);
