import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleEmailModalComponent } from './sale-email-modal.component';

describe('SaleEmailModalComponent', () => {
  let component: SaleEmailModalComponent;
  let fixture: ComponentFixture<SaleEmailModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaleEmailModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleEmailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
