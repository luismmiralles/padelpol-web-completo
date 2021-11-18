import { Permission } from "../models/permission";

export class PermissionManager {

    static roles: { [key: string]: Permission[] } = {
        1: ["SEE_PLAYERS"],
        2: ["SEE_PLAYERS"],
        3: ["SEE_PLAYERS"],
        4: ["SEE_PLAYERS"],
        5: ["SEE_PLAYERS"],
        6: ["SEE_PLAYERS", "UPDATE_GAMES"],
        7: ["SEE_PLAYERS", "UPDATE_GAMES"],
        8: ["SEE_PLAYERS", "UPDATE_GAMES"],
        9: ["SEE_PLAYERS", "UPDATE_GAMES"],
        10: ["SEE_PLAYERS", "UPDATE_GAMES", "DELETE_GAMES"],
    };

    static allow(rol: string | undefined, permission: Permission): boolean {
        if (!rol || !this.roles[rol]) return false;
        return (this.roles[rol].indexOf(permission) != -1);
    }

}