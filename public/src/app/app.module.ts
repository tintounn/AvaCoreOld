import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';

import { RequestService } from './services/request.service';
import { SessionService } from './services/session.service';
import { SocketService } from './services/socket.service';
import { GoogleMapService } from './services/google-map.service';

import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { AdminComponent } from './pages/admin/admin.component';
import { HomeComponent } from './pages/home/home.component';
import { HouseComponent } from './pages/house/house.component';
import { AlarmManagerComponent } from './components/alarm-manager/alarm-manager.component';
import { FileManagerComponent } from './pages/nas/components/file-manager/file-manager.component';
import { SettingComponent } from './pages/setting/setting.component';
import { NasComponent } from './pages/nas/nas.component';
import { DroneComponent } from './pages/drone/drone.component';
import { RoomComponent } from './pages/room/room.component';

import { Room, RoomFactory } from './models/room';
import { Alarm, AlarmFactory } from './models/alarm';
import { Files, Download, FilesFactory } from './models/files';
import { Device, DeviceFactory } from './models/device';
import { RoomEditorComponent } from './components/room-editor/room-editor.component';
import { AlarmEditorComponent } from './components/alarm-editor/alarm-editor.component';
import { AlarmCardComponent } from './components/alarm-card/alarm-card.component';
import { RoomCardComponent } from './components/room-card/room-card.component';
import { DevicesComponent } from './pages/device/devices.component';
import { DeviceCardComponent } from './components/device-card/device-card.component';
import { ColorPickerComponent } from './components/color-picker/color-picker.component';
import { ColorPickerModalComponent } from './components/color-picker-modal/color-picker-modal.component';
import { MapComponent } from './components/map/map.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    HomeComponent,
    HouseComponent,
    SettingComponent,
    AlarmManagerComponent,
    NasComponent,
    FileManagerComponent,
    DroneComponent,
    RoomEditorComponent,
    AlarmEditorComponent,
    AlarmCardComponent,
    RoomCardComponent,
    DevicesComponent,
    DeviceCardComponent,
    ColorPickerComponent,
    ColorPickerModalComponent,
    MapComponent,
    RoomComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    SimpleNotificationsModule.forRoot(),
    AppRoutingModule
  ],
  providers: [RequestService, SessionService, SocketService, GoogleMapService, RoomFactory, AlarmFactory, FilesFactory, DeviceFactory],
  bootstrap: [AppComponent]
})
export class AppModule { }
