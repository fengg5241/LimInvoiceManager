import { Component, OnInit } from '@angular/core';
import { LangService } from '../lang.service';

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

  createUser(){

  }

}
