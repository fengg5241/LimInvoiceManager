import { Component, OnInit } from '@angular/core';
import { LangService } from '../../lang.service';

@Component({
  selector: 'app-product-upload',
  templateUrl: './product-upload.component.html',
  styleUrls: ['./product-upload.component.css']
})
export class ProductUploadComponent implements OnInit {

  $page_title = 'Import Products by CSV file';
  
  constructor(private langService:LangService) { }

  ngOnInit() {

  }

  checkfile(){}

  lang(word){
    return this.langService.lang(word);
  }

}
