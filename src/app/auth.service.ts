import { Injectable } from '@angular/core';
import * as moment from 'moment';
import * as jwtDecode from 'jwt-decode';
import { HttpClient, HttpInterceptor, HttpRequest, HttpEvent, HttpHandler } from '@angular/common/http';
import {tap, shareReplay} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CanActivate, Router } from '@angular/router';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  payLoad: JWTPayload;
  private apiRoot = 'https://secret-citadel-66262.herokuapp.com/auth/';
  constructor( private httpClient: HttpClient) { }

  private setSession(authResult) {
    const token = authResult.token;
    const payload = jwtDecode(token) as JWTPayload;
    this.payLoad = payload;
    console.log(payload);
    const expiresAt = moment.unix(payload.exp);

    localStorage.setItem('token', token);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }

  get token(): string {
    return localStorage.getItem('token');
  }

  get user(): string {
    return this.payLoad.email;
  }

  login(username: string, password: string) {
    return this.httpClient.post(this.apiRoot.concat('login/'), {username, password}).pipe(
      tap(
        response => this.setSession(response)
      ),
      shareReplay()
    );
  }

  signup(username: string, password: string, password2: string) {
    // TODO
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('expires_at');
  }

  refreshToken() {
    if (moment().isBetween(this.getExpiration().subtract(1, 'days'), this.getExpiration())) {
      return this.httpClient.post(
        this.apiRoot.concat('refresh_token/'),
        { token: this.token }
      ).pipe(
        tap(response => this.setSession(response)),
        shareReplay(),
      ).subscribe();
    }
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);

    return moment(expiresAt);
  }

  isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }
}

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');

    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', 'JWT '.concat(token))
      });

      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate() {
    if (this.authService.isLoggedIn()) {
      this.authService.refreshToken();

      return true;
    } else {
      this.authService.logout();
      this.router.navigate(['login']);

      return false;
    }
  }
}

interface JWTPayload {
  user_id: number;
  username: string;
  first_name: string;
  last_name: string;
  is_staff: boolean;
  is_admin: boolean;
  email: string;
  exp: number;
}
