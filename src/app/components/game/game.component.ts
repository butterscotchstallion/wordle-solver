import { Component, OnInit } from '@angular/core';
import { GameDataService } from './game-data.service';
import { IGameWordLetter } from './i-game-word-letter.interface';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  gameData: IGameWordLetter[][] = [];

  constructor(private dataService: GameDataService) { 

  }

  ngOnInit(): void {
    this.gameData = this.dataService.startGame();
  }

}
