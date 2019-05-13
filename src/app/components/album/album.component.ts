import { Component } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
})
export class AlbumComponent {

  album: any = {};
  tracks: any[] = [];
  loading = true;
  error = {
    falloBool: false,
    falloCod: '',
    falloMens: ''
  };

    constructor(private spotify: SpotifyService, private route: ActivatedRoute, private router: Router) {
      let id: string;
      this.route.params.subscribe(params => {
        id = params.id;
      });
      this.getAlbum(id);
    }

    getAlbum(id: string) {
      this.spotify.getInfoAlbum(id).subscribe((data: any) => {
        this.album = data;
        setTimeout(() => {
          this.loading = false;
        }, 100);
      }, (fallo) => {
        this.error.falloBool = true;
        this.error.falloCod = fallo.error.error.status;
        this.error.falloMens = fallo.error.error.message;
        this.loading = false;
      });
      this.spotify.getAlbumTracks(id).subscribe((data: any) => {
        this.tracks = data;
      }, (fallo) => {
        this.error.falloBool = true;
        this.error.falloCod = fallo.error.error.status;
        this.error.falloMens = fallo.error.error.message;
        this.loading = false;
      });
    }

    redirect(cancion: any) {
      this.router.navigate(['/single', 'track' + cancion.id]);
    }

    redirectToArtist(artist: any) {
      this.router.navigate(['/artist', artist.id]);
    }
}
