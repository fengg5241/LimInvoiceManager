import { Component, OnInit } from '@angular/core';
import { LangService } from '../../../lang.service';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';

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
  constructor(private langService: LangService,
    private http: HttpClient,
    private location: Location) { }

  createCompany(){
    this.http.post('/company/selectAll',{data:this.curCompany}).subscribe(data => {
      // this.curCompany = data;
      this.location.go("/settings/companies")
    });
  }

  ngOnInit() {
  }

  lang(word) {
    return this.langService.lang(word);
  }

}
