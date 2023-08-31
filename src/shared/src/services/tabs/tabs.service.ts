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

  public setTab(tabNumber: number): void {
    this.currentTab$i.set(tabNumber);
    this.tabsPositions$.next(TabsPositions[tabNumber]);
  }

  public setEnteredTab(isEntered: boolean): void {
    this.isEnteredTab$i.set(isEntered);
  }
}
