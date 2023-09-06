import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TabsPositions } from '../../constants';

@Injectable({
  providedIn: 'root',
})
export class TabsService {
  public tabsPositions$ = new BehaviorSubject<string[]>(TabsPositions[0]);
  public currentTab$i = signal(0);
  public isEnteredTab$i = signal(false);
  public isTouchEnteredTab$i = signal(false);
  public isAllowedTop$i = signal(true);
  public isAllowedBot$i = signal(true);

  public setAllowedTop(value: boolean): void {
    console.log(value, 'setAllowedTop');
    this.isAllowedTop$i.set(value);
  }

  public setAllowedBot(value: boolean): void {
    console.log(value, 'setAllowedBot');
    this.isAllowedBot$i.set(value);
  }

  public setTab(tabNumber: number): void {
    this.currentTab$i.set(tabNumber);
    this.tabsPositions$.next(TabsPositions[tabNumber]);
  }

  public setEnteredTab(isEntered: boolean): void {
    this.isEnteredTab$i.set(isEntered);
  }

  public setTouchEnteredTab(isEntered: boolean): void {
    this.isTouchEnteredTab$i.set(isEntered);
  }
}
