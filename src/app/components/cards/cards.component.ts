import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';
import { isString } from 'util';


@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styles: []
})
export class CardsComponent {

  @Input() items: any[] = [];

  constructor(private router: Router, public storage: StorageService) { }

  redirect(item: any) {
    if (item.album_type === 'album' || item.album_type === 'compilation') {
      this.router.navigate(['/album', item.id]);
    } else if (item.album_type === 'single') {
      this.router.navigate(['/single', item.id]);
    } else if (item.type === 'artist') {
      this.router.navigate(['/artist', item.id]);
    } else if (item.type === 'playlist') {
      this.router.navigate(['/playlist', item.id]);
    } else if (item.type === 'track') {
      this.router.navigate(['/single', 'track' + item.id]);
    } else if (isString(item)) {
      this.router.navigate(['/recommendations', item]);
    }
  }
}
