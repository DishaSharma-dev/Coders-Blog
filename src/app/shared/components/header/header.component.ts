import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private userService: UserService, private router : Router) { }
  isLoggedIn : boolean = localStorage.getItem('auth_token') != null;
  ngOnInit(): void {
    this.userService.isLoggedIn.subscribe(value => this.isLoggedIn = value);
  }

  signOut()
  {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("userId");
    this.userService.isLoggedIn.next(false);
    this.router.navigate(['/']);
  }

}
