import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders} from '@angular/common/http';


import { Observable, of } from 'rxjs';
import { Member } from './sacco/interfaces/member';
import { Gender } from './sacco/interfaces/gender';
import { tap, map, catchError } from 'rxjs/operators';
import { Transaction } from './sacco/interfaces/transaction';
import { Account } from './sacco/interfaces/account';



@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiRoot = 'https://secret-citadel-66262.herokuapp.com/api';
  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  constructor(private http: HttpClient) {}

  getMembers(): Observable<Member[]> {
    const apiUrl = `${this.apiRoot}/members/`;
    return this.http.get<Member[]>(apiUrl);

  }
  createMember(member: Member): Observable<Member> {
    const url = `${this.apiRoot}/membercreate/`;
    member.id = null;
    return this.http.post<Member>( url, member, { headers: this.headers } ).pipe(
      tap( data => { console.log('create member: ' + JSON.stringify(data) ); },
      map( () => member)
    ));
  }

  createEntry(trans: Transaction): Observable<Transaction> {
    const url = `${this.apiRoot}/entrycreate/`;
    trans.id = null;
    return this.http.post<Transaction>( url, trans, { headers: this.headers } ).pipe(
      tap( data => { console.log('create entry: ' + JSON.stringify(data) ); },
      map( () => trans)
    ));
  }
  initializeMember(): Member {
    return {
      id: 0,
      date_of_birth: null,
      date_of_departure: null,
      first_name: null,
      sur_name: null,
      gender: null,
      other_names: null,
      identification: null,
      date_of_joining: null,
      email: null,
      telephone: null,
      address: null


    };
  }

  getMember(id: number): Observable<Member> {
    if ( id === 0 ) {
      return of(this.initializeMember());
    } else  {
      const url = `${this.apiRoot}/members/${id}/`;
    return this.http.get<Member>(url, {headers: this.headers})
      .pipe(
        tap( member => { console.log('retrieved member: ' + member.id ); } ),
        // Return the product on an update
        catchError( this.handleError )
      );
    }

  }
  updateMember(member: Member): Observable<Member> {
    const url = `${this.apiRoot}/members/${member.id}/`;
    return this.http.put<Member>(url, member, {headers: this.headers})
      .pipe(
        tap( () => { console.log('update member: ' + member.id ); } ),
        // Return the product on an update
        map( () => member),
      );
  }

  updateEntry(trans: Transaction): Observable<Transaction> {
    const url = `${this.apiRoot}/entries/${trans.id}/`;
    return this.http.put<Transaction>(url, trans, {headers: this.headers})
      .pipe(
        tap( () => { console.log('update entry: ' + trans.id ); } ),
        // Return the product on an update
        map( () => trans),
      );
  }




  getGender(): Observable<Gender[]> {
    const apiUrl = `${this.apiRoot}/gender/`;
    return this.http.get<Gender[]>(apiUrl);

  }

  getAccounts(): Observable<Account[]> {
    const apiUrl = `${this.apiRoot}/accounts/`;
    return this.http.get<Account[]>(apiUrl);

  }

  getTransactions(): Observable<[]> {
    const apiUrl = `${this.apiRoot}/entries/`;
    return this.http.get<[]>(apiUrl);

  }

  getTransaction(id: number, memberid: number): Observable<Transaction> {
    if ( id === 0 ) {
      return of(this.initializeTransaction(memberid));
    } else  {
      const url = `${this.apiRoot}/entries/${id}/`;
    return this.http.get<Transaction>(url, {headers: this.headers})
      .pipe(
        tap( member => { console.log('retrieved transaction: ' + member.id ); } ),
        // Return the product on an update
        catchError( this.handleError )
      );
    }

  }

  initializeTransaction(memberid: number): Transaction {
    return {
      id: 0,
      amount: null,
      date: null,
      details: null,
      debit: null,
      credit: null,
      member: memberid
    };
  }

  getStats(): Observable<any> {
    const apiUrl = `${this.apiRoot}/stats/`;
    return this.http.get<any>(apiUrl);

  }



  private handleError<T>(operation: string, result?: T) {
      return (error: any): Observable<T> => {
      // TODO Send the error to the remote logging infrastructure
      console.error(error);

      // TODO For User Consumption

      this.log(`${operation} failed, ${error.message}`);

      // Let the app keep running by returning an empty array

      return of(result as T);

    };

  }

  private log(message: string) {
    // this.messageService.add(`Hero Service: ${message}`);
  }
}




