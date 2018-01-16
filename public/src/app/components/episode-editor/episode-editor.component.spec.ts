import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EpisodeEditorComponent } from './episode-editor.component';

describe('EpisodeEditorComponent', () => {
  let component: EpisodeEditorComponent;
  let fixture: ComponentFixture<EpisodeEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EpisodeEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EpisodeEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
