import { Component, OnInit } from '@angular/core';
import { LangService } from '../../lang.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit {

  $page_title = 'New Customer';
  newCustomer = {
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

  curCustomer:any;
  isNew = true;

  constructor(private langService:LangService,
    private http:HttpClient,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    if(id){
      this.isNew = false;
      this.$page_title = "Edit Customer";
      this.http.get('/api/customer/selectById/'+id).subscribe(data => {
        this.curCustomer = data;
      });
    }else {
      this.curCustomer= Object.assign({}, this.newCustomer);
    }
  }

  lang(word){
    return this.langService.lang(word);
  }

  checkRequiredFields(){
    let requiredFields = [];
    let customer = this.curCustomer;
    if(customer.name == ""){
      requiredFields.push("Name");
    }

    if(customer.email == ""){
      requiredFields.push("Email Address");
    }

    if(customer.company == ""){
      requiredFields.push("Company");
    }

    if(customer.address == ""){
      requiredFields.push("Address");
    }

    if(customer.city == ""){
      requiredFields.push("City");
    }

    if(customer.phone == ""){
      requiredFields.push("Phone");
    }

    return requiredFields;
  }

  save(){
    let requiredFields = this.checkRequiredFields();
    if(requiredFields.length > 0){
      alert(requiredFields.join() + " are required.");
    }else {
      if(this.isNew){
        this.http.post('/api/customer/insert',this.curCustomer).subscribe(data => {
          this.router.navigateByUrl("home/customers")
        });
      }else{
        this.http.post('/api/customer/update',this.curCustomer).subscribe(data => {
          this.router.navigateByUrl("home/customers")
        });
      }
    }
  }

}
