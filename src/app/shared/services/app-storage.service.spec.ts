import { TestBed } from '@angular/core/testing';

import { AppStorageService, IAppStorageService } from './app-storage.service';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

describe('AppStorageService', () => {
  const storageService = jasmine.createSpyObj<StorageService>('StorageService', [ 'set' ]);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: LOCAL_STORAGE, useValue: storageService }
      ]
    });
  });

  it('should be created', () => {
    const service: IAppStorageService = TestBed.get(AppStorageService);
    expect(service).toBeTruthy();
  });

  it('should set the item to local storage', () => {
    const service: IAppStorageService = TestBed.get(AppStorageService);

    service.setItem('dummy', { abc: 'abc', def: 'def' });

    expect(storageService.set).toHaveBeenCalled();
  });
});
