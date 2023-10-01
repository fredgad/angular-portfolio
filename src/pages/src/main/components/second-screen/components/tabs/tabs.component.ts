import { AfterViewInit, Component, ElementRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LangService, TabsService } from '@services';
import { BackgroundImageDirective } from '@directives';
import { Observable, timer } from 'rxjs';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [CommonModule, BackgroundImageDirective],
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent implements AfterViewInit {
  private tabsService: TabsService = inject(TabsService);
  private langService: LangService = inject(LangService);

  private scrollableElement!: HTMLElement;
  private scrollableElementTwo!: HTMLElement;

  public tabsPositions$: Observable<string[]> = this.tabsService.tabsPositions$;
  public currentTab$i = this.tabsService.currentTab$i;
  public isEngLang$i = this.langService.isEngLang$i;

  constructor(private elementRef: ElementRef) {}

  public ngAfterViewInit(): void {
    this.scrollableElement = this.elementRef.nativeElement.querySelector(
      '.scrollable-element'
    );
    this.scrollableElementTwo = this.elementRef.nativeElement.querySelector(
      '.scrollable-element-two'
    );
  }

  public mouseTabsEvent(value: boolean): void {
    if (!value) {
      timer(300).subscribe(() => {
        this.tabsService.setAllowedBot(!value);
        this.tabsService.setAllowedTop(!value);
      });
    } else {
      this.tabsService.setAllowedBot(!value);
      this.tabsService.setAllowedTop(!value);
    }
  }

  public touchStart(): void {
    this.tabsService.setTouchEnteredTab(true);
  }

  public touchEnd(): void {
    timer(200).subscribe(() => {
      this.tabsService.setTouchEnteredTab(false);
    });
  }

  public touchCansel(): void {
    this.tabsService.setTouchEnteredTab(false);
  }

  public onScroll(event: Event, tab: number): void {
    const element = event.target as HTMLElement;
    let isScrollingDown;

    if (tab === 1) {
      isScrollingDown = element.scrollTop > this.scrollableElement.scrollTop;
    } else if (tab === 2) {
      isScrollingDown = element.scrollTop > this.scrollableElementTwo.scrollTop;
    }

    const elHeight = element.scrollHeight - element.clientHeight;

    const isAtBottom =
      elHeight === Math.round(element.scrollTop) ||
      Math.abs(elHeight - Math.round(element.scrollTop)) === 1;

    if (element.scrollTop !== elHeight && Math.round(element.scrollTop) !== 0) {
      this.tabsService.setAllowedTop(false);
      this.tabsService.setAllowedBot(false);
    }

    if (isAtBottom) {
      // console.log('User finished scrolling to the bottom');
      this.tabsService.setAllowedTop(false);
      this.tabsService.setAllowedBot(true);
    }

    if (!isScrollingDown && element.scrollTop === 0) {
      // console.log('User finished scrolling to the top');
      this.tabsService.setAllowedTop(true);
      this.tabsService.setAllowedBot(false);
    }
  }

  onWheel(event: WheelEvent, tab: number): void {
    const element: HTMLElement =
      tab === 1 ? this.scrollableElement : this.scrollableElementTwo;

    const isScrollingUp = event.deltaY < 0;

    if (isScrollingUp && element.scrollTop === 0) {
      // console.log('User is trying to scroll up from the top');
      this.tabsService.setAllowedTop(true);
      this.tabsService.setAllowedBot(false);
    }
  }
}
