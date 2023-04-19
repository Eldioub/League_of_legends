import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChampionService } from './services/champion.service';
import { ChampionComponent, DialogModifyChampion, DialogRemoveChampion } from './components/champion/champion.component';
import { AgGridModule } from 'ag-grid-angular';
import { Data } from './api/data';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { RoutingModule } from './routing/routing.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { ButtonRendererComponent } from './components/champion/button-renderer/button-renderer.component';
import { MatFormFieldModule } from '@angular/material/form-field' 
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LoginComponent } from './components/login/login.component';
import { NotfoundComponent } from './components/notfound/notfound.component';

@NgModule({
  declarations: [
    AppComponent,
    ChampionComponent,
    LoginComponent,
    NotfoundComponent,
    ButtonRendererComponent,
    DialogRemoveChampion,
    DialogModifyChampion,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AgGridModule,
    HttpClientModule,
    ReactiveFormsModule,
    HttpClientInMemoryWebApiModule.forRoot(Data, {delay:500}),
    RoutingModule,
    FormsModule,
    MatDialogModule,
    MatNativeDateModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatIconModule
  ],
  providers: [
    ChampionService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
