import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkrillSettingComponent } from './skrill-setting.component';

describe('SkrillSettingComponent', () => {
  let component: SkrillSettingComponent;
  let fixture: ComponentFixture<SkrillSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkrillSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkrillSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
