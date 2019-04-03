import { Component, OnInit } from '@angular/core';
import { LangService } from '../lang.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  $page_title = "Products";
  constructor(private langService:LangService) { }

  ngOnInit() {
  }

  lang(word){
    return this.langService.lang(word);
  }


}
