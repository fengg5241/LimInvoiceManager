import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StripeSettingComponent } from './stripe-setting.component';

describe('StripeSettingComponent', () => {
  let component: StripeSettingComponent;
  let fixture: ComponentFixture<StripeSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StripeSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StripeSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
