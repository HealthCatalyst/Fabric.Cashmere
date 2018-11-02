import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppSwitcherLinksComponent } from './app-switcher-links.component';
import { APP_SWITCHER_SERVICE, MockAppSwitcherService } from '../app-switcher-interfaces';

describe('AppSwitcherApplicationLinkComponent', () => {
  let component: AppSwitcherLinksComponent;
  let fixture: ComponentFixture<AppSwitcherLinksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppSwitcherLinksComponent ],
      providers: [
        {
            provide: APP_SWITCHER_SERVICE,
            useClass: MockAppSwitcherService
        }
    ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppSwitcherLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
