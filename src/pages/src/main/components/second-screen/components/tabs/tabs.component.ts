import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  inject,
} from '@angular/core';
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

  public tabsPositions$: Observable<string[]> = this.tabsService.tabsPositions$;
  public currentTab$i = this.tabsService.currentTab$i;
  public isEngLang$i = this.langService.isEngLang$i;

  constructor(private elementRef: ElementRef) {}

  public ngAfterViewInit(): void {
    this.scrollableElement = this.elementRef.nativeElement.querySelector(
      '.scrollable-element'
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
    // timer(200).subscribe(() => {
    //   this.tabsService.setEnteredTab(false);
    // });
  }

  public touchEnd(): void {
    timer(200).subscribe(() => {
      this.tabsService.setTouchEnteredTab(false);
    });
  }

  public touchCansel(): void {
    console.log('asdasdfa');
    this.tabsService.setTouchEnteredTab(false);
  }

  public onScroll(event: Event) {
    const element = event.target as HTMLElement;
    const isScrollingDown =
      element.scrollTop > this.scrollableElement.scrollTop;
    const isAtBottom =
      element.scrollHeight - element.clientHeight ===
      Math.round(element.scrollTop);
    if (isAtBottom) {
      console.log('User finished scrolling to the bottom');
      this.tabsService.setAllowedTop(false);
      this.tabsService.setAllowedBot(true);
    }

    if (!isScrollingDown && element.scrollTop === 0) {
      console.log('User finished scrolling to the top');
      this.tabsService.setAllowedTop(true);
      this.tabsService.setAllowedBot(false);
    }
  }

  onWheel(event: WheelEvent) {
    const element = this.scrollableElement;
    const isScrollingUp = event.deltaY < 0;

    if (isScrollingUp && element.scrollTop === 0) {
      // console.log('User is trying to scroll up from the top');
      this.tabsService.setAllowedTop(true);
      this.tabsService.setAllowedBot(false);
    }
  }
}
