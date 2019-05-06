import { Component, OnInit } from '@angular/core';
import { LangService } from '../../lang.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  $page_title = "Add New User";
  curUser = {
    firstName:"",
    lastName:"",
    company:"",
    phone:"",
    email:"",
    adminRole:"",
    salesRole:"",
    viewerRole:"",
    password:"",
    passwordConfirm:""
  }
  constructor(private langService:LangService) { }

  ngOnInit() {
  }

  lang(word){
    return this.langService.lang(word);
  }

  save(){
    if(this.isNew){
      this.http.post('/api/product/insert',this.curProduct).subscribe(data => {
        this.router.navigateByUrl("products")
      });
    }else{
      this.http.post('/api/product/update',this.curProduct).subscribe(data => {
        this.router.navigateByUrl("products")
      });
    }
  }

}
