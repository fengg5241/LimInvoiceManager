import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(private http: HttpClient) { }

  hrld(ldate) {
    if(ldate) {
        // return date($this->dateFormats['php_ldate'], strtotime(ldate));
        return new Date(ldate).toLocaleTimeString();
        
    } else {
        return '0000-00-00 00:00:00';
    }
}
  

  updateSysSettings(sysSettings):void{
    localStorage.setItem("LimSysSettings",sysSettings)
  }
}
