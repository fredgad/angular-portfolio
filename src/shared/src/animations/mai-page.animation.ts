import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export enum ScreensAnimationStateEnum {
  FIRST = 'first',
  SECOND = 'second',
  THIRD = 'third',
  FOURTH = 'fourth',
}

export const ScreensAnimation = [
  trigger('screensTrigger', [
    state(
      ScreensAnimationStateEnum.FIRST,
      style({
        left: '0',
      })
    ),
    state(
      ScreensAnimationStateEnum.SECOND,
      style({
        left: '-100vw',
      })
    ),
    state(
      ScreensAnimationStateEnum.THIRD,
      style({
        left: '-100vw',
        top: '-100vh',
      })
    ),
    state(
      ScreensAnimationStateEnum.FOURTH,
      style({
        left: '-200vw',
        top: '-100vh',
      })
    ),
    transition(
      `${ScreensAnimationStateEnum.FIRST} => ${ScreensAnimationStateEnum.SECOND}`,
      animate('500ms linear')
    ),
    transition(
      `${ScreensAnimationStateEnum.SECOND} => ${ScreensAnimationStateEnum.THIRD}`,
      animate('500ms linear')
    ),
    transition(
      `${ScreensAnimationStateEnum.THIRD} => ${ScreensAnimationStateEnum.FOURTH}`,
      animate('500ms linear')
    ),
    transition(
      `${ScreensAnimationStateEnum.FOURTH} => ${ScreensAnimationStateEnum.THIRD}`,
      animate('500ms ease-out')
    ),
    transition(
      `${ScreensAnimationStateEnum.THIRD} => ${ScreensAnimationStateEnum.SECOND}`,
      animate('500ms ease-out')
    ),
    transition(
      `${ScreensAnimationStateEnum.SECOND} => ${ScreensAnimationStateEnum.FIRST}`,
      animate('500ms ease-out')
    ),
  ]),
];
