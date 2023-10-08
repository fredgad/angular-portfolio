import { Action, createReducer, on } from '@ngrx/store';
import {
  addBallPositions,
  addFieldSizes,
  addGoalBlue,
  addGoalRed,
  addWallBotPos,
  addWallsWidth,
  addWallTopPos,
  clearGoals,
  offGoalOut,
  pauseOff,
  pauseOn,
  restartGame,
  reverseBallXSpeed,
  reverseBallYSpeed,
} from './pong.actions';
// import { addActionRange, addActionText, getData, getDataFail, getDataSuccess } from "./test.actions";

export interface Game {
  pause: boolean;
  blueGoals: number;
  redGoals: number;
  goalOut: boolean;
}

export interface Field {
  width: number;
  height: number;
}

export interface Ball {
  ballSize: number;
  ballPos_X: number;
  ballPos_Y: number;
  ballSpeed_X: number;
  ballSpeed_Y: number;
}

export interface Walls {
  width: number;
  height: number;
  speed: number;
  wallBotPos: number;
  wallTopPos: number;
}

export interface PongState {
  game: Game;
  field: Field;
  ball: Ball;
  walls: Walls;
}

const initialState: PongState = {
  game: {
    pause: false,
    blueGoals: 0,
    redGoals: 0,
    goalOut: false,
  },
  field: {
    width: 0,
    height: 0,
  },
  ball: {
    ballSize: 30,
    ballPos_X: 200,
    ballPos_Y: 0,
    ballSpeed_X: 2,
    ballSpeed_Y: 2,
  },
  walls: {
    width: 0,
    height: 0,
    speed: 3,
    wallBotPos: 0,
    wallTopPos: 0,
  },
};

const pongReducer = createReducer(
  initialState,
  on(addFieldSizes, (state, { width, height }) => ({
    ...state,
    field: { width, height },
  })),
  on(addBallPositions, (state, { ballPos_X, ballPos_Y }) => ({
    ...state,
    ball: { ...state.ball, ballPos_X, ballPos_Y },
  })),
  on(reverseBallXSpeed, (state) => ({
    ...state,
    ball: {
      ...state.ball,
      ballSpeed_X: -state.ball.ballSpeed_X,
    },
  })),
  on(reverseBallYSpeed, (state) => ({
    ...state,
    ball: {
      ...state.ball,
      ballSpeed_Y: -state.ball.ballSpeed_Y,
    },
  })),
  on(addWallsWidth, (state, { width }) => ({
    ...state,
    walls: {
      ...state.walls,
      width,
    },
  })),
  on(addWallTopPos, (state, { wallTopPos }) => ({
    ...state,
    walls: {
      ...state.walls,
      wallBotPos: wallTopPos,
      wallTopPos: wallTopPos,
    },
  })),
  on(addWallBotPos, (state, { wallBotPos }) => ({
    ...state,
    walls: {
      ...state.walls,
      wallBotPos,
    },
  })),
  on(addGoalBlue, (state) => ({
    ...state,
    game: {
      ...state.game,
      blueGoals: state.game.blueGoals + 1,
      goalOut: true,
    },
  })),
  on(addGoalRed, (state) => ({
    ...state,
    game: {
      ...state.game,
      redGoals: state.game.redGoals + 1,
      goalOut: true,
    },
  })),
  on(offGoalOut, (state) => ({
    ...state,
    game: {
      ...state.game,
      goalOut: false,
    },
  })),
  on(clearGoals, (state) => ({
    ...state,
    game: {
      ...state.game,
      redGoals: 0,
      blueGoals: 0,
    },
  })),
  on(pauseOn, (state) => ({
    ...state,
    game: {
      ...state.game,
      pause: true,
    },
  })),
  on(pauseOff, (state) => ({
    ...state,
    game: {
      ...state.game,
      pause: false,
      goalOut: false,
    },
  })),
  on(restartGame, (state) => ({
    ...state,
    game: {
      ...state.game,
      blueGoals: 0,
      redGoals: 0,
    },
    ball: {
      ...state.ball,
      ballPos_X: 200,
      ballPos_Y: 0,
      ballSpeed_X: initialState.ball.ballSpeed_X,
      ballSpeed_Y: initialState.ball.ballSpeed_Y,
    },
  }))
);

export function reducerPong(state: PongState | undefined, action: Action) {
  return pongReducer(state, action);
}
