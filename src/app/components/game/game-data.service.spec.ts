import { TestBed } from '@angular/core/testing';
import { GameDataService } from './game-data.service';
import { IGameWordLetter } from './i-game-word-letter.interface';

describe('GameDataService', () => {
  let service: GameDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameDataService);
    service.resetGameState();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create game data', () => {
    const maxAttempts = 6;
    const wordLength = 5;
    const data = service.createGameData(maxAttempts, wordLength);
    
    expect(data.length).toEqual(maxAttempts);
    
    data.forEach((row) => {
      expect(row.length).toEqual(wordLength);
      
      row.forEach((rowValue) => {
        expect(rowValue).toEqual({
          value: '',
          isInCorrectPosition: false,
          isInWord: false
        });
      });
    });
  });

  it('should reset game state', () => {
    service.resetGameState();

    expect(service.getNumAttempts()).toEqual(0);

    const data = service.getGameData();

    data.forEach((row) => {
      row.forEach((letter: IGameWordLetter) => {
        expect(letter).toEqual({
          value: '',
          isInCorrectPosition: false,
          isInWord: false
        });
      });
    });
  });

  it('should get a random word', () => {
    const actual = service.getRandomWord();
    expect(actual).toBeTruthy();
  });

  it('should get last guessed word', () => {
    // make a guess
    const guessWord = 'hello';
    service.guessWord(guessWord);

    // first attempt
    expect(service.getNumAttempts()).toEqual(1);

    // verify our guess made it in
    const lastGuess = service.getLastGuessFromData();
    expect(lastGuess).toEqual(guessWord);
  });

  it('should set game data letters when a word is guessed', () => {
    let actual;
    let word: string = '';
    let isWordCorrect = false;
    let data = null;
    let attemptNumber = 0;
    let lastGuess;

    service.startGame();

    // Incorrect guess
    service.setWord('Wilson Fisk');
    actual = service.isWordCorrect('eagle');
    expect(actual).toBeFalse();

    // Correct guess
    const expected = 'Rabbit in a snowstorm';
    service.setWord(expected);
    actual = service.isWordCorrect(expected);
    expect(actual).toBeTrue();

    // Confirm game data

    attemptNumber = service.getNumAttempts();
    expect(attemptNumber).toEqual(0);

    // Guess #1
    word = 'aloud';
    service.setWord(word);
    isWordCorrect = service.guessWord(word);
    attemptNumber = service.getNumAttempts();
    expect(service.getNumAttempts()).toEqual(1);
    expect(isWordCorrect).toBeTrue();
    lastGuess = service.getLastGuessFromData();
    expect(lastGuess).toEqual(word);

    // Guess #2
    word = 'Vladimir';
    isWordCorrect = service.guessWord(word);
    attemptNumber = service.getNumAttempts();
    expect(service.getNumAttempts()).toEqual(2);
    expect(isWordCorrect).toBeFalse();
    lastGuess = service.getLastGuessFromData();
    expect(lastGuess).toEqual(word);
  });

  it('should indicate isLetterInWord and isLetterInCorrectPosition', () => {
    let word = 'blacksky';
    service.setWord(word);
    service.guessWord(word);

    let lastGuessLetters = service.getLettersFromLastGuess();

    // letter in position and in word
    lastGuessLetters.forEach((letter: IGameWordLetter, index: number) => {
      expect(letter.value).toEqual(word[index]);
      expect(letter.isInCorrectPosition).toBeTrue();
      expect(letter.isInWord).toBeTrue();
    });

    // letter in word but not in position
    service.guessWord('skyblack');
    lastGuessLetters = service.getLettersFromLastGuess();
    lastGuessLetters.forEach((letter: IGameWordLetter) => {
      expect(letter.isInCorrectPosition).toBeFalse();
      expect(letter.isInWord).toBeTrue();
    });

    // letter not in word or in position
    service.guessWord('zzzzzzzzz');
    lastGuessLetters = service.getLettersFromLastGuess();
    lastGuessLetters.forEach((letter: IGameWordLetter) => {
      expect(letter.isInCorrectPosition).toBeFalse();
      expect(letter.isInWord).toBeFalse();
    });
  });
});
