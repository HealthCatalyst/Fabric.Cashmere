import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopoverListItemComponent } from './popover-list-item.component';

describe('PopoverListItemComponent', () => {
  let component: PopoverListItemComponent;
  let fixture: ComponentFixture<PopoverListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopoverListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopoverListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
