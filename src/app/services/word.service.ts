import { Injectable } from "@angular/core";

@Injectable() 

export class WordService {
    private easyWord: string = '';
    private mediumWord: string = '';
    private hardWord: string = '';

    constructor() {
        this.getWords();
        
    }
    getNewWord() {
        this.easyWord = '';
        this.mediumWord = '';
        this.hardWord = ''
        this.getWords();
    }
    
    async getWords() {
        return await fetch('https://random-word-api.vercel.app/api?word',{
            headers: {
                'Accept':'text/plain'
            }
    }).then((response) => response.text()).then(
        (word) => {
            word = word.substring(2,word.length -2 );
            this.selectWord(word);
       
            
           
    });
    }

    selectWord(word: string) {
        if (this.easyWord.length === 0 || this.mediumWord.length === 0  ||this.hardWord.length === 0) {
            if ((word.length >= 4 && word.length < 6) && this.easyWord.length == 0) {
                this.easyWord = word;
            }
            else if ((word.length >=6 && word.length < 8) && this.mediumWord.length === 0) {
                    this.mediumWord = word;
            }
            else if ((word.length > 8) && this.hardWord.length === 0) {
                this.hardWord = word;
            }
            this.getWords();
           
        }
        
    }
    get getEasyWord():string {
        return this.easyWord;
    }

    get getMediumWord() : string {
        return this.mediumWord;
    }

    get getHardWord() :string {
        return this.hardWord
    }


}


