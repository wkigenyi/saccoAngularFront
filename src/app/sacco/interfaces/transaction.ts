import { Account } from './account';
import { Member } from './member';

export interface Transaction {
  id: number;
  amount: number;
  date: string;
  details: string;
  debit: Account;
  credit: Account;
  member: Member;
}
