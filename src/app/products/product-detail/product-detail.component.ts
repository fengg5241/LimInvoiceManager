import { Component, OnInit } from '@angular/core';
import { LangService } from '../../lang.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  $page_title = 'New Product';
  $tax_rates:any;
  $Settings = {default_tax_rate:true};
  curProduct = {name:'',price:0,details:''};
  selectedRate:any;
  selectedTaxMethod:any;

  constructor(private langService:LangService) { }

  ngOnInit() {
  }

  lang(word){
    return this.langService.lang(word);
  }

}
