import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {AccordionComponent} from './accordion.component';
import {AccordionToolbarComponent} from './accordion-toolbar.component';
import {AccordionModule} from './accordion.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {Component} from '@angular/core';
import {By} from '@angular/platform-browser';

@Component({
    template: `
        <hc-accordion
            [triggerAlign]="alignVal"
            [hideToolbar]="hideVal"
            [toolbarTrigger]="triggerVal"
            [(open)]="openVal"
            (openStart)="onOpenStart($event)"
            (opened)="onOpen($event)"
            (closeStart)="onCloseStart($event)"
            (closed)="onClosed($event)"
        >
            <hc-accordion-toolbar>Toolbar</hc-accordion-toolbar>
            Content
        </hc-accordion>
    `
})
export class TestAccordionComponent {
    alignVal = 'left';
    hideVal = false;
    triggerVal = true;
    openVal = false;

    onOpenStart: (event?: Event) => void = () => {
        // do nothing
    };
    onOpen: (event?: Event) => void = () => {
        // do nothing
    };
    onCloseStart: (event?: Event) => void = () => {
        // do nothing
    };
    onClosed: (event?: Event) => void = () => {
        // do nothing
    };
}

describe('AccordionComponent', () => {
    let component: TestAccordionComponent;
    let fixture: ComponentFixture<TestAccordionComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TestAccordionComponent],
            imports: [AccordionModule, NoopAnimationsModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestAccordionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should open the accordion when the open value is changed programtically', () => {
        const accordionComponent = fixture.debugElement.query(By.directive(AccordionComponent));
        expect(accordionComponent.nativeElement.classList.contains('hc-accordion-opened')).toBe(false);

        component.openVal = true;
        fixture.detectChanges();

        expect(accordionComponent.nativeElement.classList.contains('hc-accordion-opened')).toBe(true);
    });

    it('should emit open events when the accordion open animation is complete', () => {
        const accordionComponent = fixture.debugElement.query(By.directive(AccordionComponent));
        spyOn(component, 'onOpen');
        spyOn(component, 'onOpenStart');

        accordionComponent.componentInstance.toggleOpen();
        fixture.detectChanges();

        return fixture.whenStable().then(() => {
            expect(component.onOpenStart).toHaveBeenCalledTimes(1);
            expect(component.onOpen).toHaveBeenCalledTimes(1);
        });
    });

    it('should emit closed events when the accordion close animation is complete', () => {
        const accordionComponent = fixture.debugElement.query(By.directive(AccordionComponent));
        spyOn(component, 'onClosed');
        spyOn(component, 'onCloseStart');

        component.openVal = true;
        fixture.detectChanges();
        accordionComponent.componentInstance.toggleClose();
        fixture.detectChanges();

        return fixture.whenStable().then(() => {
            expect(component.onCloseStart).toHaveBeenCalledTimes(1);
            expect(component.onClosed).toHaveBeenCalledTimes(1);
        });
    });

    it('should update two-way binding of the open property after calling the toggle() function', () => {
        const accordionComponent = fixture.debugElement.query(By.directive(AccordionComponent));
        accordionComponent.componentInstance.toggle();
        fixture.detectChanges();

        expect(component.openVal).toBe(true);
    });

    it('should hide the toolbar when hideToolbar is toggled', () => {
        let toolbarComponent = fixture.debugElement.queryAll(By.directive(AccordionToolbarComponent));
        expect(toolbarComponent.length).toBe(1);

        component.hideVal = true;
        fixture.detectChanges();

        toolbarComponent = fixture.debugElement.queryAll(By.directive(AccordionToolbarComponent));
        expect(toolbarComponent.length).toBe(0);
    });

    it('should adjust the dropdown arrow position when triggerAlign is set', () => {
        let wrapperDiv = fixture.debugElement.query(By.css('div'));
        expect(wrapperDiv.nativeElement.classList.contains('hc-align-right')).toBe(false);

        component.alignVal = 'right';
        fixture.detectChanges();

        wrapperDiv = fixture.debugElement.query(By.css('div'));
        expect(wrapperDiv.nativeElement.classList.contains('hc-align-right')).toBe(true);
    });

    it('should not open with a click on the toolbar if toolbarTrigger is false', () => {
        component.triggerVal = false;
        fixture.detectChanges();

        const toolbarComponent = fixture.debugElement.query(By.directive(AccordionToolbarComponent));
        toolbarComponent.nativeElement.click();

        expect(component.openVal).toBe(false);
    });
});
