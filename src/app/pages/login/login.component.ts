import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  error: any;
  loading: boolean;
  loginLabel: string;
  constructor(
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit() {
    this.loading = false;
    this.loginLabel = 'Sign in';
  }

  login( username: string, password: string ) {
    this.loading = true;
    this.loginLabel = 'Signing In';
    this.authService.login(username, password).subscribe(
      success => {
        this.router.navigate(['dashboard']); },
      error => {
        this.loading = false;
        this.loginLabel = 'Sign in';
        this.error = error;
      },
    );
  }

}

