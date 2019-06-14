import { Component, Inject, HostListener } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { StorageService } from '../../services/storage.service';
import Swal from 'sweetalert2';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styles: []
})
export class PlaylistComponent {

  fav = false;
  public navIsFixed1 = false;
  public navIsFixed2 = false;
  playlist: any = {};
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
    this.getPlaylist(id);
  }

  favPressed() {
    this.fav = !this.fav;
    if (this.fav) {
      this.storage.addFav(this.playlist);
    } else {
      this.storage.removeFav(this.playlist);
    }
  }

  getPlaylist(id: string) {
    this.spotify.getInfoPlaylist(id).subscribe((data: any) => {
      this.playlist = data;
      this.titleService.setTitle(this.playlist.name + ' - Playlist - OpenSpotify');
      this.fav = this.storage.isFavourite(id);
      this.storage.addHistory(this.playlist);
      setTimeout(() => {
        this.loading = false;
      }, 100);
    }, (fallo) => {
      this.titleService.setTitle('Error - Playlist - OpenSpotify');
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

  redirect(cancion: any) {
    this.router.navigate(['/single', 'track' + cancion.id]);
  }

  redirectToArtist(artist: any) {
    this.router.navigate(['/artist', artist.id]);
  }
}
