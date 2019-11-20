import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { ActivatedRoute } from '@angular/router';
import { Member } from '../interfaces/member';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  transactions: any[];
  member: Member;
  heading: string;
  constructor(private apiService: ApiService, private route: ActivatedRoute) { }

  ngOnInit() {
    // get the member id from the route
    this.route.paramMap.subscribe(
      params => {
        const id = +params.get('memberid');
        if ( id === 0 ) {

        } else {
          this.getMember(id);
          this.apiService.getTransactions().subscribe(
            transactions => this.transactions = transactions.filter(
              (t: any) => t.member.id === id)
          );
        }

      }
    );
  }

  getMember(id: number): void {
    this.apiService.getMember(id).subscribe({
      next: member => this.displayMember(member),
      // error: err => this.errorMessage = err
    });
  }

  displayMember(member: Member): void {

    this.member = member;
    if ( this.member.id === 0) {
      this.heading = 'All Transactions';
    } else {
      this.heading = member.sur_name + ' ' + member.first_name;
    }
    console.log('Tufunye Member: ' + member.id);
  }
}
