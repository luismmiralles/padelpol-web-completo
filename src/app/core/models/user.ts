import { PermissionManager } from './../services/permission-manager';
import { Permission } from './permission';
import { PaddleLevelApiResponse } from "./interfaces/paddle-level-api-response";

export class User {
    id: number;
    name: string;
    email: string;
    rol: number;
    paddle_level: PaddleLevelApiResponse;

    constructor(data: User) {
        Object.assign(this, data);
    }

    can(permission: Permission) {
        return PermissionManager.allow(this.rol.toString(), permission);
    }
}
