import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from "@angular/http";
import { FormsModule }   from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClarityModule } from '@clr/angular';

import { RequestService } from './services/request.service';
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
    NasComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    ClarityModule.forRoot(),
    AppRoutingModule
  ],
  providers: [RequestService, RoomFactory],
  bootstrap: [AppComponent]
})
export class AppModule { }
