import {TabComponent} from './tab.component';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import { TabsService } from '../tabs.service';

describe('TabComponent', () => {

    let component: TabComponent;
    let fixture: ComponentFixture<TabComponent>;
    let tabsService: TabsService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [TabComponent],
            providers: [TabsService]
        }).compileComponents();

        fixture = TestBed.createComponent(TabComponent);
        component = fixture.componentInstance;
        tabsService = fixture.debugElement.injector.get(TabsService);

        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('ngOnInit', () => {
        it('sets direction to value from TabsService', () => {
            tabsService.direction = 'vertical';
            component.ngOnInit();

            expect(component._direction).toEqual(tabsService.direction);
        });
    });
});