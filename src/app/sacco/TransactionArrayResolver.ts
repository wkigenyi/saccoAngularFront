import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ApiService } from '../api.service';
import { map, catchError } from 'rxjs/operators';
import { ResolvedTransactionsArray } from './interfaces/transaction';


@Injectable({
  providedIn: 'root'
})
export class MemberTransactionArrayResolver implements Resolve<ResolvedTransactionsArray> {
  constructor(private apiService: ApiService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ResolvedTransactionsArray> {
    const id = +route.paramMap.get('memberid');
    return this.apiService.getMemberTransactions(id)
    .pipe(map(transactions => ({ transactions: transactions, error: null })), catchError(error => {
      const message = `Retrieval error: ${error}`;
      console.error(message);
      return of({ transactions: null, error: error });
    }));
  }
}
