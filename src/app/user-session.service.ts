import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'angular-webstorage-service';

@Injectable({
  providedIn: 'root'
})
export class UserSessionService {

  // key that is used to access the data in local storage
  STORAGE_KEY = 'login_user';

  groupMap = {
    1:"admin",
    2:"sales",
    3:"viewer",
    4:"customer"
  }

  constructor(@Inject(LOCAL_STORAGE) private storage:StorageService) { }

  getUserInfo(){
    return this.storage.get(this.STORAGE_KEY);
  }

  setUserInfo(userInfo){
    this.storage.set(this.STORAGE_KEY, JSON.stringify(userInfo));
  }

  getUserRole(){
    let user = JSON.parse(this.storage.get(this.STORAGE_KEY));
    if(user){
      return this.groupMap[user.groupId];
    }else {return null;}
  }

  logout(){
    this.storage.remove(this.STORAGE_KEY);
  }
}
