import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SolverService {

  constructor() { }

  isLetterPresent(word: string, guess: string) {
    return word.indexOf(guess) !== -1;
  }

  isLetterPresentInPosition(word: string, guess: string, position: number) {
    return word.indexOf(guess) === position;
  }
}
