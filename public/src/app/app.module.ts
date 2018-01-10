import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ClarityModule } from '@clr/angular';

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
    RoomCardComponent
  ],
  imports: [
    BrowserModule,
    ClarityModule.forRoot(),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
