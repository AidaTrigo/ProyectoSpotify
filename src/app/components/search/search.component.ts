import { Component } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent {

  artistas: any[] = [];
  loading = false;
  error = {
    falloBool: false,
    falloCod: '',
    falloMens: ''
  };

  constructor(private spotify: SpotifyService) { }

  buscar(busqueda: string) {
    this.loading = true;
    if (busqueda !== '') {
      this.spotify.getArtistas(busqueda).subscribe((data: any) => {
        this.artistas = data;
      }, (fallo) => {
        this.error.falloBool = true;
        this.error.falloCod = fallo.error.error.status;
        this.error.falloMens = fallo.error.error.message;
        this.loading = false;
      });
    } else {
      this.artistas = [];
    }
    setTimeout(() => {
      this.loading = false;
    }, 100);
  }

}
