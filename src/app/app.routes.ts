import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/search/search.component';
import { ArtistComponent } from './components/artist/artist.component';
import { AlbumComponent } from './components/album/album.component';
import { SingleComponent } from './components/single/single.component';
import { PlaylistComponent } from './components/playlist/playlist.component';

export const ROUTES: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'search/:type', component: SearchComponent},
    {path: 'artist/:id', component: ArtistComponent},
    {path: 'album/:id', component: AlbumComponent},
    {path: 'single/:id', component: SingleComponent},
    {path: 'track/:id', component: SingleComponent},
    {path: 'playlist/:id', component: PlaylistComponent},
    {path: '', pathMatch: 'full', redirectTo: 'home'},
    {path: '**', pathMatch: 'full', redirectTo: 'home'}
];
