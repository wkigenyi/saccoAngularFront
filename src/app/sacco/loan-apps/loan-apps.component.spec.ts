import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanAppsComponent } from './loan-apps.component';

describe('LoanAppsComponent', () => {
  let component: LoanAppsComponent;
  let fixture: ComponentFixture<LoanAppsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanAppsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanAppsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
