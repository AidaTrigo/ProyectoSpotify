import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capsPlural'
})
export class CapsPluralPipe implements PipeTransform {

  transform(cad: string): string {
    if (cad === 'album') {
      return 'Albums & Singles';
    } else {
      return cad.substr(0, 1).toUpperCase() + cad.substr(1).toLowerCase() + 's';
    }
  }

}
