import { Component, OnInit } from '@angular/core';
import { LangService } from '../../../lang.service';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-tax-rate-detail',
  templateUrl: './tax-rate-detail.component.html',
  styleUrls: ['./tax-rate-detail.component.css']
})
export class TaxRateDetailComponent implements OnInit {

  $page_title = "Add New Tax Rate";
  isNew = true;
  curTaxRate:any;
  newTaxRate = {
    name:"",
    rate:"",
    type:""
  }
  constructor(private langService: LangService,
    private http: HttpClient,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    if(id){
      this.isNew = false;
      this.$page_title = "Edit Tax Rate";
      this.http.get('/api/taxRate/selectById/'+id).subscribe(data => {
        this.curTaxRate = data;
      });
    }else {
      this.curTaxRate= Object.assign({}, this.newTaxRate);
    }
  }

  lang(word) {
    return this.langService.lang(word);
  }

  saveSetting(){
    if(this.isNew){
      this.http.post('/api/taxRate/insert',this.curTaxRate).subscribe(data => {
        this.router.navigateByUrl("home/settings/taxRate")
      });
    }else{
      this.http.post('/api/taxRate/update',this.curTaxRate).subscribe(data => {
        this.router.navigateByUrl("home/settings/taxRate")
      });
    }
  }
}
