import { Component} from '@angular/core'; 
import {WordService} from '../services/word.service';
import { HomeComponent } from './home.component';



@Component({
  selector: 'app-root',
  templateUrl: './difficulty.component.html',
  styleUrls: ['./difficulty.component.css'],
  providers: [WordService]
})

export class DifficultyComponent extends HomeComponent {
  easyLoading:boolean = false;
  mediumLoading:boolean = false;
  hardLoading:boolean = false;
  easy: string|boolean = this.game.isTimed ? '5 Minutes'  :'Easy';
  medium: string|boolean = this.game.isTimed? '3 Minutes': 'Medium';
  hard: string|boolean = this.game.isTimed ? '1 Minute' : 'Hard';
  

  
  goToHome($myParam: string = ''): void {
    const navigationDetails: string[] = ['/home'];
    if($myParam.length) {
      navigationDetails.push($myParam);
    }
    this.router.navigate(navigationDetails);
  }

  playGame($myParam: string = ''): void {
    const navigationDetails: string[] = ['/play'];
    if($myParam.length) {
      navigationDetails.push($myParam);
    }
    this.router.navigate(navigationDetails);
  }

  DifficultySelector(mode:string) {
    if (mode === 'easy') {
      //start loading page
      this.easyLoading = true;
      //disable other buttons
      document.getElementById('medium-difficulty-button')?.setAttribute('disabled', '');
      document.getElementById('hard-difficulty-button')?.setAttribute('disabled', '');
      setTimeout(() => {

        this.easyLoading = false;
        sessionStorage.setItem('easyWord', 'true');
        sessionStorage.removeItem('mediumWord');
        sessionStorage.removeItem('hardWord');
        this.playGame();
        
      }, 0);
    }
    else if (mode === 'medium') {
      this.mediumLoading = true;
      document.getElementById('easy-difficulty-button')?.setAttribute('disabled', '');
      document.getElementById('hard-difficulty-button')?.setAttribute('disabled', '');
      setTimeout(() => {
        this.mediumLoading = false;
        sessionStorage.setItem('mediumWord', 'true');
        sessionStorage.removeItem('easyWord');
        sessionStorage.removeItem('hardWord');
        this.playGame();
      }, 0);  
    }

    else if (mode === 'hard') {
      document.getElementById('easy-difficulty-button')?.setAttribute('disabled', '');
      document.getElementById('medium-difficulty-button')?.setAttribute('disabled', '');
      this.hardLoading = true;
      setTimeout(() => {
        this.hardLoading = false;
        sessionStorage.setItem('hardWord', 'true');
        sessionStorage.removeItem('easyWord');
        sessionStorage.removeItem('mediumWord');
        this.playGame();
      }, 0);
    }
    }
  }


  

