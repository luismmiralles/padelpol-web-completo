import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { SessionStorageService } from './session-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private sessionStorageService: SessionStorageService) { }

  getCurrentUser(): null | User {
    try {
      const token = this.sessionStorageService.getItem("token") || "";
      const payload = JSON.parse(atob(token.split(".")[1]));
      return new User(payload.user);
    } catch(err) {
      return null;
    }
  }
}
