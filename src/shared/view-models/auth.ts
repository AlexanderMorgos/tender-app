import { appInject, appInjectable } from '@core/di/utils';
import { appMakeObservable, appObservable } from '@core/state-management/utils';
import { STORAGE_KEYS } from '@shared/constants/auth';
import { DI_TOKENS } from '@shared/constants/di';
import { IStorageService } from '@shared/types/services/storage';
import { IAuthViewModel } from '@shared/types/view-models/auth';

@appInjectable()
export class AuthViewModel implements IAuthViewModel {
  private storageService = appInject<IStorageService>(DI_TOKENS.storageService);
  private _userEmail = this.storageService.get<string>('cookie', STORAGE_KEYS.userEmail);

  constructor() {
    appMakeObservable(this, {
      _userEmail: appObservable,
    });
  }

  get loggedIn() {
    return Boolean(this.userEmail);
  }

  get userEmail() {
    return this._userEmail;
  }

  login = (email: string) => {
    this._userEmail = email;
    this.storageService.set<string>('cookie', STORAGE_KEYS.userEmail, email);
  }

  logout = () => {
    this._userEmail = undefined;
    this.storageService.remove('cookie', STORAGE_KEYS.userEmail);
  };
}
