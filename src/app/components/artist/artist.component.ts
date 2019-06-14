import { Component } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';
import Swal from 'sweetalert2';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html'
})
export class ArtistComponent {

  fav = false;
  artista: any = {};
  topTracks: any[] = [];
  loading = true;
  error = {
    falloBool: false,
    falloCod: '',
    falloMens: ''
  };

  constructor(private spotify: SpotifyService, public storage: StorageService, private route: ActivatedRoute, private router: Router, private titleService: Title) {
    let id: string;
    this.route.params.subscribe(params => {
      id = params.id;
    });
    this.getArtista(id);
  }

  favPressed() {
    this.fav = !this.fav;
    if (this.fav) {
      this.storage.addFav(this.artista);
    } else {
      this.storage.removeFav(this.artista);
    }
  }

  getArtista(id: string) {
    this.spotify.getInfoArtista(id).subscribe((data: any) => {
      this.artista = data;
      this.titleService.setTitle(this.artista.name + ' - Artist - OpenSpotify');
      this.fav = this.storage.isFavourite(id);
      this.storage.addHistory(this.artista);
    });
    this.spotify.getArtistsTopTracks(id).subscribe((data: any) => {
      this.topTracks = data;
      console.log(data);
      setTimeout(() => {
        this.loading = false;
      }, 100);
    }, (fallo) => {
      this.titleService.setTitle('Error - Artist - OpenSpotify');
      this.error.falloBool = true;
      this.error.falloCod = fallo.error.error.status;
      this.error.falloMens = fallo.error.error.message;
      this.loading = false;
      // tslint:disable-next-line:triple-equals
      if (this.error.falloCod == '401') {
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
  }

  redirectTrack(track: any) {
    this.router.navigate(['/track', 'track' + track.id]);
  }

  redirectAlbum(track: any) {
    this.router.navigate(['/album', track.album.id]);
  }
}
