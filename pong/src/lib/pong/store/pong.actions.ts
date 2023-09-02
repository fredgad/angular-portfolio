import { createAction, props } from "@ngrx/store";

export const addFieldSizes = createAction(
  '[Pong] Add Field Sizes',
  props<{ width: number, height: number }>()
);

export const addBallPositions = createAction(
  '[Pong] Add Ball Positions',
  props<{ ballPos_X: number, ballPos_Y: number }>()
);

export const addWallsWidth = createAction(
  '[Pong] Add Walls Width',
  props<{ width: number }>()
);

export const addWallTopPos = createAction(
  '[Pong] Add Wall Top Pos',
  props<{ wallTopPos: number }>()
);
export const addWallBotPos = createAction(
  '[Pong] Add Wall Bot Pos',
  props<{ wallBotPos: number }>()
);

export const reverseBallXSpeed = createAction('[Pong] Reverse Ball X Speed');
export const reverseBallYSpeed = createAction('[Pong] Reverse Ball Y Speed');

export const addGoalRed = createAction('[Pong] Add Goal Red');
export const addGoalBlue = createAction('[Pong] Add Goal Blue');
export const clearGoals = createAction('[Pong] Clear Goals');


export const pauseOff = createAction('[Pong] Pause Off');
export const pauseOn = createAction('[Pong] Pause On');

export const offGoalOut = createAction('[Pong] Off Goal Out');
export const restartGame = createAction('[Pong] Restart Game');


// export const getData = createAction('[Test] Get Data');
// export const getDataFail = createAction('[Test] Get Data Fail');
// export const getDataSuccess = createAction(
//   '[Test] Get Data Success',
//   props<{ data: any }>()
// );