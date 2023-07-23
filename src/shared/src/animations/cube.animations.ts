import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

export const Animations = [
  trigger('dropdownAnimation', [
    state(
      'true',
      style({
        maxHeight: '{{numberOfDropdownItems}}px',
        overflow: 'hidden',
      }),
      { params: { numberOfDropdownItems: 1 } }
    ),
    state(
      'false',
      style({
        maxHeight: '0px',
        overflow: 'hidden',
        opacity: 0,
      })
    ),
    transition('true => false', animate('600ms ease-out')),
    transition('false => true', animate('1000ms ease-in')),
  ]),
];
