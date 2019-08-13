import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerUserDetailComponent } from './customer-user-detail.component';

describe('CustomerUserDetailComponent', () => {
  let component: CustomerUserDetailComponent;
  let fixture: ComponentFixture<CustomerUserDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerUserDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerUserDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
