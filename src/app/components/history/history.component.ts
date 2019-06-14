import { Component } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import Swal from 'sweetalert2';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styles: []
})
export class HistoryComponent {

  historyFiltered: any[] = [];
  filters = {
    all: true,
    artists: false,
    albums: false,
    songs: false,
    playlists: false
  };

  help = false;

  constructor(public storage: StorageService, private titleService: Title) {
    this.titleService.setTitle('History - OpenSpotify');
    this.historyFiltered = this.storage.applyFilters(this.filters).reverse();
  }

  dropHistory() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      reverseButtons: true
    }).then((result: any) => {
      if (result.value) {
        swalWithBootstrapButtons.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        );
        this.storage.dropHistory();
        this.historyFiltered = [];
      }
    });
  }

  getCheckeds(checkbox: string) {
    switch (checkbox) {
      case 'all':
        this.filters.all = !this.filters.all;
        this.filters.artists = false;
        this.filters.albums = false;
        this.filters.songs = false;
        this.filters.playlists = false;
        break;
      case 'artistsOnly':
        this.filters.artists = !this.filters.artists;
        if (this.filters.artists || this.filters.albums || this.filters.songs || this.filters.playlists) {
          this.filters.all = false;
        } else {
          this.filters.all = true;
        }
        break;
      case 'albumsOnly':
        this.filters.albums = !this.filters.albums;
        if (this.filters.artists || this.filters.albums || this.filters.songs || this.filters.playlists) {
          this.filters.all = false;
        } else {
          this.filters.all = true;
        }
        break;
      case 'songsOnly':
        this.filters.songs = !this.filters.songs;
        if (this.filters.artists || this.filters.albums || this.filters.songs || this.filters.playlists) {
          this.filters.all = false;
        } else {
          this.filters.all = true;
        }
        break;
      case 'playlistsOnly':
        this.filters.playlists = !this.filters.playlists;
        if (this.filters.artists || this.filters.albums || this.filters.songs || this.filters.playlists) {
          this.filters.all = false;
        } else {
          this.filters.all = true;
        }
        break;
    }
    this.historyFiltered = this.storage.applyFilters(this.filters).reverse();
  }

}
