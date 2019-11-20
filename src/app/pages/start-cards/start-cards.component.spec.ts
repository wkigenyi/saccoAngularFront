import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartCardsComponent } from './start-cards.component';

describe('StartCardsComponent', () => {
  let component: StartCardsComponent;
  let fixture: ComponentFixture<StartCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
