import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usernav',
  templateUrl: './usernav.component.html',
  styleUrls: ['./usernav.component.scss']
})
export class UsernavComponent implements OnInit {
  user: string;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.user = this.authService.user;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

}
