export interface BreakpointProps {
  key: number;
  value: number;
}

export type ScrollDirectionType = ScrollDirectionEnum;

export enum BREAKPOINT_KEY_ENUM {
  xlarge,
  large,
  medium,
  small,
  xsmall,
}

export const BREAKPOINTS: BreakpointProps[] = [
  { key: BREAKPOINT_KEY_ENUM.xlarge, value: 1600 },
  { key: BREAKPOINT_KEY_ENUM.large, value: 1280 },
  { key: BREAKPOINT_KEY_ENUM.medium, value: 1024 },
  { key: BREAKPOINT_KEY_ENUM.small, value: 768 },
  { key: BREAKPOINT_KEY_ENUM.xsmall, value: 320 },
];

export enum ScrollDirectionEnum {
  UP,
  DOWN,
}
