import { TabComponent } from './tab.component';
import { TabSetComponent } from './tab-set.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('TabSetComponent', () => {
    let component: TabSetComponent;
    let fixture: ComponentFixture<TabSetComponent>;

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                imports: [RouterTestingModule],
                declarations: [
                    TabSetComponent,
                    TabComponent
                ]
            })
                .compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(TabSetComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
