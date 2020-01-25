import { TestBed } from '@angular/core/testing';

import { AppStorageService, IAppStorageService } from './app-storage.service';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import * as lz from 'lz-string';

describe('App Storage Service', () => {
  const storageService = jasmine.createSpyObj<StorageService>('StorageService', [ 'set', 'get' ]);

  let service: IAppStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: LOCAL_STORAGE, useValue: storageService }
      ]
    });

    service = TestBed.get(AppStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set the item to local storage', () => {

    service.setItem('dummy', { abc: 'abc', def: 'def' });

    expect(storageService.set).toHaveBeenCalled();
  });

  it('should get the item from local storage', () => {

    storageService.get.and.returnValue(lz.compress('dummy-value'));

    service.getItem('dummy');

    expect(storageService.get).toHaveBeenCalled();
  });
});
