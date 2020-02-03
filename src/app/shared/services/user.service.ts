import { Injectable, Inject } from '@angular/core';
import { AuthenticatedUserInfo } from '../../login/models/authenticated-user-info.model';
import { IAppStorageService, AppStorageService } from './app-storage.service';

export interface IUserService {
  setUser(user: AuthenticatedUserInfo);
}

@Injectable({
  providedIn: 'root'
})
export class UserService implements IUserService {
  private userInfo: AuthenticatedUserInfo;

  constructor(
    @Inject(AppStorageService) private storageService: IAppStorageService
  ) { }

  public get user(): AuthenticatedUserInfo {
    return this.userInfo;
  }

  public setUser(user: AuthenticatedUserInfo) {
    this.userInfo = user;

    this.storageService.setItem(AppStorageService.STORAGE_KEYS.USER, user);
  }
}
