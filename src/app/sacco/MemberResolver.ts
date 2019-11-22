import { Injectable } from '@angular/core';
import { ResolvedMember } from './interfaces/member';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ApiService } from '../api.service';
import { map, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class MemberResolver implements Resolve<ResolvedMember> {
  constructor(private apiService: ApiService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ResolvedMember> {
    const id = +route.paramMap.get('id');
    return this.apiService.getMember(id).pipe(map(member => ({ member: member })), catchError(error => {
      const message = `Retrieval error: ${error}`;
      console.error(message);
      return of({ member: null, error: error });
    }));
  }
}
