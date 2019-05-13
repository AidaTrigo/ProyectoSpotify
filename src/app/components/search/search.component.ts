import { Component } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent {

  type: string;
  typeStrg: string;
  result: any[] = [];
  loading = false;
  error = {
    falloBool: false,
    falloCod: '',
    falloMens: ''
  };

  constructor(private spotify: SpotifyService, private route: ActivatedRoute) {
    route.params.subscribe((data: any) => {
      this.result = [];
      switch (data.type) {
        case 'artists':
          this.typeStrg = 'artist';
          this.type = data.type;
          break;
          case 'albums':
            this.typeStrg = 'album';
            this.type = data.type;
            break;
          case 'tracks':
            this.typeStrg = 'track';
            this.type = 'songs';
            break;
          case 'playlist-name':
            this.typeStrg = 'playlist';
            this.type = 'playlists by name';
            break;
          case 'playlist-category':
            this.typeStrg = 'playlist';
            this.type = 'playlists by category';
            break;
      }
    });
  }

  buscar(busqueda: string) {
    this.loading = true;
    this.error.falloBool = false;
    this.result = [];
    if (busqueda !== '') {
      if (this.type === 'playlists by category') {
        this.spotify.getPlaylistsByCategory(busqueda).subscribe((data: any) => {
          this.result = data.playlists.items;
        }, (fallo) => {
          this.error.falloBool = true;
          this.error.falloCod = fallo.error.error.status;
          this.error.falloMens = fallo.error.error.message;
          this.loading = false;
        });
      } else {
        this.spotify.getSearchData(busqueda, this.typeStrg).subscribe((data: any) => {
          console.log(data);
          if (data.artists) {
            this.result = data.artists.items;
          }
          if (data.albums) {
            this.result = data.albums.items;
          }
          if (data.tracks) {
            this.result = data.tracks.items;
          }
          if (data.playlists) {
            this.result = data.playlists.items;
          }
        }, (fallo) => {
          this.error.falloBool = true;
          this.error.falloCod = fallo.error.error.status;
          this.error.falloMens = fallo.error.error.message;
          this.loading = false;
        });
      }
    } else {
      this.result = [];
    }
    console.log(this.result);
    setTimeout(() => {
      this.loading = false;
    }, 100);
  }

}
