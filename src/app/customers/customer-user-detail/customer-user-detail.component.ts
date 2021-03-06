import { Component, OnInit } from '@angular/core';
import { LangService } from '../../lang.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-customer-user-detail',
  templateUrl: './customer-user-detail.component.html',
  styleUrls: ['./customer-user-detail.component.css']
})
export class CustomerUserDetailComponent implements OnInit {

  $page_title = "Add User";
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
    role:"",
    customerId:"",
    userName:""
  }
  user={
    gender:"female"
  }

  constructor(private langService:LangService,
    private http:HttpClient,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    if(id){
      this.isNew = false;
      this.$page_title = "Update User";
      this.http.get('/api/user/selectById/'+id).subscribe(data => {
        this.curUser = data;
        this.curUser.customerId = this.route.snapshot.paramMap.get('customerId');
      });
    }else {
      this.curUser= Object.assign({}, this.newUser);
      this.curUser.customerId = this.route.snapshot.paramMap.get('customerId');
    }
  }

  lang(word){
    return this.langService.lang(word);
  }

  save(){
    this.curUser.groupId = 4;
    this.curUser.username = this.curUser.firstName + " " + this.curUser.lastName;
    //TODO
    this.curUser.ipAddress = this.stringToByte("localhost");
    if(this.isNew){
      this.curUser.createdOn = Math.floor(Date.now() / 1000);
      this.http.post('/api/user/insert',this.curUser).subscribe(data => {
        this.router.navigateByUrl("home/users")
      });
    }else{
      this.http.post('/api/user/update',this.curUser).subscribe(data => {
        this.router.navigateByUrl("home/users")
      });
    }
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
