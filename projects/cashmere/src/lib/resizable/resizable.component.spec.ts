import { DragDropModule } from '@angular/cdk/drag-drop';
import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ResizableComponent } from './resizable.component';
import { ResizableMetadata as Meta } from './resizable.meta';

@Component({
    template: `
        <div hc-resizable isResizable="isResizable" position="position">
            <p>
                Sed eget porttitor velit. Ut ac efficitur ligula. Aliquam erat volutpat. Donec quis varius ipsum. Etiam
                justo eros, vestibulum sit amet metus ut, sodales tincidunt velit. Cras feugiat vulputate urna sed
                mollis. eleifend.
            </p>
        </div>
    `
})
export class ResizableHostComponent {
    isResizable = true;
    position: string;
}

const componentHasClass = (fixture: DebugElement, testClass: string) => {
    return (fixture.nativeElement as HTMLElement).classList.contains(testClass);
};

const getComponent = <T>(fixture: ComponentFixture<T>, className: string): DebugElement => {
    return getDebugElement(fixture.debugElement, className);
};

const getComponentAttribute = (fixture: DebugElement, attribute: string) => {
    return (fixture.nativeElement as HTMLElement).getAttribute(attribute);
};

const getDebugElement = (element: DebugElement, className: string) => {
    return element.query(By.css(className));
};

describe('ResizableComponent', () => {
    let component: ResizableHostComponent;
    let fixture: ComponentFixture<ResizableHostComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
    declarations: [ResizableComponent, ResizableHostComponent],
    imports: [BrowserAnimationsModule, DragDropModule],
    teardown: { destroyAfterEach: false }
}).compileComponents();
    });

    beforeEach(
        waitForAsync(() => {
            fixture = TestBed.createComponent(ResizableHostComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        })
    );

    it('should create the component', () => {
        const resizable = getComponent(fixture, 'div > div');

        expect(resizable).not.toBeNull();
    });

    it('should set right position', () => {
        component.position = 'right';
        fixture.detectChanges();

        const resizable = getComponent(fixture, 'div > div');
        const attributeAllowTag = getComponentAttribute(resizable, 'ng-reflect-position');

        const hasClass = componentHasClass(resizable, Meta.maxWidthClass);

        expect(attributeAllowTag).toEqual('right');
        expect(hasClass).toEqual(true);
    });

    it('should set left position', () => {
        component.position = 'left';
        fixture.detectChanges();

        const resizable = getComponent(fixture, 'div > div');
        const attributeAllowTag = getComponentAttribute(resizable, 'ng-reflect-position');

        const hasClass = componentHasClass(resizable, Meta.maxWidthClass);

        expect(attributeAllowTag).toEqual('left');
        expect(hasClass).toEqual(true);
    });

    it('should set top position', () => {
        component.position = 'top';
        fixture.detectChanges();

        const resizable = getComponent(fixture, 'div > div');
        const attributeAllowTag = getComponentAttribute(resizable, 'ng-reflect-position');

        const hasClass = componentHasClass(resizable, Meta.maxHeigthClass);

        expect(attributeAllowTag).toEqual('top');
        expect(hasClass).toEqual(true);
    });

    it('should set bottom position', () => {
        component.position = 'bottom';
        fixture.detectChanges();

        const resizable = getComponent(fixture, 'div > div');
        const attributeAllowTag = getComponentAttribute(resizable, 'ng-reflect-position');

        const hasClass = componentHasClass(resizable, Meta.maxHeigthClass);

        expect(attributeAllowTag).toEqual('bottom');
        expect(hasClass).toEqual(true);
    });

    it('should add class for right position', () => {
        component.position = 'right';
        fixture.detectChanges();

        const resizable = getComponent(fixture, 'div > div > div');
        const attributeAllowTag = getComponentAttribute(resizable, 'class');

        expect(attributeAllowTag).toContain('resizable-handle-right');
    });

    it('should add class for left position', () => {
        component.position = 'left';
        fixture.detectChanges();

        const resizable = getComponent(fixture, 'div > div > div');
        const attributeAllowTag = getComponentAttribute(resizable, 'class');

        expect(attributeAllowTag).toContain('resizable-handle-left');
    });

    it('should add class for top position', () => {
        component.position = 'top';
        fixture.detectChanges();

        const resizable = getComponent(fixture, 'div > div > div');
        const attributeAllowTag = getComponentAttribute(resizable, 'class');

        expect(attributeAllowTag).toContain('resizable-handle-top');
    });

    it('should add class for bottom position', () => {
        component.position = 'bottom';
        fixture.detectChanges();

        const resizable = getComponent(fixture, 'div > div > div');
        const attributeAllowTag = getComponentAttribute(resizable, 'class');

        expect(attributeAllowTag).toContain('resizable-handle-bottom');
    });

    it('should be null if left position and isResizable is false', () => {
        component.position = 'left';
        component.isResizable = false;
        fixture.detectChanges();

        const resizable = getComponent(fixture, 'div > div > div');

        expect(resizable).toBeNull();
    });

    it('should be null if right position and isResizable is false', () => {
        component.position = 'right';
        component.isResizable = false;
        fixture.detectChanges();

        const resizable = getComponent(fixture, 'div > div > div');

        expect(resizable).toBeNull();
    });

    it('should be null if top position and isResizable is false', () => {
        component.position = 'top';
        component.isResizable = false;
        fixture.detectChanges();

        const resizable = getComponent(fixture, 'div > div > div');

        expect(resizable).toBeNull();
    });

    it('should be null if bottom position and isResizable is false', () => {
        component.position = 'bottom';
        component.isResizable = false;
        fixture.detectChanges();

        const resizable = getComponent(fixture, 'div > div > div');

        expect(resizable).toBeNull();
    });
});
