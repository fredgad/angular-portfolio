export interface CubeStatePropsI {
  data: CubePositionsI;
}

export interface CubePositionsI {
  CubePositions: GenericKeyStringObject<CubePositionI>;
}

export interface CubePositionI {
  botLayer: {
    pos_X: number;
    pos_Y: number;
    pos_Z: number;
  };
  topLayer: {
    posT_X: number;
    posT_Y: number;
    posT_Z: number;
  };
  axes: string[];
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
