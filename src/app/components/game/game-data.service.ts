import { Injectable } from '@angular/core';
import { map, sample } from 'lodash';
import { IGameWordLetter } from './i-game-word-letter.interface';
import * as allWords from './words.json';

@Injectable({
  providedIn: 'root'
})
export class GameDataService {
  private gameData: IGameWordLetter[][] = [];
  private word: string = '';
  private numAttempts = 0;
  
  constructor() {
    
  }

  getNumAttempts() {
    return this.numAttempts;
  }

  /**
   * 1. Creates game data
   * 2. Sets random word
   */
  startGame() {
    this.gameData = this.createGameData(6, 5);
    this.word = this.getRandomWord();

    return this.gameData;
  }

  resetGameState() {
    this.startGame();
    this.numAttempts = 0;
  }

  getGameData() {
    return this.gameData;
  }

  createGameData(maxAttempts: number, wordLength: number) {
    const data: IGameWordLetter[][] = [];
    let row: IGameWordLetter[] = [];

    for (let j = 0; j < maxAttempts; j++) {
      row = [];
      for (let k = 0; k < wordLength; k++) {
        row.push({
          value: '',
          isInCorrectPosition: false,
          isInWord: false
        });
      }
      data.push(row);
    }

    return data;
  }

  getRandomWord(): string {
    let word = sample(allWords);

    if (word) {
      word = word.toLowerCase();
    }

    return word;
  }

  setWord(word: string) {
    this.word = word.toLowerCase();
  }

  getWord(): string {
    return this.word;
  }

  isWordCorrect(word: string) {
    return word.toLowerCase() === this.word;
  }

  guessWord(word: string): boolean {
    const attemptNumber = this.getNumAttempts();
    let isLetterInWord = false;
    let isLetterInCorrectPosition = false;

    if (this.gameData[attemptNumber]) {
      for (let j = 0; j < word.length; j++) {
        isLetterInWord = this.word?.indexOf(word[j]) !== -1;

        if (isLetterInWord) {
          isLetterInCorrectPosition = word[j] === this.word[j];
        }

        this.gameData[attemptNumber][j] = {
          value: word[j],
          isInCorrectPosition: isLetterInCorrectPosition,
          isInWord: isLetterInWord
        };
      }
    }

    this.numAttempts++;

    return this.isWordCorrect(word);
  }

  getLastGuessFromData() {
    const letters = this.getLettersFromLastGuess();
    return map(letters, 'value').join('');
  }

  getLettersFromLastGuess(): IGameWordLetter[] {
    const data = this.getGameData();
    const attemptNumber = this.getNumAttempts();
    return data[attemptNumber - 1];
  }
}
