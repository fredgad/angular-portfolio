import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PongState } from './pong.reducer';

export interface State {
  _empty?: boolean;
}

export const storeFeatureKey = 'Pong';

export interface AppWithPongState extends State {
  [storeFeatureKey]: PongState;
}

export const selectFeature = createFeatureSelector<AppWithPongState, PongState>(
  storeFeatureKey
);

export const selectStore = createSelector(selectFeature, (state) => state);

export const selectFieldSizes = createSelector(
  selectFeature,
  (state) => state.field
);

export const selectWalls = createSelector(
  selectFeature,
  (state) => state.walls
);

export const selectBall = createSelector(selectFeature, (state) => state.ball);

export const selectGame = createSelector(selectFeature, (state) => state.game);

export const selectPause = createSelector(selectGame, (state) => state.pause);
