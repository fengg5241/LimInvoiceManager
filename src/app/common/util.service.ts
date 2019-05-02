import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(private http: HttpClient) { }

  getSysSettings():any{
    
    let sysSettings = localStorage.getItem("LimSysSettings");
    if(sysSettings){
      return Promise.resolve(JSON.parse(sysSettings))
    }else {
      this.http.get('/api/sysSetting/selectAll').subscribe(data => {
        let settings:any = data;
        if(settings.length > 0){
          this.updateSysSettings(JSON.stringify(settings[0]))
          return settings[0];
        }else {
          return null;
        }
      });
    }
  }

  updateSysSettings(sysSettings):void{
    localStorage.setItem("LimSysSettings",sysSettings)
  }
}
