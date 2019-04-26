import { Component, OnInit } from '@angular/core';
import { LangService } from '../../../lang.service';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { ActivatedRoute,Router } from '@angular/router';
@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.css']
})
export class CompanyDetailComponent implements OnInit {

  $page_title = "Add Company";
  isNewCompany = true;
  curCompany:any;
  newCompany = {
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
    private location: Location,
    private route: ActivatedRoute,
    private router: Router) { }

  createCompany(){
    this.http.post('/company/insert',this.curCompany).subscribe(data => {
      this.router.navigateByUrl("settings/companies")
    });
  }

  updateCompany(){
    this.http.post('/company/update',this.curCompany).subscribe(data => {
      this.location.go("/settings/companies")
    });
  }

  ngOnInit() {
    let companyId = this.route.snapshot.paramMap.get('id');
    if(companyId){
      this.isNewCompany = false;
      this.$page_title = "Edit Company";
      this.http.get('/company/selectById/'+companyId).subscribe(data => {
        this.curCompany = data;
      });
    }else {
      this.curCompany= Object.assign({}, this.newCompany);
    }
  }

  lang(word) {
    return this.langService.lang(word);
  }

}
