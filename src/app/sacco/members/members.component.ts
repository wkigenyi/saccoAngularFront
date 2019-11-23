import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Member } from '../interfaces/member';
import { slideInAnimation } from 'src/app/app.animation';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss'],
  animations: [slideInAnimation]
})
export class MembersComponent implements OnInit {

  members: Member[];
  filteredMembers: Member[];
  _listFilter = '';
  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  get listFilter() {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredMembers = this._listFilter ? this.performFilter(this._listFilter) : this.members;

  }
  ngOnInit() {
    // this.getMembers();
    const resolvedData = this.route.snapshot.data['resolvedData'];
    //console.log(resolvedData);
    this.members = resolvedData.members;
    this.filteredMembers = this.members;
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
