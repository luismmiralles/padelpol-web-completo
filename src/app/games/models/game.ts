import { GameApiRequest } from './interfaces/game-api-request';
import { User } from './../../core/models/user';
import { PaddleLevelApiResponse } from "src/app/core/models/interfaces/paddle-level-api-response";
import { Moment } from 'moment';

export class Game {
    id: number;
    location: string;
    date: Moment;
    duration: number;
    courtPrice: number
    paddleLevel: PaddleLevelApiResponse;
    player1: User;
    player2: User | null;
    player3: User | null;
    player4: User | null;

    constructor(data: Game) {
        Object.assign(this, data);
    }

    toApiParams(): GameApiRequest {
        return {
            court_price: this.courtPrice,
            date: this.date.format('YYYY-MM-DD HH:mm'),
            duration: this.duration,
            location: this.location,
            paddle_level_id: this.paddleLevel.id
        }
    }

}
