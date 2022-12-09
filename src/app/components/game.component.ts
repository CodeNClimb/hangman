import {HostListener, Component,Inject} from '@angular/core';
import { DifficultyComponent } from './difficulty.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Router } from '@angular/router';


@Component({
    selector: 'app-root',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.css'],
    providers: []
})

export class GameComponent extends DifficultyComponent{

    loading:boolean = false;

    openDialog() {
      const dialogRef = this.dialog.open(PopUp, {
        data: {winner: this.game.isWinner, word : this.game.getWord},
      });
  
      dialogRef.afterClosed().subscribe(result => {
        this.game.setWinner = result;
      });
    }
    protected startGame() {
      this.loading = true;
      setTimeout(() => {
        this.removeStartButton();
        this.deleteHangman();
        this.loadGame();
        this.loading = false;
       
      }, 5000);

    }
    private loadGame() {
      var keyboard = document.getElementById('keyboard');
      if (keyboard) {
        keyboard.style.display = 'block';
      }
      var gameDescription = document.getElementById('game-description');
      if (gameDescription ) {
        gameDescription.style.display ='block';
      }
      if (sessionStorage.getItem('easyWord')) {
        this.game.Word = this.word.getEasyWord;
      }
      else if (sessionStorage.getItem('mediumWord')) {
        this.game.Word= this.word.getMediumWord;
      }
      else if (sessionStorage.getItem('hardWord')) {
        this.game.Word= this.word.getHardWord;
      }
      var squaresToAdd:number = this.game.getWord.length;
      var wordBox = document.getElementById('insert-word-box');
      if (wordBox) {
        var wordIndex: number = 0;
        while (squaresToAdd != 0) {
          var td = document.createElement('td');
          td.setAttribute('id', (wordIndex).toString());
          td.style.width = '30px';
          td.style.height = '30px';
          td.style.borderBottom = '3px double black';
          td.style.fontSize = '30px';
          td.style.textAlign = 'center';
          td.style.display='table-cell';
          td.style.verticalAlign='top';
          wordBox.appendChild(td);
          wordIndex ++;
          squaresToAdd --;
        }
      }
    }
    
    private removeStartButton() {
      var startGameButton = document.getElementById('start-game-button');
      if (startGameButton) {
        startGameButton.style.display = 'none';
      }
    }
    private deleteHangman() {
      for (let i = 1; i < 12; i ++) {
        document.getElementById('attempt-' + i.toString())?.setAttribute('display','none');
        }
    }
   
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
     const alphabets: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k' ,'l','m', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
     var guess:string = event.key.toLowerCase();
     if (alphabets.includes(guess)) {
      this.checkWord(guess);
     }
     
  }

   checkWord(alpha: string) {
      this.game.checkWord(alpha);
  
      if (this.game.getAttempts === 7) {
        this.openDialog();
        this.word.getNewWord();
        this.game.newGame();
        
      }
      else if (this.game.isWinner) {
        this.openDialog();
        this.word.getNewWord();
        this.game.newGame();
        

      }
   }

   
    public override playGame() {
      this.loading = true;
      setTimeout(() => {

      }, 5000);
      

    }
    public override goToHome($myParam: string = ''): void {
        const navigationDetails: string[] = ['/home'];
        if($myParam.length) {
          navigationDetails.push($myParam);
        }
        this.router.navigate(navigationDetails);
      }

    
    
    
    }

@Component({
  selector: 'app-root',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})

export class PopUp {
  message: string = '';
  word:string = "The word was '" + this.data.word + "'";

  constructor(
    public dialogRef: MatDialogRef<GameComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PopUpData,
    public router: Router,
  ) {
    if (this.data.winner) {
      this.message = "Congratulations, You Won!";
      this.word = "";

    }
    else {
      this.message = "You Lost!";
      

    }
  }

  PopUpClicked(answer:string): void {
    this.dialogRef.close();
    if (answer === 'restart') {
      
      this.goToDifficulty();

    }
    else {
      this.goToHome();
      


    }
  }
  public goToDifficulty($myParam: string = ''): void {
    const navigationDetails: string[] = ['/difficulty'];
    if($myParam.length) {
      navigationDetails.push($myParam);
    }
    this.router.navigate(navigationDetails);
  }

  public  goToHome($myParam: string = ''): void {
    const navigationDetails: string[] = ['/home'];
    if($myParam.length) {
      navigationDetails.push($myParam);
    }
    this.router.navigate(navigationDetails);
  }

}

export interface PopUpData {
  winner:boolean;
  word:string;
}