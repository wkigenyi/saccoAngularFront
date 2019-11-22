import { Injectable } from '@angular/core';
import { ResolvedMember } from './interfaces/member';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ApiService } from '../api.service';
import { map, catchError } from 'rxjs/operators';
import { ResolvedGender, Gender } from './interfaces/gender';
@Injectable({
  providedIn: 'root'
})
export class GenderResolver implements Resolve<Gender[]> {
  constructor(private apiService: ApiService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Gender[]> {
    return this.apiService.getGender();
  }
}
