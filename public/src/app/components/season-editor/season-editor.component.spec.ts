import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeasonEditorComponent } from './season-editor.component';

describe('SeasonEditorComponent', () => {
  let component: SeasonEditorComponent;
  let fixture: ComponentFixture<SeasonEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeasonEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeasonEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
