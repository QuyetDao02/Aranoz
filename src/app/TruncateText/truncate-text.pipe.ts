import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateText'
})
export class TruncateTextPipe implements PipeTransform {

  transform(value: string, limit: number): string {
    if (value.length <= limit) {
      return value;
    } else {
      return value.substring(0, limit) + '...';
    }
  }
}
