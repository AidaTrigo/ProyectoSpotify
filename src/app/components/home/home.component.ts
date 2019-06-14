import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';
import { StorageService } from '../../services/storage.service';
import Swal from 'sweetalert2';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent {

  nuevasCanciones: any[] = [];
  loading = true;
  error = {
    falloBool: false,
    falloCod: '',
    falloMens: ''
  };

  constructor(private spotify: SpotifyService, public storage: StorageService, private titleService: Title) {
    this.titleService.setTitle('Last Releases - OpenSpotify');
    this.spotify.getNewReleases().subscribe((data: any) => {
      this.nuevasCanciones = data;
      setTimeout(() => {
        this.loading = false;
      }, 100);
    }, (fallo) => {
      this.titleService.setTitle('Error - Last Releases - OpenSpotify');
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
