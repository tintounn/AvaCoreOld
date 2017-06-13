import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { AdminComponent } from './pages/admin/admin.component';
import { HomeComponent } from './pages/home/home.component';
import { HouseComponent } from './pages/house/house.component';
import { DevicesComponent } from './pages/device/devices.component';
import { SettingComponent } from './pages/setting/setting.component';
import { NasComponent } from './pages/nas/nas.component';
import { RoomComponent } from "./pages/room/room.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent, children: [
    { path: 'home', component: HomeComponent },
    { path: 'house', component: HouseComponent },
    { path: 'room/:id', component: RoomComponent },
    { path: 'setting', component: SettingComponent },
    { path: 'nas', component: NasComponent },
    { path: 'device', component: DevicesComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
