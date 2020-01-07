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
    this.curUser.username = this.curUser.firstName + " " + this.curUser.lastName;
    
    //TODO
    this.curUser.ipAddress = this.stringToByte("localhost");

    let requiredFields = this.checkRequiredFields();
    if(requiredFields.length > 0){
      alert(requiredFields.join() + " are required.");
    }else {

      if(this.isNew){
        this.curUser.createdOn = Math.floor(Date.now() / 1000)
        this.http.post('/api/user/insert',this.curUser).subscribe(data => {
          this.router.navigateByUrl("home/users")
        });
      }else{
        this.http.post('/api/user/update',this.curUser).subscribe(data => {
          this.router.navigateByUrl("home/users")
        });
      }
    }
  }

  checkRequiredFields(){
    let requiredFields = [];
    let user = this.curUser;
    if(user.firstName == ""){
      requiredFields.push("First Name");
    }

    if(user.lastName == ""){
      requiredFields.push("Last Name");
    }

    if(user.email == ""){
      requiredFields.push("Email Address");
    }

    if(user.phone == ""){
      requiredFields.push("Phone");
    }

    if(user.company == ""){
      requiredFields.push("Company");
    }

    if(user.password == ""){
      requiredFields.push("Password");
    }

    if(user.passwordConfirm == ""){
      requiredFields.push("Confirm Password");
    }

    return requiredFields;
  }


  stringToByte(str) {
    var bytes = new Array();
    var len, c;
    len = str.length;
    for(var i = 0; i < len; i++) {
      c = str.charCodeAt(i);
      if(c >= 0x010000 && c <= 0x10FFFF) {
        bytes.push(((c >> 18) & 0x07) | 0xF0);
        bytes.push(((c >> 12) & 0x3F) | 0x80);
        bytes.push(((c >> 6) & 0x3F) | 0x80);
        bytes.push((c & 0x3F) | 0x80);
      } else if(c >= 0x000800 && c <= 0x00FFFF) {
        bytes.push(((c >> 12) & 0x0F) | 0xE0);
        bytes.push(((c >> 6) & 0x3F) | 0x80);
        bytes.push((c & 0x3F) | 0x80);
      } else if(c >= 0x000080 && c <= 0x0007FF) {
        bytes.push(((c >> 6) & 0x1F) | 0xC0);
        bytes.push((c & 0x3F) | 0x80);
      } else {
        bytes.push(c & 0xFF);
      }
    }
    return bytes;
  }


}
