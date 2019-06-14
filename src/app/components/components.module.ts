import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumComponent } from './album/album.component';
import { ArtistComponent } from './artist/artist.component';
import { CardsComponent } from './cards/cards.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { FeaturedPlaylistsComponent } from './featured-playlists/featured-playlists.component';
import { HistoryComponent } from './history/history.component';
import { HomeComponent } from './home/home.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { RecommendationsCategoryComponent } from './recommendations-category/recommendations-category.component';
import { SearchComponent } from './search/search.component';
import { LoadingComponent } from './_shared/loading/loading.component';
import { NavbarComponent } from './_shared/navbar/navbar.component';
import { FooterComponent } from './_shared/footer/footer.component';
import { SingleComponent } from './single/single.component';
import { PipesModule } from '../pipes/pipes.module';
import { RouterModule } from '@angular/router';
import { ROUTES } from '../app.routes';
import { FormsModule } from '@angular/forms';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [
    AlbumComponent,
    ArtistComponent,
    CardsComponent,
    FavouritesComponent,
    FeaturedPlaylistsComponent,
    HistoryComponent,
    HomeComponent,
    PlaylistComponent,
    RecommendationsCategoryComponent,
    SearchComponent,
    LoadingComponent,
    NavbarComponent,
    FooterComponent,
    SingleComponent,
    AboutComponent
  ],
  imports: [
    CommonModule,
    PipesModule,
    RouterModule.forRoot(ROUTES, {useHash: true}),
    FormsModule
  ],
  exports: [
    AlbumComponent,
    ArtistComponent,
    CardsComponent,
    FavouritesComponent,
    FeaturedPlaylistsComponent,
    HistoryComponent,
    HomeComponent,
    PlaylistComponent,
    RecommendationsCategoryComponent,
    SearchComponent,
    LoadingComponent,
    NavbarComponent,
    FooterComponent,
    SingleComponent,
    AboutComponent
  ]
})
export class ComponentsModule { }
