import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateAgo',
  pure: true,
})
export class DateAgoPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (value) {
      const seconds = Math.floor((+new Date() - +new Date(value)) / 1000);
      if (seconds < 29)
        // less than 30 seconds ago will show as 'Just now'
        return 'Just now';
      const intervals = [31536000, 2592000, 604800, 86400, 3600, 60, 1];
      const intervalsText = [
        'year',
        'month',
        'week',
        'day',
        'hour',
        'minute',
        'second',
      ];
      let counter;
      for (let i in intervals) {
        counter = Math.floor(seconds / intervals[i]);
        if (counter > 0)
          if (counter === 1) {
            return counter + ' ' + intervalsText[i] + ' ago'; // singular (1 day ago)
          } else {
            return counter + ' ' + intervalsText[i] + 's ago'; // plural (2 days ago)
          }
      }
    }
    return value;
  }
}
