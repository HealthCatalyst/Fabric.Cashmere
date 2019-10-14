import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvironmentRibbonComponent } from './environment-ribbon.component';

describe('EnvironmentRibbonComponent', () => {
  let component: EnvironmentRibbonComponent;
  let fixture: ComponentFixture<EnvironmentRibbonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnvironmentRibbonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnvironmentRibbonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
