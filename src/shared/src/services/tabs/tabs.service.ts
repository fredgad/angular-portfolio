import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TabsPositions } from '../../constants';

@Injectable({
  providedIn: 'root',
})
export class TabsService {
  public tabsPositions$ = new BehaviorSubject<string[]>(TabsPositions[0]);

  public setTab(tabNumber: number): void {
    this.tabsPositions$.next(TabsPositions[tabNumber]);
  }
}
