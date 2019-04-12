import { Component, OnInit } from '@angular/core';
import { LangService } from '../../lang.service';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit {

  $page_title = 'New Customer';
  curCustomer = {
    company:"",
    name:"",
    email:"",
    phone:"",
    address:"",
    city:"",
    state:"",
    postalCode:"",
    country:"",
    cf1:"",
    cf2:"",
    cf3:"",
    cf4:"",
    cf5:"",
    cf6:""
  }
  constructor(private langService:LangService) { }

  ngOnInit() {
  }

  lang(word){
    return this.langService.lang(word);
  }

}
