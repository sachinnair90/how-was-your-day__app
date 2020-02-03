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

    storageService.get.and.returnValue(lz.compress(JSON.stringify('dummy-value')));

    const result = service.getItem('dummy');

    expect(result).toBe('dummy-value');
  });

  it('should return null if there is no value with given key', () => {
    storageService.get.and.returnValue(undefined);

    const result = service.getItem('dummy');

    expect(result).toBeNull();
  });
});
