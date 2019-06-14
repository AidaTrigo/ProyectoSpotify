import { Component } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';
import Swal from 'sweetalert2';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent {

  infoShowing = false;
  type: string;
  typeStrg: string;
  result: any[] = [];
  loading = false;
  error = {
    falloBool: false,
    falloCod: '',
    falloMens: ''
  };

  constructor(private spotify: SpotifyService, private router: Router, private route: ActivatedRoute, public storage: StorageService, private titleService: Title) {
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
          default:
            this.router.navigate(['/home']);
      }
      this.titleService.setTitle('Search ' + this.type + ' - OpenSpotify');
    });
  }

  buscar(busqueda: string) {
    this.loading = true;
    this.error.falloBool = false;
    this.result = [];
    if (busqueda !== '') {
      if (this.type === 'playlists by category') {
        this.spotify.getPlaylistsByCategory(busqueda.toLowerCase()).subscribe((data: any) => {
          this.result = data.playlists.items;
        }, (fallo) => {
          this.loading = false;
          // tslint:disable-next-line:triple-equals
          if (fallo.error.error.status == 401) {
            this.error.falloBool = true;
            this.error.falloCod = fallo.error.error.status;
            this.error.falloMens = fallo.error.error.message;
            Swal.fire({
              type: 'error',
              title: 'The token is not valid anymore.',
              text: 'Insert a new token to continue.',
              input: 'text',
              inputAttributes: {
                autocapitalize: 'off'
              },
              showCancelButton: false,
              allowEscapeKey: false,
              allowOutsideClick: false,
              confirmButtonText: 'Ready'
            }).then((result) => {
              this.spotify.setToken(result.value);
              location.reload();
            });
          }
        });
      } else {
        this.spotify.getSearchData(busqueda, this.typeStrg).subscribe((data: any) => {
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
          Swal.fire({
            type: 'error',
            title: 'The token is not valid anymore.',
            text: 'Insert a new token to continue.',
            input: 'text',
            inputAttributes: {
              autocapitalize: 'off'
            },
            showCancelButton: false,
            allowEscapeKey: false,
            allowOutsideClick: false,
            confirmButtonText: 'Ready'
          }).then((result) => {
            this.spotify.setToken(result.value);
            location.reload();
          });
        });
      }
    } else {
      this.result = [];
    }
    setTimeout(() => {
      this.loading = false;
    }, 100);
  }

}
