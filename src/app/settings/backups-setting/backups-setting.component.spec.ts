import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackupsSettingComponent } from './backups-setting.component';

describe('BackupsSettingComponent', () => {
  let component: BackupsSettingComponent;
  let fixture: ComponentFixture<BackupsSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackupsSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackupsSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
