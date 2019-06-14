import { Component } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { StorageService } from '../../services/storage.service';
import Swal from 'sweetalert2';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-featured-playlists',
  templateUrl: './featured-playlists.component.html'
})
export class FeaturedPlaylistsComponent {

  playlistsDestacadas: any[] = [];
  loading = true;
  error = {
    falloBool: false,
    falloCod: '',
    falloMens: ''
  };

  constructor(private spotify: SpotifyService, public storage: StorageService, private titleService: Title) {
    this.spotify.getFeaturedPlaylists().subscribe((data: any) => {
      this.playlistsDestacadas = data;
      this.titleService.setTitle('Featured Playlists - OpenSpotify');
      setTimeout(() => {
        this.loading = false;
      }, 100);
    }, (fallo) => {
      this.titleService.setTitle('Error - Featured Playlists - OpenSpotify');
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
}
