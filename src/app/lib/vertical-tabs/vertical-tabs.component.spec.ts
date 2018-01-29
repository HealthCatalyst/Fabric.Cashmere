import { VerticalTabsComponent } from './vertical-tabs.component';
import { VerticalTabComponent } from './vertical-tab.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

describe('VerticalTabsComponent', () => {
    let component: VerticalTabsComponent;
    let fixture: ComponentFixture<VerticalTabsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                VerticalTabsComponent,
                VerticalTabComponent
            ],
            imports: []
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(VerticalTabsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
