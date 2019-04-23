import { Component, OnInit } from '@angular/core';
import { LangService } from '../../../lang.service';

@Component({
  selector: 'app-tax-rate-detail',
  templateUrl: './tax-rate-detail.component.html',
  styleUrls: ['./tax-rate-detail.component.css']
})
export class TaxRateDetailComponent implements OnInit {

  $page_title = "Add New Tax Rate";
  curTaxRate = {
    name:"",
    rate:"",
    selectedType:""
  }
  constructor(private langService: LangService) { }

  ngOnInit() {
  }

  lang(word) {
    return this.langService.lang(word);
  }

}
