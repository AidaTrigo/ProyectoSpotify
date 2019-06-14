import { Injectable } from '@angular/core';
import { Theme } from '../theme/theme';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  favourites: any[] = [];
  favsStrg: string;

  theme = new Theme();

  history: any[] = [];

  constructor() {
    this.readTheme();
    this.readHistory();
  }

  addFav(item: any) {
    this.readStorage();
    this.favourites.push(item);
    this.saveStorage();
  }

  removeFav(item: any) {
    this.readStorage();
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.favourites.length; i++) {
      if (this.favourites[i].id === item.id) {
        this.favourites.splice(i, 1);
      }
    }
    this.saveStorage();
  }

  isFavourite(id: any): boolean {
    this.readStorage();
    for (const item of this.favourites) {
      if (item.id === id) {
        return true;
      }
    }
    return false;
  }

  saveStorage() {
    localStorage.setItem('favourites', JSON.stringify(this.favourites));
  }

  readStorage() {
    this.favourites = JSON.parse(localStorage.getItem('favourites'));
    if (!this.favourites) {
      this.favourites = [];
    }
  }

  readTheme() {
    let theme = localStorage.getItem('theme');
    if (!theme) {
      theme = 'dark';
    }
    this.theme.setTheme(theme);
  }

  changeTheme() {
    if (!this.theme.themeLight) {
      localStorage.setItem('theme', 'light');
      this.theme.setTheme('light');
    } else {
      localStorage.setItem('theme', 'dark');
      this.theme.setTheme('dark');
    }
  }

  readHistory() {
    this.history = JSON.parse(localStorage.getItem('history'));
    if (!this.history) {
      this.history = [];
    }
  }

  addHistory(item: any) {
    this.readHistory();
    this.history.push(item);
    while (this.history.length > 40) {
      this.history.shift();
    }
    localStorage.setItem('history', JSON.stringify(this.history));
  }

  dropHistory() {
    localStorage.removeItem('history');
  }

  applyFilters(filters: any): any[] {
    this.readHistory();
    const hist = [];
    if (filters.all) {
      return this.history;
    }
    for (const item of this.history) {
      if (item.type === 'artist' && filters.artists) {
        hist.push(item);
      }
      if (item.type === 'playlist' && filters.playlists) {
        hist.push(item);
      }
      if (item.type === 'track' && filters.songs) {
        hist.push(item);
      }
      if (item.type === 'album') {
        if (item.album_type === 'album' && filters.albums) {
          hist.push(item);
        }
        if (item.album_type === 'single' && filters.songs) {
          hist.push(item);
        }
      }
    }
    return hist;
  }

  downloadFile(filename: string, text: string) {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }
}
