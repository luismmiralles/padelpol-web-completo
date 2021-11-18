import { PaddleLevelApiResponse } from '../../core/models/interfaces/paddle-level-api-response';

export interface RegisterApiResponse {
    id: number,
    name: string,
    paddle_level: PaddleLevelApiResponse
    email: string,
    updated_at: string,
    created_at: string,
    paddle_level_id: number,
}
