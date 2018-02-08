import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { TodoModule } from './todo/todo.module';
import {MatToolbarModule, MatIconModule, MatMenuModule, MatSidenavModule} from '@angular/material';
import { MenuComponent } from './menu/menu.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule, TodoModule, MatToolbarModule, MatIconModule, MatMenuModule, MatSidenavModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
