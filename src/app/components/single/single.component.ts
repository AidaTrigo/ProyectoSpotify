import { Component } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html'
})
export class SingleComponent {

  single: any = {};
  loading = true;
  track = false;
  error = {
    falloBool: false,
    falloCod: '',
    falloMens: ''
  };

    constructor(private spotify: SpotifyService, private route: ActivatedRoute, private router: Router) {
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

    getSingle(id: string) {
      if (this.track) {
        this.spotify.getInfoTrack(id).subscribe((data: any) => {
          this.single = data;
          console.log(this.single);
          setTimeout(() => {
            this.loading = false;
          }, 100);
        }, (fallo) => {
          this.error.falloBool = true;
          this.error.falloCod = fallo.error.error.status;
          this.error.falloMens = fallo.error.error.message;
          this.loading = false;
        });
      } else {
        this.spotify.getInfoAlbum(id).subscribe((data: any) => {
          this.single = data;
          console.log(data);
          setTimeout(() => {
            this.loading = false;
          }, 100);
        }, (fallo) => {
          this.error.falloBool = true;
          this.error.falloCod = fallo.error.error.status;
          this.error.falloMens = fallo.error.error.message;
          this.loading = false;
        });
      }
    }

    redirect(artista: any) {
      this.router.navigate(['/artist', artista.id]);
    }
}
