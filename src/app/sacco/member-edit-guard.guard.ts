import { Injectable } from '@angular/core';
import { UrlTree, CanDeactivate } from '@angular/router';
import { MemberDetailComponent } from './member-detail/member-detail.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemberEditGuardGuard implements CanDeactivate<MemberDetailComponent> {
  canDeactivate(component: MemberDetailComponent): boolean | Promise<boolean> | Observable<boolean> {
    if (component.memberForm.dirty) {
      const memberName = component.memberForm.get('sur_name').value || 'New Member';
      return confirm(`Discard Charges to ${memberName}?`);

    }
  }
}
