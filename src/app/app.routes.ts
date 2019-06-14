import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/search/search.component';
import { ArtistComponent } from './components/artist/artist.component';
import { AlbumComponent } from './components/album/album.component';
import { SingleComponent } from './components/single/single.component';
import { PlaylistComponent } from './components/playlist/playlist.component';
import { FeaturedPlaylistsComponent } from './components/featured-playlists/featured-playlists.component';
import { RecommendationsCategoryComponent } from './components/recommendations-category/recommendations-category.component';
import { FavouritesComponent } from './components/favourites/favourites.component';
import { HistoryComponent } from './components/history/history.component';
import { AboutComponent } from './components/about/about.component';

export const ROUTES: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'search/:type', component: SearchComponent},
    {path: 'artist/:id', component: ArtistComponent},
    {path: 'album/:id', component: AlbumComponent},
    {path: 'single/:id', component: SingleComponent},
    {path: 'track/:id', component: SingleComponent},
    {path: 'playlist/:id', component: PlaylistComponent},
    {path: 'featured-playlists', component: FeaturedPlaylistsComponent},
    {path: 'recommendations', component: RecommendationsCategoryComponent},
    {path: 'recommendations/:category', component: RecommendationsCategoryComponent},
    {path: 'favourites', component: FavouritesComponent},
    {path: 'history', component: HistoryComponent},
    {path: 'about', component: AboutComponent},
    {path: '', pathMatch: 'full', redirectTo: 'home'},
    {path: '**', pathMatch: 'full', redirectTo: 'home'}
];
