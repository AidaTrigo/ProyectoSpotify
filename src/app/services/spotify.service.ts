import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) { }

  getQuery(query: string) {
    const url = `https://api.spotify.com/v1/${query}`;
    const token = 'BQAQcexInEyTMCDG57baCUeMIKg0918KOczOJ6_2gLekiQCnXdDa7cuvpHihcq0Uc4RWP8WGIs0nJDfTBdE';

    // tslint:disable-next-line:object-literal-key-quotes
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});

    return this.http.get(url, {headers});
  }

  getNewReleases() {
    // tslint:disable-next-line:no-string-literal
    return this.getQuery('browse/new-releases?limit=20').pipe(map((data: any) => data['albums'].items));
  }

  getArtistas(busqueda: string) {
    // tslint:disable-next-line:no-string-literal
    return this.getQuery(`search?q=${busqueda}&type=artist&limit=20`).pipe(map((data: any) => data['artists'].items));
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
}
