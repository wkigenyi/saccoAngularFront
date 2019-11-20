import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Member } from '../interfaces/member';


@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {

  members: Member[];
  filteredMembers: Member[];
  apiRoot = 'http://localhost:8000/api';
  _listFilter = '';
  constructor(private apiService: ApiService) {}

  get listFilter() {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredMembers = this._listFilter ? this.performFilter(this._listFilter) : this.members;

  }
  ngOnInit() {
    this.getMembers();
  }

  getMembers() {
    this.apiService.getMembers().subscribe(
      members => {
        this.members = members;
        this.filteredMembers = members;
      }
    );
  }

  performFilter(filterBy: string): Member[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.members.filter(
      (member: Member) =>
        member.sur_name.toLocaleLowerCase().indexOf(filterBy) !== -1 ||
        member.first_name.toLocaleLowerCase().indexOf(filterBy) !== -1
      );
  }

}
