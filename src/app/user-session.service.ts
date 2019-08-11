import { Inject, Injectable } from '@angular/core';
import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';

@Injectable({
  providedIn: 'root'
})
export class UserSessionService {

  // key that is used to access the data in local storage
  STORAGE_KEY = 'login_user';

  constructor(@Inject(SESSION_STORAGE) private storage:StorageService) { }

  getUserInfo(){
    return this.storage.get(this.STORAGE_KEY);
  }

  setUserInfo(userInfo){
    this.storage.set(this.STORAGE_KEY, JSON.stringify(userInfo));
  }
}
