import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstanceSwitcherComponent } from './instance-switcher.component';

describe('InstanceSwitcherComponent', () => {
  let component: InstanceSwitcherComponent;
  let fixture: ComponentFixture<InstanceSwitcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstanceSwitcherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstanceSwitcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
