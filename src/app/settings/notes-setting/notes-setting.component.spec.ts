import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesSettingComponent } from './notes-setting.component';

describe('NotesSettingComponent', () => {
  let component: NotesSettingComponent;
  let fixture: ComponentFixture<NotesSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotesSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
