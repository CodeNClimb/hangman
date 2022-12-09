import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable()

export class GameService {
    private word:string = '';
    private attempts: number = 0;
    private isGameOver: boolean = false;
    private winner: boolean = false; 
    private guessedCorrectly: boolean = false;
    private guessingLog:string[] = [];
    private alreadyGuessed: string[] = [];
    private timed:boolean = false;

    constructor() {
        this.newGame();

    }

    newGame() {
        this.word = '';
        this.attempts = 0;
        this.isGameOver= false;
        this.winner= false;
        this.guessedCorrectly = false;
        this.guessingLog = [];
        this.alreadyGuessed = [];
        this.timed = false;
    }

    get getAttempts() {
        return this.attempts;
    }
    set setWinner(winner:boolean) {
      this.winner = winner;
    }

    get gameOver(): boolean {
        return this.attempts >= 7 || this.winner? true: false;
    }
    
    public set Word(word:string) {
        this.word = word;
    }
    get getWord() : string {
        return this.word;
    }

    get isWinner(): boolean {
      return this.winner;
    }
    get isTimed():boolean {
      return this.timed;
    }
    set setTimed(timed:boolean){
      this.timed = timed;
    }

    drawHangman(attempt: number) {
      if (attempt === 4) {
        document.getElementById('attempt-4')?.setAttribute('display','block');
        document.getElementById('attempt-5')?.setAttribute('display','block');
      }
      else if (attempt === 5) {
        document.getElementById('attempt-6')?.setAttribute('display','block');
        document.getElementById('attempt-7')?.setAttribute('display','block');
      }
      else if (attempt === 6) {
        document.getElementById('attempt-8')?.setAttribute('display','block');
        document.getElementById('attempt-9')?.setAttribute('display','block');
      }
      else if (attempt === 7) {
        document.getElementById('attempt-10')?.setAttribute('display','block');
        document.getElementById('attempt-11')?.setAttribute('display','block');
    
      }
      else {
        document.getElementById('attempt-' + attempt.toString())?.setAttribute('display','block');
      }
      


    }
    checkWord(mode:string) {
        //reveal every correct alphabet in the guessing word equivalent to the guess
        if (this.alreadyGuessed.includes(mode)) {
          //pass
        }
        else {
          for (let i = 0; i < this.word.length; i ++) {
            if (this.word[i] === mode) {
                this.guessedCorrectly = true;
                this.guessingLog.push(mode);
                var guessedLetter  = document.getElementById(i.toString());
                if (guessedLetter) {
                  guessedLetter.innerHTML = this.word[i];
                }
              }
            }
    //remove later. This is to reveal game win
      if (this.guessingLog.length === this.word.length){
        this.winner = true;
        
      }

      var guessedLetter  = document.getElementById('guessing-keyboard-'+mode);
      if (guessedLetter) {
          guessedLetter.setAttribute('disabled','');
          if (this.guessedCorrectly) {
            guessedLetter.style.backgroundColor = '#77DD77';
          }
          else {
              this.attempts += 1; 
              this.drawHangman(this.attempts);
              guessedLetter.style.backgroundColor = '#FF6961';
            
          }
        }
        this.guessedCorrectly = false;
        this.alreadyGuessed.push(mode);

        }
        
    }

}
