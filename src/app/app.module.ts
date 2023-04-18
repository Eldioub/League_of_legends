import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChampionService } from './services/champion.service';
import { ChampionComponent } from './components/champion/champion.component';
import { AgGridModule } from 'ag-grid-angular';
import { ChampionData } from './api/champion.data';
import { LoginComponent } from './components/login/login.component';
import { UserData } from './api/user.data';
import { ReactiveFormsModule } from '@angular/forms';
import { RoutingModule } from './routing/routing.module';

@NgModule({
  declarations: [
    AppComponent,
    ChampionComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AgGridModule,
    HttpClientModule,
    ReactiveFormsModule,
    HttpClientInMemoryWebApiModule.forRoot(ChampionData, {delay:500}),
    // HttpClientInMemoryWebApiModule.forRoot(UserData, {delay:500}),
    RoutingModule,
  ],
  providers: [ChampionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
