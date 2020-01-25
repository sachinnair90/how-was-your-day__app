import { Injectable, Inject } from '@angular/core';
import { AppStorageService, IAppStorageService } from './app-storage.service';

export interface ITokenService {
  getToken(): string;
  setToken(token: string): void;
}

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(@Inject(AppStorageService) private storageService: IAppStorageService) { }

  public getToken(): string {
    return this.storageService.getItem(AppStorageService.STORAGE_KEYS.TOKEN) as string;
  }

  public setToken(token: string): void {
    this.storageService.setItem(AppStorageService.STORAGE_KEYS.TOKEN, token);
  }
}
