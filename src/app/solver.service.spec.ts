import { TestBed } from '@angular/core/testing';

import { SolverService } from './solver.service';

describe('SolverService', () => {
  let service: SolverService;
  let word = 'daredevil';

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return true when letter is present', () => {
    const guess = 'a';
    const actual = service.isLetterPresent(word, guess);
    expect(actual).toBeTrue();
  });

  it('should return false when letter is not present', () => {
    const guess = 'x';
    const actual = service.isLetterPresent(word, guess);
    expect(actual).toBeFalse();
  });

  it('should return true when letter is present in position', () => {
    const actual = service.isLetterPresentInPosition(word, 'a', 1);
    expect(actual).toBeTrue();
  });

  it('should return false when letter is not present in position', () => {
    const actual = service.isLetterPresentInPosition(word, 'a', 0);
    expect(actual).toBeFalse();
  });
});
