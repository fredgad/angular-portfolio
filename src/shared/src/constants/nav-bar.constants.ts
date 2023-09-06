import { BarMenuI } from '../interfaces';

export const BarMenu: BarMenuI[] = [
  {
    name: 'Main',
    link: 'Main',
    isRoute: true,
    state: false,
  },
  {
    name: 'React Regalo',
    link: 'https://regalo-margarita.web.app/',
    isRoute: false,
    target: '_blank',
    state: false,
  },
  {
    name: 'Vue Charts',
    link: 'https://char-ts.web.app/',
    isRoute: false,
    target: '_blank',
    state: false,
  },
  {
    name: 'NgRx Pong',
    link: 'pong',
    target: '_blank',
    state: false,
  },
  {
    name: '(fix here)',
    link: '',
    state: false,
  },
  {
    name: 'Fire Congrats',
    link: 'https://fire-cong.web.app/',
    isRoute: false,
    target: '_blank',
    state: false,
  },
  {
    name: 'Birthday',
    link: 'https://birth-cong.web.app/',
    isRoute: false,
    target: '_blank',
    state: false,
  },
  {
    name: 'Experiment',
    link: 'https://candy-poll.web.app/',
    isRoute: false,
    target: '_blank',
    state: false,
  },
  {
    name: 'Download resume',
    link: 'assets/resume/resume.pdf',
    download: 'resume.pdf',
    target: '_blank',
    state: false,
  },
];
