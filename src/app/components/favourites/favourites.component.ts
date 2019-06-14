import { Component } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styles: []
})
export class FavouritesComponent {

  loading = false;

  constructor(public storage: StorageService, private titleService: Title) {
    this.titleService.setTitle('Favourites - OpenSpotify');
    storage.readStorage();
  }

  downloadFavourites() {
    this.loading = true;
    this.storage.downloadFile('my-favourites.json', JSON.stringify(this.storage.favourites, null, '\t'));
    setTimeout(() => {
      this.loading = false;
    }, 500);
  }

}
