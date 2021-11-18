import { gamesResponseDemo } from './../demo/games-response-demo';
import { DemoService } from './../../core/services/demo.service';
import { GameApiRespose } from './../models/interfaces/game-api-response';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from 'src/app/core/config';
import { Game } from '../models/game';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/core/models/user';
import { GameApiRequest } from '../models/interfaces/game-api-request';
import moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class GamesApiService {

  constructor(private http: HttpClient, private demoService: DemoService) { }

  getGames(): Observable<Game[]> {
    const observable =  config.demo.runAsDemo ? this.demoService.simulateQuery(gamesResponseDemo) : this.http.get<GameApiRespose[]>(`${config.apiUrl}/games`);
    return observable.pipe(
      map(res => res.map((e: GameApiRespose) => this.gameApiResponseToGame(e)))
    );
  }

  createGame(params: GameApiRequest): Observable<Game> {
    return this.http.post<GameApiRespose>(`${config.apiUrl}/games`, params).pipe(
      map(res => this.gameApiResponseToGame(res))
    );
  }
  
  updateGame(id: number, params: GameApiRequest): Observable<Game> {
    return this.http.put<GameApiRespose>(`${config.apiUrl}/games/${id}`, params).pipe(
      map(res => this.gameApiResponseToGame(res))
    );
  }
  
  deleteGame(id: number) {
    return this.http.delete(`${config.apiUrl}/games/${id}`);
  }

  private gameApiResponseToGame(gameApiResponse: GameApiRespose): Game {
    return new Game(Object.assign(gameApiResponse, <Game>{
      courtPrice: gameApiResponse.court_price,
      paddleLevel: gameApiResponse.paddle_level,
      date: moment(gameApiResponse.date),
      player1: gameApiResponse.player1 ? new User(gameApiResponse.player1) : null,
      player2: gameApiResponse.player2 ? new User(gameApiResponse.player2) : null,
      player3: gameApiResponse.player3 ? new User(gameApiResponse.player3) : null,
      player4: gameApiResponse.player4 ? new User(gameApiResponse.player4) : null,
    }));
  }
}
