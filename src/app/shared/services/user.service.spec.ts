import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { AuthenticatedUserInfo } from '../../login/models/authenticated-user-info.model';
import { AppStorageService } from './app-storage.service';

describe('UserService', () => {
  const storageService = jasmine.createSpyObj<AppStorageService>('AppStorageService', [ 'setItem' ]);

  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: AppStorageService, useValue: storageService }
    ]
  }));

  it('should be created', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });

  it('should store the user', () => {
    const service: UserService = TestBed.get(UserService);

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
