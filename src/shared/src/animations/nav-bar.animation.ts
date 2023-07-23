import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export enum NavBarAnimationStateEnum {
  OPEN = 'open',
  CLOSED = 'closed',
}

export const NavBarAnimation = [
  trigger('navBarTrigger', [
    state(
      NavBarAnimationStateEnum.OPEN,
      style({
        width: '400px',
      })
    ),
    state(
      NavBarAnimationStateEnum.CLOSED,
      style({
        height: '200px',
      })
    ),
    transition(
      `${NavBarAnimationStateEnum.OPEN} => ${NavBarAnimationStateEnum.CLOSED}`,
      animate('1000ms linear')
    ),
    transition(
      `${NavBarAnimationStateEnum.CLOSED} => ${NavBarAnimationStateEnum.OPEN}`,
      animate('0s linear')
    ),
  ]),
];
