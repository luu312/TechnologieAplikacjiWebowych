
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  standalone: true,
})
export class FilterTextPipe implements PipeTransform {
  transform(value: any[], filterText: string): any {
    console.log(value, filterText);

    if (!value) {
      return [];
    }
    if (!filterText) {
      return value;
    }

    filterText = filterText.toLowerCase();

    return value.filter((val) => {
      if (!val.title) {
        return false;
      }
      return val.title.toLowerCase().includes(filterText);
    });
  }
}
