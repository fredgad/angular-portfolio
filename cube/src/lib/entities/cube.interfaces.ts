export interface CubeStatePropsI {
  data: CubePositionsI;
}

export interface CubePositionsI {
  CubePositions: GenericKeyStringObject<CubePositionI>;
}

export interface CubePositionI {
  pos_X: number;
  pos_Y: number;
  pos_Z: number;
}

export interface CubeColorsI {
  top: string;
  left: string;
  front: string;
  right: string;
  bot: string;
  back: string;
}

export interface GenericKeyStringObject<T> {
  [key: string]: T;
}

export interface State {
  _empty?: boolean;
}
