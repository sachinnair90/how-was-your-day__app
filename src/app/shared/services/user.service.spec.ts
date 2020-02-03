import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { AuthenticatedUserInfo } from '../../login/models/authenticated-user-info.model';
import { AppStorageService, IAppStorageService } from './app-storage.service';

describe('User Service', () => {
  const storageService = jasmine.createSpyObj<IAppStorageService>('AppStorageService', [ 'setItem' ]);

  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AppStorageService, useValue: storageService }
      ]
    });

    service = TestBed.get(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should store the user', () => {

    const user = new AuthenticatedUserInfo();
    user.email = 'foo@bar.com';
    user.firstName = 'Foo';
    user.lastName = 'Bar';
    user.token = 'dummy-token';

    service.setUser(user);

    expect(storageService.setItem).toHaveBeenCalled();

    expect(service.user).toBe(user);
  });
});
