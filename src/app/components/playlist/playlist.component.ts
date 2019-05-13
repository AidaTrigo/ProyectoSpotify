import { Component } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styles: []
})
export class PlaylistComponent {

  playlist: any = {};
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
    this.getPlaylist(id);
  }

  getPlaylist(id: string) {
    this.spotify.getInfoPlaylist(id).subscribe((data: any) => {
      this.playlist = data;
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

  redirect(cancion: any) {
    this.router.navigate(['/single', 'track' + cancion.id]);
  }

  redirectToArtist(artist: any) {
    this.router.navigate(['/artist', artist.id]);
  }

}
