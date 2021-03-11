import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { TableComponent, MapComponent } from './parts.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'table',
    pathMatch: 'full',
  },
  {
    path: 'table',
    component: TableComponent
  },
  {
    path: 'map',
    component: MapComponent
  }
]
@NgModule({
  imports:      [ BrowserModule, FormsModule, CommonModule, RouterModule.forRoot(routes) ],
  declarations: [ AppComponent, TableComponent, MapComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
