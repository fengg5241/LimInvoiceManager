import { Component, OnInit } from '@angular/core';
import { UserSessionService } from '../user-session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-app-aside',
  templateUrl: './app-aside.component.html',
  styleUrls: ['./app-aside.component.css']
})
export class AppAsideComponent implements OnInit {

  constructor(private router: Router,
    private userSessionService: UserSessionService) { }

  ngOnInit() {
  }

  logout(){
    this.userSessionService.logout();
    this.router.navigate(['login']);
  }
}
