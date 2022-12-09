import { Component,OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { GameService } from '../services/game.services';
import { WordService } from '../services/word.service';
import {MatDialog} from '@angular/material/dialog';


@Component({
  selector: 'app-root',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  
  constructor(protected router: Router, protected word: WordService, protected game: GameService, protected dialog: MatDialog) { }

  normalPlay($myParam: string = ''): void {
    const navigationDetails: string[] = ['/difficulty'];
    if($myParam.length) {
      navigationDetails.push($myParam);
    }
    this.router.navigate(navigationDetails);
    this.game.setTimed = false;
    
    
  }

  timedPlay($myParam: string = ''): void {
    const navigationDetails: string[] = ['/difficulty'];
    if($myParam.length) {
      navigationDetails.push($myParam);
    }
    this.router.navigate(navigationDetails);
    this.game.setTimed = true;
    
    
  }


}
