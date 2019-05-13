import { Component } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html'
})
export class ArtistComponent {

  artista: any = {};
  topTracks: any[] = [];
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
    this.getArtista(id);
  }

  getArtista(id: string) {
    this.spotify.getInfoArtista(id).subscribe((data: any) => {
      this.artista = data;
      console.log(data);
    });
    this.spotify.getArtistsTopTracks(id).subscribe((data: any) => {
      this.topTracks = data;
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

  redirectTrack(track: any) {
    this.router.navigate(['/track', 't' + track.id]);
  }

  redirectAlbum(track: any) {
    this.router.navigate(['/album', track.album.id]);
  }
}
