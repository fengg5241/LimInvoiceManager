import { Component, OnInit } from '@angular/core';
import { LangService } from '../../lang.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  $page_title = "Add New User";
  isNew = true;
  curUser:any;
  newUser = {
    firstName:"",
    lastName:"",
    company:"",
    phone:"",
    email:"",
    groupId:"",
    password:"",
    passwordConfirm:"",
    role:""
  }
  user={
    gender:"female"
  }

  groupIdRoleMap = {
    1:"admin",
    2:"staff",
    3:"viewer"
  }

  roleGroupIdMap = {
    "admin":1,
    "staff":2,
    "viewer":3
  }
  constructor(private langService:LangService,
    private http:HttpClient,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    if(id){
      this.isNew = false;
      this.$page_title = "Edit User";
      this.http.get('/api/user/selectById/'+id).subscribe(data => {
        this.curUser = data;
        this.curUser.role = this.groupIdRoleMap[this.curUser.groupId]
      });
    }else {
      this.curUser= Object.assign({}, this.newUser);
      
    }
  }

  lang(word){
    return this.langService.lang(word);
  }

  save(){
    this.curUser.groupId = this.roleGroupIdMap[this.curUser.role];
    if(this.isNew){
      this.http.post('/api/user/insert',this.curUser).subscribe(data => {
        this.router.navigateByUrl("users")
      });
    }else{
      this.http.post('/api/user/update',this.curUser).subscribe(data => {
        this.router.navigateByUrl("users")
      });
    }
  }

}
