export interface RegisterApiRequest {
    rol?: number,
    name: string,
    paddle_level_id: number,
    email: string,
    password: string,
    password_confirmation: string
}