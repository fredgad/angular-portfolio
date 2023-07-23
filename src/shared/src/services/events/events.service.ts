import { HostListener, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  public prefix = 'root';

  public word$: Observable<string> = of('word_1');

  public numbers$: BehaviorSubject<number[]> = new BehaviorSubject([1, 2, 3]);

  public log(message: string): void {
    console.log(`${this.prefix}: ${message}`);
  }

  // @HostListener('window:scroll', ['$event']) onShowDialog(): void {
  //   if (this.isEditable) {
  //     this.showDialog.emit();
  //     this.orderingFacade.openOrderEditDialog({ title: this.title });
  //   }
  // }
}
