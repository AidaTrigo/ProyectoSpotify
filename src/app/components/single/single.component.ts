import { Component } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';
import Swal from 'sweetalert2';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html'
})
export class SingleComponent {

  fav = false;
  single: any = {};
  loading = true;
  track = false;
  error = {
    falloBool: false,
    falloCod: '',
    falloMens: ''
  };

    constructor(private spotify: SpotifyService, public storage: StorageService, private route: ActivatedRoute, private router: Router, private titleService: Title) {
      let id: string;
      this.route.params.subscribe(params => {
        id = params.id;
        if (id.substr(0, 5) === 'track') {
          id = id.substr(5);
          this.track = true;
        }
      });
      this.getSingle(id);
    }

    favPressed() {
      this.fav = !this.fav;
      if (this.fav) {
        this.storage.addFav(this.single);
      } else {
        this.storage.removeFav(this.single);
      }
    }

    getSingle(id: string) {
      if (this.track) {
        this.spotify.getInfoTrack(id).subscribe((data: any) => {
          this.single = data;
          this.titleService.setTitle(this.single.name + ' - Song - OpenSpotify');
          this.fav = this.storage.isFavourite(id);
          this.storage.addHistory(this.single);
          setTimeout(() => {
            this.loading = false;
          }, 100);
        }, (fallo) => {
          this.titleService.setTitle('Error - Song - OpenSpotify');
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
      } else {
        this.spotify.getInfoAlbum(id).subscribe((data: any) => {
          this.single = data;
          this.storage.addHistory(this.single);
          setTimeout(() => {
            this.loading = false;
          }, 100);
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
    }

    redirect(artista: any) {
      this.router.navigate(['/artist', artista.id]);
    }
}
