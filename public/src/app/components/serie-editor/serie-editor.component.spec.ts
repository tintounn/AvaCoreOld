import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SerieEditorComponent } from './serie-editor.component';

describe('SerieEditorComponent', () => {
  let component: SerieEditorComponent;
  let fixture: ComponentFixture<SerieEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SerieEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SerieEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
