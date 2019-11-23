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
    // get the data from the route
    const resolvedTransactions = this.route.snapshot.data['resolvedData'];
    this.transactions = resolvedTransactions.transactions;
    const resolvedMember = this.route.snapshot.data['member'];
    this.member = resolvedMember.member;
    this.displayMember( this.member );
  }

  getMember(id: number): void {
    this.apiService.getMember(id).subscribe({
      next: member => this.displayMember(member),
      // error: err => this.errorMessage = err
    });
  }

  displayMember(member: Member): void {

    if ( this.member.id === 0) {
      this.heading = 'All Transactions';
    } else {
      this.heading = member.sur_name + ' ' + member.first_name;
    }
  }
}
