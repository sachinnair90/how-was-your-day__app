import { Injectable, Inject } from '@angular/core';
import * as lz from 'lz-string';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

export interface IAppStorageService {
  setItem(key: string, value: object | string | number | Date | boolean): void;
  getItem(key: string): object | string | number | Date | boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AppStorageService implements IAppStorageService {

  public static STORAGE_KEYS = {
    USER: 'user',
    TOKEN: 'token',
  };

  constructor(@Inject(LOCAL_STORAGE) private storageService: StorageService) { }

  public setItem(key: string, value: object | string | number | Date | boolean) {
    const stringValue = JSON.stringify(value);

    const compressedString = lz.compress(stringValue);

    this.storageService.set(key, compressedString);
  }

  public getItem(key: string): any {
    const compressedValue = this.storageService.get(key);

    const decompressedValue = lz.decompress(compressedValue);

    return JSON.parse(decompressedValue);
  }
}
