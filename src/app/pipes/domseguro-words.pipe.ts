import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'domseguroWords'
})
export class DomseguroWordsPipe implements PipeTransform {

  constructor( private domSanitizer: DomSanitizer ) { }

  transform( value: string, url: string): any {
    value = value.replace(' ', '+');
    return this.domSanitizer.bypassSecurityTrustResourceUrl( url + value );
  }

}
