import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsComponent } from './components/tabs/tabs.component';
import { GearService, LangService, TabsService } from '@services';

@Component({
  selector: 'app-second-screen',
  standalone: true,
  imports: [CommonModule, TabsComponent],
  templateUrl: './second-screen.component.html',
  styleUrls: ['./second-screen.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SecondScreenComponent implements AfterViewInit {
  @ViewChild('aboutMeRef', { static: true }) aboutMeRef!: ElementRef;

  public isEngLang$i = this.langService.isEngLang$i;

  constructor(
    private gearService: GearService,
    private tabsService: TabsService,
    private langService: LangService
  ) {}

  public ngAfterViewInit(): void {
    const element = this.aboutMeRef.nativeElement as HTMLDivElement;
    const position = this.getPosition(element);

    this.gearService.rewriteSecondGearPositions(
      `${position.top + position.height / 2}px`,
      `${position.left - 50 - window.innerWidth}px`
    );
  }

  public onMouseOver(event: MouseEvent, tabNumber: number): void {
    if (this.gearService.isScreenDelay$i()) return;

    this.tabsService.setTab(tabNumber);

    const element = event.target as HTMLElement;
    const position = this.getPosition(element);

    this.gearService.gearPosition$i.set({
      top: `${position.top + position.height / 2}px`,
      left: `${position.left - 40}px`,
    });
    this.gearService.rewriteSecondGearPositions(
      `${position.top + position.height / 2}px`,
      `${position.left - 40}px`
    );
  }

  getPosition(element: HTMLElement): {
    top: number;
    left: number;
    height: number;
    width: number;
  } {
    const rect = element.getBoundingClientRect();
    const scrollLeft = document.documentElement.scrollLeft;
    const scrollTop = document.documentElement.scrollTop;
    const { top, left, height, width } = rect;

    return { top: top + scrollTop, left: left + scrollLeft, height, width };
  }
}
