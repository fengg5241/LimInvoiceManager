import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.css']
})
export class CompanyDetailComponent implements OnInit {

  $page_title = "Add Company";
  curCompany = {
    name:"",
    email:"",
    company:"",
    cf1:"",
    cf2:"",
    cf3:"",
    cf4:"",
    cf5:"",
    cf6:"",
    address:"",
    city:"",
    state:"",
    postalCode:"",
    country:"",
    phone:""
  }
  constructor() { }

  createCompany(){

  }

  ngOnInit() {
  }

}
