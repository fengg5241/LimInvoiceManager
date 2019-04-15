import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxRateSettingComponent } from './tax-rate-setting.component';

describe('TaxRateSettingComponent', () => {
  let component: TaxRateSettingComponent;
  let fixture: ComponentFixture<TaxRateSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxRateSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxRateSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
