import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatIconModule} from '@angular/material/icon';
import { HomeComponent } from './components/home.component';
import { DifficultyComponent} from './components/difficulty.component';
import { GameService } from './services/game.services';
import { WordService } from './services/word.service';
import {PopUp} from './components/game.component';

import { GameComponent } from './components/game.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule, MatLabel} from '@angular/material/form-field';
import {MatCard, MatCardModule} from '@angular/material/card';

import { NgParticlesModule } from "ng-particles";

@NgModule({
  declarations: [
    AppComponent,HomeComponent,DifficultyComponent, GameComponent, PopUp
  ],
  imports: [
    MatIconModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatFormFieldModule,
    MatCardModule,
    NgParticlesModule
  ],
  providers: [GameService, WordService],
  bootstrap: [AppComponent]
})
export class AppModule { }
