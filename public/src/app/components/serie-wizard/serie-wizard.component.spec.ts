import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SerieWizardComponent } from './serie-wizard.component';

describe('SerieWizardComponent', () => {
  let component: SerieWizardComponent;
  let fixture: ComponentFixture<SerieWizardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SerieWizardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SerieWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
