/* tslint:disable:no-use-before-declare component-class-suffix */

import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SplitButtonComponent} from './split-button.component';
import {ButtonModule} from '../button.module';
import {Component, DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {ButtonItemDirective} from './button-item.directive';

describe('SplitButtonComponent', () => {
    let fixture: ComponentFixture<any>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ButtonModule],
            declarations: [TestComponent]
        }).compileComponents();
    }));

    describe('basic behaviors', () => {
        let testComponent: TestComponent;
        let splitButtonDebugElement: DebugElement;
        let splitButtonNative: HTMLElement;
        let triggerButton: HTMLButtonElement;
        let buttonItems: DebugElement[];

        beforeEach(() => {
            fixture = TestBed.createComponent(TestComponent);
            fixture.detectChanges();

            testComponent = fixture.debugElement.componentInstance;
            splitButtonDebugElement = fixture.debugElement.query(By.directive(SplitButtonComponent));
            splitButtonNative = splitButtonDebugElement.nativeElement;
            buttonItems = splitButtonDebugElement.queryAll(By.directive(ButtonItemDirective));
            triggerButton = splitButtonDebugElement.query(By.css('.hc-split-button-toggle')).nativeElement;
        });

        it('should not trigger primary button click when menu item is clicked', () => {
            expect(testComponent.isPrimaryClicked).toBe(false);
            expect(testComponent.isMenuItemClicked).toBe(false);

            triggerButton.click();
            fixture.detectChanges();

            buttonItems[0].nativeElement.click();
            fixture.detectChanges();

            expect(testComponent.isPrimaryClicked).toBe(false);
            expect(testComponent.isMenuItemClicked).toBe(true);
        });
    });
});

@Component({
    template: `
        <hc-split-button (click)="primaryButtonClick()">
            Button Text
            <div hcButtonItem (click)="menuItemClick()">Menu Item</div>
        </hc-split-button>
    `
})
class TestComponent {
    isPrimaryClicked = false;
    isMenuItemClicked = false;

    primaryButtonClick() {
        this.isPrimaryClicked = true;
    }

    menuItemClick() {
        this.isMenuItemClicked = true;
    }
}
