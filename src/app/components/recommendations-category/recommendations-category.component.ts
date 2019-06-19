import { Component } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { StorageService } from '../../services/storage.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-recommendations-category',
  templateUrl: './recommendations-category.component.html',
  styles: []
})
export class RecommendationsCategoryComponent {

  recommendations: any[] = [];
  loading = false;
  error = {
    falloBool: false,
    falloCod: '',
    falloMens: ''
  };

  category = '';

  constructor(private spotify: SpotifyService, public storage: StorageService, private route: ActivatedRoute, private titleService: Title) {
    route.params.subscribe((data: any) => {
      if (data && data.category) {
        this.category = data.category;
        this.titleService.setTitle(this.category + ' Recommendations - OpenSpotify');
        this.buscar(this.category);
      } else {
        this.titleService.setTitle('Recommendations - OpenSpotify');
      }
    });
  }

  buscar(busqueda: string) {
    if (this.category !== '') {
      busqueda = this.category;
    }
    this.loading = true;
    this.error.falloBool = false;
    this.recommendations = [];
    if (busqueda !== '') {
        this.spotify.getRecomendationsByCategory(busqueda).subscribe((data: any) => {
          this.recommendations = data.tracks;
          this.titleService.setTitle(busqueda + ' recommendations - OpenSpotify');
        }, (fallo) => {
          this.titleService.setTitle('Error - Recommendations - OpenSpotify');
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
      this.recommendations = [];
    }
    setTimeout(() => {
      this.loading = false;
    }, 100);
  }

}
