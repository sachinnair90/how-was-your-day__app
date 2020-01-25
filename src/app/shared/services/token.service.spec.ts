import { TestBed } from '@angular/core/testing';

import { TokenService } from './token.service';
import { AppStorageService, IAppStorageService } from './app-storage.service';

describe('Token Service', () => {
  let service: TokenService;

  const storageService = jasmine.createSpyObj<IAppStorageService>('AppStorageService',
    [ 'setItem', 'getItem' ]
  );

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AppStorageService, useValue: storageService }
      ]
    });

    service = TestBed.get(TokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should store token in local storage', () => {
    const token = 'token';

    service.setToken(token);

    expect(storageService.setItem).toHaveBeenCalled();
  });

  it('should get token from local storage', () => {
    const expectedToken = 'token';

    storageService.getItem.and.returnValue(expectedToken);

    const actualToken = service.getToken();

    expect(actualToken).toBe(expectedToken);
  });
});
