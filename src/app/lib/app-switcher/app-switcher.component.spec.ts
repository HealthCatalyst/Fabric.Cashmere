import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppSwitcherComponent } from './app-switcher.component';

describe('AppSwitcherComponent', () => {
  let component: AppSwitcherComponent;
  let fixture: ComponentFixture<AppSwitcherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppSwitcherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppSwitcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
