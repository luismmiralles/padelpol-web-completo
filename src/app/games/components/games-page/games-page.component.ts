import { SweetAlertService } from './../../../core/services/sweet-alert.service';
import { ManageGameDialogComponent } from './manage-game-dialog/manage-game-dialog.component';
import { GamesApiService } from './../../services/games-api.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from '../../models/game';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-games-page',
  templateUrl: './games-page.component.html',
  styleUrls: ['./games-page.component.scss']
})
export class GamesPageComponent implements OnInit {

  games: Game[];

  constructor(public router: Router, private gamesApiService: GamesApiService, private dialog: MatDialog, private sweetAlertService: SweetAlertService) { }

  private getGames() {
    this.gamesApiService.getGames().subscribe(res => {
      this.games = res;
    });
  }

  ngOnInit(): void {
    this.getGames();
  }

  openManageGameDialog(game?: Game) {
    const dialogRef = this.dialog.open(ManageGameDialogComponent, {
      data: game
    });
    dialogRef.afterClosed().subscribe((result: null | Game) => {
      if (!result) return;
      if (!result.id) this.gamesApiService.createGame(result.toApiParams()).subscribe(res => {
        // this.games.unshift(res);
        this.getGames();
        this.sweetAlertService.success("Partido creado correctamente");
      }, err => this.sweetAlertService.error("Ha ocurrido un error al crear el partido"));
      else if (result.id) this.gamesApiService.updateGame(result.id, result.toApiParams()).subscribe(res => {
        // const index = this.games.indexOf(game);
        // this.games[index] = res;
        this.getGames();
        this.sweetAlertService.success("Partido editado correctamente");
      }, err => this.sweetAlertService.error("No puedes editar este partido"));
    });
  }

  deleteGame(game: Game) {
    this.sweetAlertService.confirm(`¿Seguro que desea borrar el partido de "${game.location}"?`).then(res => {
      if (res.isConfirmed) {
        this.gamesApiService.deleteGame(game.id).subscribe(res => {
          // const index = this.games.indexOf(game);
          // this.games.splice(index, 1);
          this.getGames();
          this.sweetAlertService.success("Partido borrado correctamente");
        }, err => this.sweetAlertService.error("No puedes borrar este partido"));
      }
    })
  }
  
}
