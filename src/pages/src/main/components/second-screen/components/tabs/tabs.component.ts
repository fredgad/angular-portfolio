import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsService } from '@services';
import { BackgroundImageDirective } from '@directives';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [CommonModule, BackgroundImageDirective],
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent {
  @Output() public tabsEnteredOutput = new EventEmitter();

  public tabsService: TabsService = inject(TabsService);
  public tabsPositions$: any = this.tabsService.tabsPositions$;

  public tabsPositions: string[] = this.tabsService.tabsPositions$.value;
  public currentTab$i = this.tabsService.currentTab$i;

  private aboutEntered = false;

  public mouseTabsEvent(value: boolean): void {
    this.aboutEntered = value;
    this.tabsEnteredOutput.emit(this.aboutEntered);
  }

  public ngOnInit(): void {
    this.tabsPositions$.subscribe((x: any) => {
      this.tabsPositions = x;
      console.log(x, 'posc');
    });
  }
}
