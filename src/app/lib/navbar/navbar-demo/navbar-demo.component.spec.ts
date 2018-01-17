import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarDemoComponent } from './navbar-demo.component';
import { NavbarComponent } from 'app/lib/navbar/navbar.component';

describe('NavbarDemoComponent', () => {
  let component: NavbarDemoComponent;
  let fixture: ComponentFixture<NavbarDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarDemoComponent, NavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
