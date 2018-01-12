import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from "@angular/http";
import { FormsModule }   from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClarityModule } from '@clr/angular';

import { RequestService } from './services/request.service';
import { SocketService } from './services/socket.service';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './layouts/dashboard/dashboard.component';
import { AbstractComponent } from './layouts/abstract/abstract.component';
import { HouseComponent } from './pages/house/house.component';
import { NotificationsIconComponent } from './components/notifications-icon/notifications-icon.component';
import { NotificationsListComponent } from './components/notifications-list/notifications-list.component';
import { RoomEditorComponent } from './components/room-editor/room-editor.component';
import { RoomComponent } from './pages/room/room.component';
import { RoomCardComponent } from './components/room-card/room-card.component';

import {RoomFactory} from './models/room.model';
import { DownloadComponent } from './pages/download/download.component';
import { NasComponent } from './pages/nas/nas.component';
import { CpuInfoComponent } from './components/cpu-info/cpu-info.component';
import { NetworkInfoComponent } from './components/network-info/network-info.component';
import { HardDriveInfoComponent } from './components/hard-drive-info/hard-drive-info.component';
import { MoviesListComponent } from './components/movies-list/movies-list.component';
import { MovieEditorComponent } from './components/movie-editor/movie-editor.component';
import { MovieFactory } from './models/movie.model';
import { FileFactory } from './models/file.model';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    AbstractComponent,
    HouseComponent,
    NotificationsIconComponent,
    NotificationsListComponent,
    RoomEditorComponent,
    RoomComponent,
    RoomCardComponent,
    DownloadComponent,
    NasComponent,
    CpuInfoComponent,
    NetworkInfoComponent,
    HardDriveInfoComponent,
    MoviesListComponent,
    MovieEditorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    ClarityModule.forRoot(),
    AppRoutingModule
  ],
  providers: [RequestService, RoomFactory, MovieFactory, FileFactory, SocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
