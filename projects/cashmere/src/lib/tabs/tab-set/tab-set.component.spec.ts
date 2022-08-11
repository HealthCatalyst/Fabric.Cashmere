import {TabComponent} from '../tab/tab.component';
import {TabSetComponent, TabChangeEvent} from './tab-set.component';
import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {Component, ViewChild} from '@angular/core';
import {By} from '@angular/platform-browser';
import {TabsModule} from '../tabs.module';

const expectedDirection = 'horizontal';

@Component({
    template: `
        <hc-tab-set direction="${expectedDirection}">
            <hc-tab tabTitle="Tab 1">
                <div>Content 1</div>
            </hc-tab>
            <hc-tab tabTitle="Tab 2">
                <div>Content 2</div>
            </hc-tab>
            <hc-tab tabTitle="Tab 3">
                <div>Content 3</div>
            </hc-tab>
        </hc-tab-set>
    `
})
export class TestTabSetComponent {
    @ViewChild(TabSetComponent)
    public tabsetComponent: TabSetComponent;
}

describe('TabSetComponent', () => {
    let component: TabSetComponent;
    let testHostComponent: TestTabSetComponent;
    let fixture: ComponentFixture<TestTabSetComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule, TabsModule],
            declarations: [TabSetComponent, TabComponent, TestTabSetComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestTabSetComponent);
        testHostComponent = fixture.componentInstance;
        component = <TabSetComponent>fixture.debugElement.query(By.directive(TabSetComponent)).componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should reference its children', () => {
        expect(component._tabs.length).toBe(3);
        component._tabs.forEach((t, i) => expect(t.tabTitle).toBe(`Tab ${i + 1}`));
    });

    describe('direction', () => {
        it('should be set from input', () => {
            expect(component.direction).toBe(expectedDirection);
        });

        it('should be set for all children from parent input after second change detection cycle', (done) => {
            setTimeout(() => {
                fixture.detectChanges();
                component._tabs.forEach(t => expect(t._direction).toBe(expectedDirection));
                done();
            });
        });

        it('should throw for unsupported direction', () => {
            const invalidDirection = 'North';
            expect(() => (component.direction = invalidDirection)).toThrow(
                new Error(`Unsupported tab direction value: ${invalidDirection}`)
            );
        });
    });

    describe('tabClick', () => {
        it('should set clicked tab to active and other tabs to inactive', () => {
            component._tabs.forEach(t => (t._active = true));
            component._tabs.last.tabClick.emit();

            expect(component._tabs.last._active).toBeTruthy();
            component._tabs
                .toArray()
                .slice(0, 2)
                .forEach(t => expect(t._active).toBeFalsy());
        });

        it("should set content to clicked tab's content", () => {
            component.tabContent = component._tabs.last.tabContent;
            component._tabs.first.tabClick.emit();

            expect(component.tabContent).toEqual(component._tabs.first.tabContent);
        });

        it('should trigger selectedTabChange event', (done: () => void) => {
            const expectedIndex = 0;
            const expectedTab: TabComponent = component._tabs.first;
            component.selectedTabChange.subscribe((e: TabChangeEvent) => {
                expect(e.index).toEqual(expectedIndex);
                expect(e.tab).toEqual(expectedTab);
                done();
            });

            expectedTab.tabClick.emit();
        });
    });

    describe('on calling _collectTabWidths', () => {
        it('should collect the widths of the links', () => {
            const tab = fixture.debugElement.queryAll(By.css('.hc-tab'));
            spyOnProperty(tab[0].nativeElement, 'scrollWidth', 'get').and.returnValue(2400);
            spyOnProperty(tab[1].nativeElement, 'scrollWidth', 'get').and.returnValue(3400);
            spyOnProperty(tab[2].nativeElement, 'scrollWidth', 'get').and.returnValue(4400);
            expect(testHostComponent.tabsetComponent._tabs['_results'][0]._getWidth()).toEqual(2400);
            expect(testHostComponent.tabsetComponent._tabs['_results'][1]._getWidth()).toEqual(3400);
            expect(testHostComponent.tabsetComponent._tabs['_results'][2]._getWidth()).toEqual(4400);
            testHostComponent.tabsetComponent['_collectTabWidths']();
            expect(testHostComponent.tabsetComponent['_tabsTotalWidth']).toEqual(10200);
            expect(testHostComponent.tabsetComponent['_tabWidths'].length).toEqual(3);
            expect(testHostComponent.tabsetComponent['_tabWidths'][0]).toEqual(2400);
            expect(testHostComponent.tabsetComponent['_tabWidths'][1]).toEqual(3400);
            expect(testHostComponent.tabsetComponent['_tabWidths'][2]).toEqual(4400);
        });
    });

    describe('on calling refreshTabWidths', () => {
        describe('and adjust the elements according to the tab bar size', () => {
            it('should have nothing in moreList if hc-tab-bar-horizontal > tabsTotalWidth', () => {
                const tabContainer = fixture.debugElement.query(By.css('.hc-tab-bar-horizontal'));
                spyOnProperty(tabContainer.nativeElement, 'offsetWidth', 'get').and.returnValue(400);

                const link = fixture.debugElement.queryAll(By.css('.hc-tab'));
                spyOnProperty(link[0].nativeElement, 'scrollWidth', 'get').and.returnValue(110);
                spyOnProperty(link[1].nativeElement, 'scrollWidth', 'get').and.returnValue(110);
                spyOnProperty(link[2].nativeElement, 'scrollWidth', 'get').and.returnValue(110);

                testHostComponent.tabsetComponent['_collectTabWidths']();
                testHostComponent.tabsetComponent.refreshTabWidths();

                expect(tabContainer.nativeElement['offsetWidth']).toEqual(400);
                expect(testHostComponent.tabsetComponent['_tabsTotalWidth']).toEqual(330);
                expect(testHostComponent.tabsetComponent._moreList.length).toEqual(0);
                expect(testHostComponent.tabsetComponent['_collapse']).toBeFalsy();
            });
            it('should have two items in moreList if hc-tab-bar-horizontal is 50px', () => {
                const linkContainer = fixture.debugElement.query(By.css('.hc-tab-bar-horizontal'));
                spyOnProperty(linkContainer.nativeElement, 'offsetWidth', 'get').and.returnValue(50);

                const link = fixture.debugElement.queryAll(By.css('.hc-tab'));
                spyOnProperty(link[0].nativeElement, 'scrollWidth', 'get').and.returnValue(110);
                spyOnProperty(link[1].nativeElement, 'scrollWidth', 'get').and.returnValue(110);
                spyOnProperty(link[2].nativeElement, 'scrollWidth', 'get').and.returnValue(110);

                testHostComponent.tabsetComponent['_collectTabWidths']();
                testHostComponent.tabsetComponent.refreshTabWidths();

                expect(linkContainer.nativeElement['offsetWidth']).toEqual(50);
                expect(testHostComponent.tabsetComponent['_tabsTotalWidth']).toEqual(330);
                expect(testHostComponent.tabsetComponent._moreList.length).toEqual(3);
                expect(testHostComponent.tabsetComponent['_collapse']).toBeTruthy();
            });
        });
    });
});
