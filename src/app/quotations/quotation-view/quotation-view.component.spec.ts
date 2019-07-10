import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationView } from './quotation-view.component';

describe('QuotationView', () => {
  let component: QuotationView;
  let fixture: ComponentFixture<QuotationView>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuotationView ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotationView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
