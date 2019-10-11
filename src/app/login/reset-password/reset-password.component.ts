import { Component, OnInit } from '@angular/core';
import { LangService } from '../../lang.service';
import { UserSessionService } from '../../user-session.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  newPassword:"";
  newConfirm:"";
  userId:any;

  constructor(private langService: LangService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private userSessionService: UserSessionService) { }

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id');

  }

  lang(word) {
    return this.langService.lang(word);
  }

  submit(){
    if(!this.newPassword && this.newPassword === ""){
      alert("The New Password field is required.");
      return;
    }
    if(this.newPassword != this.newConfirm){
      alert("The New Password field does not match the Confirm Password field.");
      return;
    }
    
    let user = {
      password:this.newPassword,
      id:this.userId
    }
  
    this.http.post('/api/user/changePassword',user).subscribe(data => {
      alert("Update Successfully !");
    });
  }
}
