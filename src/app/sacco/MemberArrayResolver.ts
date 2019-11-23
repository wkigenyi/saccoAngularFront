import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ApiService } from '../api.service';
import { map, catchError } from 'rxjs/operators';
import { ResolvedMemberArray } from './interfaces/member';

@Injectable({
  providedIn: 'root'
})
export class MemberArrayResolver implements Resolve<ResolvedMemberArray> {
  constructor(private apiService: ApiService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ResolvedMemberArray> {
    return this.apiService.getMembers().pipe(map(members => ({ members: members })), catchError(error => {
      const message = `Retrieval error: ${error}`;
      console.error(message);
      return of({ members: null, error: error });
    }));
  }
}
