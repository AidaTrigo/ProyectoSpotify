import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  token: string;

  constructor(private http: HttpClient) {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
    } else {
      this.token = '';
    }
  }

  setToken(tok: string) {
    localStorage.setItem('token', tok);
    this.token = tok;
  }

  getQuery(query: string) {
    const url = `https://api.spotify.com/v1/${query}`;

    // tslint:disable-next-line:object-literal-key-quotes
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + this.token});

    return this.http.get(url, {headers});
  }

  getNewReleases() {
    // tslint:disable-next-line:no-string-literal
    return this.getQuery('browse/new-releases?limit=20').pipe(map((data: any) => data['albums'].items));
  }

  getFeaturedPlaylists() {
    // tslint:disable-next-line:no-string-literal
    return this.getQuery('browse/featured-playlists?limit=9').pipe(map((data: any) => data['playlists'].items));
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

  getInfoTrack(id: string) {
    return this.getQuery(`tracks/${id}`);
  }

  getPlaylistsByCategory(cat: string) {
    return this.getQuery(`browse/categories/${cat}/playlists`);
  }

  getInfoPlaylist(id: string) {
    return this.getQuery(`playlists/${id}`);
  }

  getRecomendationsByCategory(cat: string) {
    return this.getQuery(`recommendations?seed_genres=${cat}`);
  }
}
