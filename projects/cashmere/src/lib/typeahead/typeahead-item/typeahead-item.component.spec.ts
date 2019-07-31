import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeaheadItemComponent } from './typeahead-item.component';

describe('TypeaheadItemComponent', () => {
  let component: TypeaheadItemComponent;
  let fixture: ComponentFixture<TypeaheadItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeaheadItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeaheadItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
