import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) {}

  getQuery(query: string) {
    const url = `https://api.spotify.com/v1/${query}`;
    const token = 'BQDJyzb2sFFF1eOvnv8LW9gu28oYDEa6IjZVWnsmzdW6goIm0RMHIs5ImEeRZKsjPTNpPWsj4T0k3eY3bHM';

    // tslint:disable-next-line:object-literal-key-quotes
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});

    return this.http.get(url, {headers});
  }

  getNewReleases() {
    // tslint:disable-next-line:no-string-literal
    return this.getQuery('browse/new-releases?limit=20').pipe(map((data: any) => data['albums'].items));
  }

  getSearchData(busqueda: string, type: string) {
    // tslint:disable-next-line:no-string-literal
    return this.getQuery(`search?q=${busqueda}&type=${type}&limit=20`);
  }

  getInfoArtista(id: string) {
    return this.getQuery(`artists/${id}`);
  }

  getInfoAlbum(id: string) {
    return this.getQuery(`albums/${id}`);
  }

  getArtistsTopTracks(id: string) {
    const country = 'US';
    // tslint:disable-next-line:no-string-literal
    return this.getQuery(`artists/${id}/top-tracks?country=${country}`).pipe(map((data: any) => data['tracks']));
  }

  getAlbumTracks(id: string) {
    // tslint:disable-next-line:no-string-literal
    return this.getQuery(`albums/${id}/tracks`).pipe(map((data: any) => data['items']));
  }

  getInfoTrack(id: string) {
    return this.getQuery(`tracks/${id}`);
  }

  getPlaylistsByCategory(cat: string) {
    return this.getQuery(`browse/categories/${cat}/playlists`);
  }

  getInfoPlaylist(id: string) {
    return this.getQuery(`playlists/${id}`);
  }
}
