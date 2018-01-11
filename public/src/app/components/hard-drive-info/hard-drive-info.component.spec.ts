import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HardDriveInfoComponent } from './hard-drive-info.component';

describe('HardDriveInfoComponent', () => {
  let component: HardDriveInfoComponent;
  let fixture: ComponentFixture<HardDriveInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HardDriveInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HardDriveInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
