import {TabComponent} from '../tab/tab.component';
import {TabSetComponent, TabChangeEvent} from './tab-set.component';
import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {Component} from '@angular/core';
import {By} from '@angular/platform-browser';

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
export class TestTabSetComponent {}

describe('TabSetComponent', () => {
    let component: TabSetComponent;
    let fixture: ComponentFixture<TestTabSetComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [TabSetComponent, TabComponent, TestTabSetComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestTabSetComponent);
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

        it('should be set for all children from parent input after second change detection cycle', (done: any) => {
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
});
