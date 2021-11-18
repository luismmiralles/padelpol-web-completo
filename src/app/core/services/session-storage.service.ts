import { Injectable } from '@angular/core';

type KeyType = "token";

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor() { }

  setItem(key: KeyType, value: any) {
    sessionStorage.setItem(key, value);
  }
  
  getItem(key: KeyType): string | null {
    return sessionStorage.getItem(key);
  }
  
  removeItem(key: KeyType): void {
    sessionStorage.removeItem(key);
  }
}
