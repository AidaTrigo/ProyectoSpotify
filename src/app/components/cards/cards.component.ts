import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styles: []
})
export class CardsComponent {

  @Input() items: any[] = [];

  constructor(private router: Router) { }

  redirect(item: any) {
    if (item.album_type === 'album') {
      this.router.navigate(['/album', item.id]);
    }
    if (item.album_type === 'single') {
      this.router.navigate(['/single', item.id]);
    }
    if (item.type === 'artist') {
      this.router.navigate(['/artist', item.id]);
    }
  }
}
