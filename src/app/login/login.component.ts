import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LangService } from '../lang.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(
    private langService: LangService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {}

  lang(word) {
    return this.langService.lang(word);
  }
}
