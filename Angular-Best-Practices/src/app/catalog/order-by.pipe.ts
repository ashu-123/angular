import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy',
})
export class OrderByPipePipe implements PipeTransform {

  transform(array: any[], field: string): any[] {
    if(!Array.isArray(array)) return array;

    return array.sort((x, y) => x[field] > y[field] ? 1 : x[field] < y[field] ? -1 : 0);
  }

}
