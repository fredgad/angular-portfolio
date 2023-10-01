import { Pipe, PipeTransform } from '@angular/core';

interface TrackByFunctionCache {
  [propertyName: string]: <T>(index: number, item: T) => any;
}

const cache: TrackByFunctionCache = Object.create(null);

@Pipe({
  name: 'trackByProperty',
  standalone: true,
})
export class TrackByPropertyPipe implements PipeTransform {
  public transform(propertyName: string) {
    if (!cache[propertyName]) {
      cache[propertyName] = function trackByProperty(
        _index: number,
        item: any
      ): any {
        return item[propertyName];
      };
    }
    return cache[propertyName];
  }
}
