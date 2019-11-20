import { TestBed, async, inject } from '@angular/core/testing';

import { MemberEditGuardGuard } from './member-edit-guard.guard';

describe('MemberEditGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MemberEditGuardGuard]
    });
  });

  it('should ...', inject([MemberEditGuardGuard], (guard: MemberEditGuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
