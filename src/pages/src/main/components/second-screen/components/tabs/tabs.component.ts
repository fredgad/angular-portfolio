import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsService } from '@services';
import { BackgroundImageDirective } from '@directives';
import { Observable, timer } from 'rxjs';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [CommonModule, BackgroundImageDirective],
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent {
  public tabsService: TabsService = inject(TabsService);

  public tabsPositions$: Observable<string[]> = this.tabsService.tabsPositions$;
  public currentTab$i = this.tabsService.currentTab$i;

  public mouseTabsEvent(value: boolean): void {
    this.tabsService.setEnteredTab(value);
  }
  public touchEvent(): void {
    this.tabsService.setEnteredTab(true);
    timer(200).subscribe(() => {
      this.tabsService.setEnteredTab(false);
    });
  }
}
