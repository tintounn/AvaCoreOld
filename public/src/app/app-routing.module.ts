import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {DashboardComponent} from './layouts/dashboard/dashboard.component';

import {HomeComponent} from './pages/home/home.component';
import {HouseComponent} from './pages/house/house.component';
import { RoomComponent } from './pages/room/room.component';
import { NasComponent } from './pages/nas/nas.component';
import { DownloadComponent } from './pages/download/download.component';
import { MovieComponent } from './pages/movie/movie.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, children: [
    { path: '', component: HomeComponent },
    { path: 'house', component: HouseComponent},
    { path: 'rooms/:id', component: RoomComponent},
    { path: 'nas', component: NasComponent},
    { path: 'downloads', component: DownloadComponent},
    { path: 'movie/:id', component: MovieComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }