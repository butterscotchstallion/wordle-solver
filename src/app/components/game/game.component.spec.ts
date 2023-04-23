import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { GameDataService } from './game-data.service';

import { GameComponent } from './game.component';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;
  let service: GameDataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(GameDataService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
