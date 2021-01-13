/* tslint:disable:component-class-suffix */

import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';

import {SplitButtonComponent} from './split-button.component';
import {ButtonModule} from '../button.module';
import {Component, DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {MenuItemDirective} from '../../pop/directives/menu-item.directive';

describe('SplitButtonComponent', () => {
    let fixture: ComponentFixture<any>;
    let splitButtonDebugElement: DebugElement;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [ButtonModule],
            declarations: [TestComponent]
        }).compileComponents();
    }));

    describe('basic behaviors', () => {
        let testComponent: TestComponent;
        let triggerButton: HTMLButtonElement;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestComponent);
            fixture.detectChanges();

            testComponent = fixture.debugElement.componentInstance;
            splitButtonDebugElement = fixture.debugElement.query(By.directive(SplitButtonComponent));
            triggerButton = splitButtonDebugElement.query(By.css('.hc-split-button-toggle')).nativeElement;
        });

        xit('should not trigger primary button click when a menu item is clicked', () => {
            expect(testComponent.isPrimaryClicked).toBe(false);
            expect(testComponent.isMenuItemClicked).toBe(false);

            triggerButton.click();
            fixture.detectChanges();

            let buttonItems = fixture.debugElement.queryAll(By.directive(MenuItemDirective));
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
            <div hcMenuItem (click)="menuItemClick()">Menu Item</div>
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
