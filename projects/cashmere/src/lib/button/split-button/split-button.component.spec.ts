import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';

import {SplitButtonComponent} from './split-button.component';
import {ButtonModule} from '../button.module';
import {Component, DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {MenuItemDirective} from '../../pop/directives/menu-item.directive';

describe('SplitButtonComponent', () => {
    let fixture: ComponentFixture<unknown>;
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
