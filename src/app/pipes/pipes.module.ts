import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoimagePipe } from './noimage.pipe';
import { DomseguroPipe } from './domseguro.pipe';
import { CapsPluralPipe } from './caps-plural.pipe';
import { DomseguroWordsPipe } from './domseguro-words.pipe';
import { RouterModule } from '@angular/router';
import { ROUTES } from '../app.routes';

@NgModule({
  declarations: [
    NoimagePipe,
    DomseguroPipe,
    CapsPluralPipe,
    DomseguroWordsPipe
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(ROUTES, {useHash: true})
  ],
  exports: [
    NoimagePipe,
    DomseguroPipe,
    CapsPluralPipe,
    DomseguroWordsPipe
  ]
})
export class PipesModule { }
