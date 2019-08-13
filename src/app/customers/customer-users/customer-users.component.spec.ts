import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerUsersComponent } from './customer-users.component';

describe('CustomerUsersComponent', () => {
  let component: CustomerUsersComponent;
  let fixture: ComponentFixture<CustomerUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
