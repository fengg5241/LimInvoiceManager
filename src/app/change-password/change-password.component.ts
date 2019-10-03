import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LangService } from '../lang.service';
import { UserSessionService } from '../user-session.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  oldPassword:any;
  newPassword:any;
  confirmPassword:any;
  user:any;

  constructor(private langService: LangService,
    private userSessionService: UserSessionService,
    private http: HttpClient) { }

  ngOnInit() {
    this.user = JSON.parse(this.userSessionService.getUserInfo());
  }

  save(){
    if(!this.newPassword && this.newPassword === ""){
      alert("The New Password field is required.");
      return;
    }
    if(this.newPassword != this.confirmPassword){
      alert("The New Password field does not match the Confirm Password field.");
      return;
    }

    let loginUser = {
      email:this.user.email,
      password:this.oldPassword
    }
    let thisObject  = this;
    this.http.post('/api/user/loginAuth',loginUser).subscribe(data => {
      if(data){
        loginUser.password = this.newPassword;
        loginUser["id"] = this.user.id;
        thisObject.http.post('/api/user/changePassword',loginUser).subscribe(data => {
          alert("Update Successfully !");
        });
      }else {
        alert("Old password is wrong !");
      }
    });
  }

}
