import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaypalSettingComponent } from './paypal-setting.component';

describe('PaypalSettingComponent', () => {
  let component: PaypalSettingComponent;
  let fixture: ComponentFixture<PaypalSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaypalSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaypalSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
