import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LangService } from './lang.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'LimInvoiceManager';

  total = 1; //$tatal
  $paid = 1;
  $cookieCompany = "shanCompany";
  $cookieName = "feng";
  $cookieEmail = "feng@163.com";
  $cookiePhone = "99998888";

  constructor(private langService:LangService,
    private router: Router) { }

  lang(word){
    return this.langService.lang(word);
  }

  ngOnInit() {
    //this.router.navigate(['home']);
  }
}
