import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DifficultyComponent} from './components/difficulty.component';
import { HomeComponent } from './components/home.component';
import { GameComponent } from './components/game.component';

const routes: Routes = [
  {path: 'difficulty', component: DifficultyComponent},
  {path: 'home', component: HomeComponent},
  {path: 'play', component: GameComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
