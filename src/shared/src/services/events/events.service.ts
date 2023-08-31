import { Injectable } from '@angular/core';
import { ViewportScroller, DOCUMENT } from '@angular/common';
import { OnDestroy, Inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { WINDOW } from '../../tokens/window';

@Injectable({
  providedIn: 'root',
})
export class EventsService implements OnDestroy {
  public get windowWidth(): number {
    return (
      this.window.innerWidth ||
      this.document.documentElement.clientWidth ||
      this.document.body.clientWidth
    );
  }

  public get windowHeight(): number {
    return (
      this.window.innerHeight ||
      this.document.documentElement.clientHeight ||
      this.document.body.clientHeight
    );
  }

  public get currentScreenWidth(): number {
    return this.window.innerWidth > 0 ? this.window.innerWidth : screen.width;
  }

  private subscriptions: Subscription[] = [];

  constructor(
    private viewPortScroller: ViewportScroller,
    @Inject(WINDOW) private window: Window,
    @Inject(DOCUMENT) private document: Document
  ) {}

  public setBodyClass(className: string, isSet: boolean): void {
    if (isSet) {
      this.document.body.classList.add(...className.split(' '));
    } else {
      this.document.body.classList.remove(...className.split(' '));
    }
  }

  public scrollToAnchorById(id: string, offsetHeight: number): void {
    this.viewPortScroller.setOffset([0, offsetHeight]);
    this.viewPortScroller.scrollToAnchor(id);
  }

  public scrollToTop(): void {
    this.window.scrollTo(0, 0);
  }

  public scrollBy(x: number, y: number): void {
    this.window.scrollBy(x, y);
  }

  public setWindowLocationHref(href: string): void {
    this.window.location.href = href;
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s && s.unsubscribe());
  }
}
