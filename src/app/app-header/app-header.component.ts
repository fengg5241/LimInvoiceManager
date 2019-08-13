import { Component, OnInit } from '@angular/core';
import { UserSessionService } from '../user-session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent implements OnInit {


  user:any
  userRole:any;

  groupMap = {
    1:"admin",
    2:"sales",
    3:"viewer",
    4:"customer"
  }
  constructor(private userSessionService: UserSessionService,
    private router: Router) { }

  ngOnInit() {
    this.user = JSON.parse(this.userSessionService.getUserInfo());
    this.userRole = this.groupMap[this.user.groupId];
  }

  logout(){
    this.userSessionService.logout();
    this.router.navigate(['login']);
  }

}
