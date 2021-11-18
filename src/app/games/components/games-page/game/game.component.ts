import { AuthService } from 'src/app/core/services/auth.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Game } from 'src/app/games/models/game';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  @Input() game: Game;

  @Output() updateGameEvent = new EventEmitter<Game>();
  @Output() deleteGameEvent = new EventEmitter<Game>();
  
  constructor(public authService: AuthService) { }

  emitUpdateGameEvent() {
    this.updateGameEvent.emit(this.game);
  }
  
  emitDeleteGameEvent() {
    this.deleteGameEvent.emit(this.game);
  }


  ngOnInit(): void {
  }

  openShowUserDialog(): void {
  }

}
