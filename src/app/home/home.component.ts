import { Component, OnInit } from '@angular/core';
import { LangService } from '../lang.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  

  constructor(private langService:LangService) { }

  ngOnInit() {
  }

  lang(word){
    return this.langService.lang(word);
  }

  

}
