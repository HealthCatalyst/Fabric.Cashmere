import { TabSetComponent } from './tab-set.component';
import { TabComponent } from './tab.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

describe('TabSetComponent', () => {
    let component: TabSetComponent;
    let fixture: ComponentFixture<TabSetComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                TabSetComponent,
                TabComponent
            ],
            imports: []
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TabSetComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
