import { ElementRef, Component, ViewChild, ViewContainerRef } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
    BlockScrollStrategy,
    FlexibleConnectedPositionStrategy,
    OverlayConfig,
    OverlayContainer,
    RepositionScrollStrategy,
    ScrollStrategy,
} from '@angular/cdk/overlay';
import { ESCAPE, A } from '@angular/cdk/keycodes';

import { PopModule } from './popover.module';
import { HcPopComponent } from './popover.component';
import { HcPopoverAnchorDirective } from './popover-anchor.directive';
import { HcPopoverAnchoringService } from './popover-anchoring.service';
import {
    getInvalidPopoverError,
    getUnanchoredPopoverError,
    getInvalidHorizontalAlignError,
    getInvalidVerticalAlignError,
    getInvalidScrollStrategyError,
} from './popover.errors';

/**
 * This component is for testing that passing an invalid popover
 * to an anchor will throw an error.
 */
@Component({
    template: `
      <div [hcPopoverAnchorFor]="invalid">Anchor</div>
      <div #invalid>Dummy</div>
    `
})
class InvalidPopoverTestComponent { }

/**
 * This component is for testing that trying to open/close/toggle
 * a popover with no anchor will throw an error.
 */
@Component({
    template: `
      <hc-pop horizontalAlign="after">Anchorless</hc-pop>
    `
})
class AnchorlessPopoverTestComponent {
    @ViewChild(HcPopComponent) popover: HcPopComponent;
}


/**
 * This component is for testing the default behavior of a simple
 * popover attached to a simple anchor.
 */
@Component({
    template: `
      <div #anchorEl [hcPopoverAnchorFor]="p">Anchor</div>
      <hc-pop #p>Popover</hc-pop>
    `
})
class SimplePopoverTestComponent {
    @ViewChild('anchorEl') anchorElement: ElementRef;
    @ViewChild(HcPopoverAnchorDirective) anchor: HcPopoverAnchorDirective;
    @ViewChild(HcPopComponent) popover: HcPopComponent;
}

/**
 * This component is for testing the backdrop behavior of a simple
 * popover attached to a simple anchor.
 */
@Component({
    template: `
      <div [hcPopoverAnchorFor]="p">Anchor</div>
      <hc-pop #p
          [hasBackdrop]="backdrop"
          [backdropClass]="klass"
          (backdropClicked)="clicks = clicks + 1">
        Popover
      </hc-pop>
    `
})
class BackdropPopoverTestComponent {
    @ViewChild(HcPopComponent) popover: HcPopComponent;
    backdrop = false;
    clicks = 0;
    klass: string;
}

/**
 * This component is for testing behavior related to keyboard events
 * inside the popover.
 */
@Component({
    template: `
      <div [hcPopoverAnchorFor]="p">Anchor</div>
      <hc-pop #p (overlayKeydown)="lastKeyCode = $event.keyCode">
        Popover
        <input type="text" class="first">
        <input type="text" class="second">
      </hc-pop>
    `
})
export class KeyboardPopoverTestComponent {
    @ViewChild(HcPopComponent) popover: HcPopComponent;
    lastKeyCode: number;
}

/**
 * This component is for testing focus behavior in the popover.
 */
@Component({
    template: `
      <button #b1 [hcPopoverAnchorFor]="p" (click)="p.open()">Button 1</button>
      <button #b2>Button 2</button>

      <hc-pop #p
        [autoFocus]="autoFocus"
        [restoreFocus]="restoreFocus">
        <input type="text" class="input">
      </hc-pop>
    `
})
export class FocusPopoverTestComponent {
    restoreFocus = true;
    autoFocus = true;

    @ViewChild('b1') button1: ElementRef;
    @ViewChild('b2') button2: ElementRef;
    @ViewChild('p') popover: HcPopComponent;
}

/** This component is for testing dynamic positioning behavior. */
@Component({
    template: `
      <div [hcPopoverAnchorFor]="p">Anchor</div>
      <hc-pop #p
          [horizontalAlign]="hAlign"
          [verticalAlign]="vAlign"
          [forceAlignment]="forceAlignment"
          [lockAlignment]="lockAlignment">
        Popover
      </hc-pop>
    `
})
export class PositioningTestComponent {
    @ViewChild(HcPopoverAnchorDirective) anchor: HcPopoverAnchorDirective;
    @ViewChild(HcPopComponent) popover: HcPopComponent;
    hAlign = 'center';
    vAlign = 'center';
    forceAlignment = false;
    lockAlignment = false;
}

/** This component is for testing position aliases. */
@Component({
    template: `
      <div [hcPopoverAnchorFor]="p">Anchor</div>
      <hc-pop #p [xAlign]="xAlign" [yAlign]="yAlign">
        Popover
      </hc-pop>
    `
})
export class PositioningAliasTestComponent {
    @ViewChild(HcPopoverAnchorDirective) anchor: HcPopoverAnchorDirective;
    @ViewChild(HcPopComponent) popover: HcPopComponent;
    xAlign = 'center';
    yAlign = 'center';
}

/** This component is for testing scroll behavior. */
@Component({
    template: `
      <div [hcPopoverAnchorFor]="p">Anchor</div>
      <hc-pop #p [scrollStrategy]="strategy">
        Popover
      </hc-pop>
    `
})
export class ScrollingTestComponent {
    @ViewChild(HcPopoverAnchorDirective) anchor: HcPopoverAnchorDirective;
    @ViewChild(HcPopComponent) popover: HcPopComponent;
    strategy = 'reposition';
}

/** This component is for testing the isolated anchoring service. */
@Component({
    template: `
      <div #customAnchor>Anchor</div>
      <hc-pop #p>Popover</hc-pop>
    `,
    providers: [HcPopoverAnchoringService]
})
export class ServiceTestComponent {
    @ViewChild('customAnchor') customAnchor: ElementRef;
    @ViewChild(HcPopComponent) popover: HcPopComponent;

    constructor(
        public anchoring: HcPopoverAnchoringService,
        public container: ViewContainerRef,
    ) { }
}

/** This component is for testing the hover directive behavior. */
@Component({
    template: `
      <div #anchorEl [hcPopoverAnchorFor]="p" [hcPopoverHover]="delay">Anchor</div>
      <hc-pop #p>Popover</hc-pop>
    `
})
export class HoverDirectiveTestComponent {
    @ViewChild('anchorEl') anchorEl: ElementRef;
    @ViewChild(HcPopComponent) popover: HcPopComponent;
    delay = 0;
}

/** This factory function provides an overlay container under test control. */
const overlayContainerFactory = () => {
    const element = document.createElement('div');
    element.classList.add('cdk-overlay-container');
    document.body.appendChild(element);

    // remove body padding to keep consistent cross-browser
    document.body.style.padding = '0';
    document.body.style.margin = '0';

    return { getContainerElement: () => element };
};

export function getActiveElement() {
    return document.activeElement || new HTMLBaseElement();
}


/** Dispatches a keydown event from an element. From angular/material2 */
export function createKeyboardEvent(type: string, keyCode: number, target?: Element, key?: string) {
    const event = document.createEvent('KeyboardEvent') as any;
    // Firefox does not support `initKeyboardEvent`, but supports `initKeyEvent`.
    const initEventFn = (event.initKeyEvent || event.initKeyboardEvent).bind(event);
    const originalPreventDefault = event.preventDefault;

    initEventFn(type, true, true, window, 0, 0, 0, 0, 0, keyCode);

    // Webkit Browsers don't set the keyCode when calling the init function.
    // See related bug https://bugs.webkit.org/show_bug.cgi?id=16735
    Object.defineProperties(event, {
        keyCode: { get: () => keyCode },
        key: { get: () => key },
        target: { get: () => target }
    });

    // IE won't set `defaultPrevented` on synthetic events so we need to do it manually.
    event.preventDefault = function () {
        Object.defineProperty(event, 'defaultPrevented', { get: () => true });
        return originalPreventDefault.apply(this, arguments);
    };

    return event;
}

export function getStrategy(comp): FlexibleConnectedPositionStrategy | null {
    const overlayRef = comp.anchor._anchoring._overlayRef;
    const overlayConfig = overlayRef ? overlayRef.getConfig() : null;
    return overlayConfig ? overlayConfig.positionStrategy : null;
}

export function createMouseEvent(type: string) {
    const event = document.createEvent('MouseEvent');
    event.initMouseEvent(
        type,
        true, // canBubble
        false, // cancelable
        window, // view
        0, // detail
        0, // screenX
        0, // screenY
        0, // clientX
        0, // clientY
        false, // ctrlKey
        false, // altKey
        false, // shiftKey
        false, // metaKey
        0, // button
        null // relatedTarget
    );
    return event;
}

describe('HcPopover', () => {

    describe('passing to anchor', () => {
        let fixture: ComponentFixture<any>;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PopModule],
                declarations: [
                    InvalidPopoverTestComponent,
                    SimplePopoverTestComponent,
                    AnchorlessPopoverTestComponent,
                ]
            });

        });

        it('should throw an error if an invalid object is provided', () => {
            fixture = TestBed.createComponent(InvalidPopoverTestComponent);

            expect(() => {
                fixture.detectChanges();
            }).toThrow(getInvalidPopoverError());
        });

        it('should not throw an error if a valid popover is provided', () => {
            fixture = TestBed.createComponent(SimplePopoverTestComponent);

            expect(() => {
                fixture.detectChanges();
            }).not.toThrowError();
        });

        it('should throw an error if open is called on a popover with no anchor', () => {
            fixture = TestBed.createComponent(AnchorlessPopoverTestComponent);

            // should not throw when just initializing
            expect(() => {
                fixture.detectChanges();
            }).not.toThrowError();

            // should throw if it is opening
            expect(() => {
                fixture.componentInstance.popover.open();
            }).toThrow(getUnanchoredPopoverError());
        });

    });

    describe('opening and closing behavior', () => {
        let fixture: ComponentFixture<SimplePopoverTestComponent>;
        let comp: SimplePopoverTestComponent;
        let overlayContainerElement: HTMLElement;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [
                    PopModule,
                    NoopAnimationsModule,
                ],
                declarations: [SimplePopoverTestComponent],
                providers: [
                    { provide: OverlayContainer, useFactory: overlayContainerFactory }
                ]
            });

            fixture = TestBed.createComponent(SimplePopoverTestComponent);
            comp = fixture.componentInstance;

            overlayContainerElement = fixture.debugElement.injector.get(OverlayContainer)
                .getContainerElement();
        });

        afterEach(() => {
            document.body.removeChild(overlayContainerElement);
        });

        it('should open with open()', () => {
            fixture.detectChanges();
            expect(overlayContainerElement.textContent).toBe('', 'Initially closed');
            comp.popover.open();
            expect(overlayContainerElement.textContent).toContain('Popover', 'Subsequently open');
        });

        it('should open with openPopover()', () => {
            fixture.detectChanges();
            expect(overlayContainerElement.textContent).toBe('', 'Initially closed');
            comp.anchor.openPopover();
            expect(overlayContainerElement.textContent).toContain('Popover', 'Subsequently open');
        });

        it('should close with close()', fakeAsync(() => {
            fixture.detectChanges();
            comp.popover.open();
            expect(overlayContainerElement.textContent).toContain('Popover', 'Initially open');

            comp.popover.close();
            fixture.detectChanges();
            tick();
            expect(overlayContainerElement.textContent).toBe('', 'Subsequently closed');
        }));

        it('should close with closePopover()', fakeAsync(() => {
            fixture.detectChanges();
            comp.anchor.openPopover();
            expect(overlayContainerElement.textContent).toContain('Popover', 'Initially open');

            comp.anchor.closePopover();
            fixture.detectChanges();
            tick();
            expect(overlayContainerElement.textContent).toBe('', 'Subsequently closed');
        }));

        it('should toggle with toggle()', fakeAsync(() => {
            fixture.detectChanges();
            expect(overlayContainerElement.textContent).toBe('', 'Initially closed');

            comp.popover.toggle();
            expect(overlayContainerElement.textContent).toContain('Popover', 'Subsequently open');

            comp.popover.toggle();
            fixture.detectChanges();
            tick();
            expect(overlayContainerElement.textContent).toBe('', 'Closed after second toggle');
        }));

        it('should toggle with togglePopover()', fakeAsync(() => {
            fixture.detectChanges();
            expect(overlayContainerElement.textContent).toBe('', 'Initially closed');

            comp.anchor.togglePopover();
            expect(overlayContainerElement.textContent).toContain('Popover', 'Subsequently open');

            comp.anchor.togglePopover();
            fixture.detectChanges();
            tick();
            expect(overlayContainerElement.textContent).toBe('', 'Closed after second toggle');
        }));

        it('should emit when opened', fakeAsync(() => {
            fixture.detectChanges();
            let popoverOpenedEvent = false;
            let anchorOpenedEvent = false;
            let popoverAfterOpenEvent = false;

            comp.popover.opened.subscribe(() => popoverOpenedEvent = true);
            comp.anchor.popoverOpened.subscribe(() => anchorOpenedEvent = true);
            comp.popover.afterOpen.subscribe(() => popoverAfterOpenEvent = true);

            comp.popover.open();

            expect(popoverOpenedEvent).toBe(true, 'popoverOpened called');
            expect(anchorOpenedEvent).toBe(true, 'anchorOpened called');
            expect(popoverAfterOpenEvent).toBe(false, 'popoverAfterOpen not yet called');

            tick();
            expect(popoverAfterOpenEvent).toBe(true, 'popoverAfterOpen called after animation');
        }));

        it('should emit when closed', fakeAsync(() => {
            fixture.detectChanges();
            comp.popover.open();

            let popoverClosedEvent = false;
            let anchorClosedEvent = false;
            let popoverAfterCloseEvent = false;

            comp.popover.closed.subscribe(() => popoverClosedEvent = true);
            comp.anchor.popoverClosed.subscribe(() => anchorClosedEvent = true);
            comp.popover.afterClose.subscribe(() => popoverAfterCloseEvent = true);

            comp.popover.close();
            fixture.detectChanges();

            expect(popoverClosedEvent).toBe(true, 'popoverClosed called');
            expect(anchorClosedEvent).toBe(true, 'anchorClosed called');
            expect(popoverAfterCloseEvent).toBe(false, 'popoverAfterClose not yet called');

            tick();
            expect(popoverAfterCloseEvent).toBe(true, 'popoverAfterClose called after animation');
        }));

        it('should emit a value when closed with a value', fakeAsync(() => {
            fixture.detectChanges();
            comp.popover.open();

            const firstTestVal = 'abc123';
            const secondTestVal = 'xyz789';

            let popoverClosedValue;
            let anchorClosedValue;

            comp.popover.closed.subscribe(val => popoverClosedValue = val);
            comp.anchor.popoverClosed.subscribe(val => anchorClosedValue = val);

            comp.anchor.closePopover(firstTestVal);
            fixture.detectChanges();
            tick();

            // Working when closed via anchor api
            expect(popoverClosedValue).toBe(firstTestVal, 'popoverClosed with value - anchor api');
            expect(anchorClosedValue).toBe(firstTestVal, 'anchorClosed with value - anchor api');

            comp.popover.open();
            fixture.detectChanges();

            comp.popover.close(secondTestVal);
            fixture.detectChanges();
            tick();

            // Working when closed via popover api
            expect(popoverClosedValue).toBe(secondTestVal, 'popoverClosed with value - popover api');
            expect(anchorClosedValue).toBe(secondTestVal, 'anchorClosed with value - popover api');
        }));

        it('should return whether the popover is presently open', fakeAsync(() => {
            fixture.detectChanges();

            expect(comp.anchor.isPopoverOpen()).toBe(false, 'Initially closed - anchor');
            expect(comp.popover.isOpen()).toBe(false, 'Initially closed - popover');

            comp.popover.open();

            expect(comp.anchor.isPopoverOpen()).toBe(true, 'Subsequently opened - anchor');
            expect(comp.popover.isOpen()).toBe(true, 'Subsequently opened - popover');

            comp.popover.close();
            fixture.detectChanges();
            tick();

            expect(comp.anchor.isPopoverOpen()).toBe(false, 'Finally closed - anchor');
            expect(comp.popover.isOpen()).toBe(false, 'Finally closed - popover');
        }));

        it('should provide a reference to the anchor element', fakeAsync(() => {
            fixture.detectChanges();
            expect(comp.anchor.getElement()).toEqual(comp.anchorElement);
        }));

    });

    describe('backdrop', () => {
        let fixture: ComponentFixture<BackdropPopoverTestComponent>;
        let comp: BackdropPopoverTestComponent;
        let overlayContainerElement: HTMLElement;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [
                    PopModule,
                    NoopAnimationsModule,
                ],
                declarations: [BackdropPopoverTestComponent],
                providers: [
                    { provide: OverlayContainer, useFactory: overlayContainerFactory }
                ]
            });

            fixture = TestBed.createComponent(BackdropPopoverTestComponent);
            comp = fixture.componentInstance;

            overlayContainerElement = fixture.debugElement.injector.get(OverlayContainer)
                .getContainerElement();
        });

        afterEach(() => {
            document.body.removeChild(overlayContainerElement);
        });

        it('should have no backdrop by default', () => {
            fixture.detectChanges();
            comp.popover.open();

            const backdrop = <HTMLElement>overlayContainerElement.querySelector('.cdk-overlay-backdrop');
            expect(backdrop).toBeFalsy();
        });

        it('should allow adding a transparent backdrop', () => {
            comp.backdrop = true;
            fixture.detectChanges();
            comp.popover.open();

            const backdrop = <HTMLElement>overlayContainerElement.querySelector('.cdk-overlay-backdrop');
            expect(backdrop).toBeTruthy();
        });

        it('should emit an event when the backdrop is clicked', fakeAsync(() => {
            comp.backdrop = true;
            fixture.detectChanges();
            comp.popover.open();

            const backdrop = <HTMLElement>overlayContainerElement.querySelector('.cdk-overlay-backdrop');
            expect(comp.clicks).toBe(0, 'not yet clicked');

            backdrop.click();
            fixture.detectChanges();
            expect(comp.clicks).toBe(1, 'clicked once');
            tick(500);
        }));

        it('should close when backdrop is clicked', fakeAsync(() => {
            comp.backdrop = true;
            fixture.detectChanges();
            comp.popover.open();

            const backdrop = <HTMLElement>overlayContainerElement.querySelector('.cdk-overlay-backdrop');
            backdrop.click();
            fixture.detectChanges();
            tick(500);

            expect(overlayContainerElement.textContent).toBe('');
        }));

        it('should not close when interactiveClose is false', fakeAsync(() => {
            comp.backdrop = true;
            comp.popover.interactiveClose = false;
            fixture.detectChanges();
            comp.popover.open();

            const backdrop = <HTMLElement>overlayContainerElement.querySelector('.cdk-overlay-backdrop');
            expect(comp.clicks).toBe(0, 'Not yet clicked');
            backdrop.click();
            fixture.detectChanges();
            tick(500);

            expect(overlayContainerElement.textContent)
                .toContain('Popover', 'Interactive close disabled');

            comp.popover.interactiveClose = true;
            backdrop.click();
            fixture.detectChanges();
            tick(500);

            expect(comp.clicks).toBe(2, 'Clicked twice');
            expect(overlayContainerElement.textContent).toBe('', 'Interactive close allowed');
        }));

        it('should allow a custom backdrop to be added', () => {
            comp.backdrop = true;
            comp.klass = 'test-custom-class';
            fixture.detectChanges();
            comp.popover.open();

            const backdrop = <HTMLElement>overlayContainerElement.querySelector('.cdk-overlay-backdrop');
            expect(backdrop.classList.contains('test-custom-class')).toBe(true);
        });

    });

    describe('keyboard', () => {
        let fixture: ComponentFixture<KeyboardPopoverTestComponent>;
        let comp: KeyboardPopoverTestComponent;
        let overlayContainerElement: HTMLElement;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [
                    PopModule,
                    NoopAnimationsModule,
                ],
                declarations: [
                    KeyboardPopoverTestComponent,
                ],
                providers: [
                    { provide: OverlayContainer, useFactory: overlayContainerFactory }
                ]
            });

            fixture = TestBed.createComponent(KeyboardPopoverTestComponent);
            comp = fixture.componentInstance;

            overlayContainerElement = fixture.debugElement.injector.get(OverlayContainer)
                .getContainerElement();
        });

        afterEach(() => {
            document.body.removeChild(overlayContainerElement);
        });

        it('should close when escape key is pressed', fakeAsync(() => {
            fixture.detectChanges();
            comp.popover.open();

            // Let focus move to the first focusable element
            fixture.detectChanges();
            tick();

            expect(overlayContainerElement.textContent).toContain('Popover', 'Initially open');

            // Emit ESCAPE keydown event
            const currentlyFocusedElement = document.activeElement;
            if (currentlyFocusedElement) {
                expect(currentlyFocusedElement.classList).toContain('first', 'Ensure input is focused');
                currentlyFocusedElement.dispatchEvent(createKeyboardEvent('keydown', ESCAPE));
            }

            fixture.detectChanges();
            tick(500);

            expect(overlayContainerElement.textContent).toBe('', 'Closed after escape keydown');
        }));

        it('should not close when interactiveClose is false', fakeAsync(() => {
            comp.popover.interactiveClose = false;
            fixture.detectChanges();
            comp.popover.open();

            // Let focus move to the first focusable element
            fixture.detectChanges();
            tick();

            expect(overlayContainerElement.textContent).toContain('Popover', 'Initially open');

            // Emit ESCAPE keydown event
            const currentlyFocusedElement = getActiveElement();
            expect(currentlyFocusedElement.classList).toContain('first', 'Ensure input is focused');
            currentlyFocusedElement.dispatchEvent(createKeyboardEvent('keydown', ESCAPE));

            fixture.detectChanges();
            tick(500);

            expect(comp.lastKeyCode).toBe(ESCAPE, 'Keydown still captured');
            expect(overlayContainerElement.textContent)
                .toContain('Popover', 'Interactive close disabled');

            comp.popover.interactiveClose = true;
            currentlyFocusedElement.dispatchEvent(createKeyboardEvent('keydown', ESCAPE));
            fixture.detectChanges();
            tick(500);

            expect(overlayContainerElement.textContent).toBe('', 'Interactive close allowed');
        }));

        it('should emit keydown events when key is pressed', fakeAsync(() => {
            fixture.detectChanges();
            comp.popover.open();

            // Let focus move to the first focusable element
            fixture.detectChanges();
            tick();

            expect(comp.lastKeyCode).toBeFalsy();

            // Emit A keydown event on input element
            const currentlyFocusedElement = getActiveElement();
            currentlyFocusedElement.dispatchEvent(createKeyboardEvent('keydown', A));

            fixture.detectChanges();
            expect(comp.lastKeyCode).toBe(A, 'pressed A key on input');

            // Emit ESCAPE keydown event on body
            document.body.dispatchEvent(createKeyboardEvent('keydown', ESCAPE));
            fixture.detectChanges();
            expect(comp.lastKeyCode).toBe(ESCAPE, 'pressed ESCAPE key on body');

            tick(500);
        }));
    });

    describe('focus', () => {
        let fixture: ComponentFixture<FocusPopoverTestComponent>;
        let comp: FocusPopoverTestComponent;
        let overlayContainerElement: HTMLElement;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [
                    PopModule,
                    NoopAnimationsModule,
                ],
                declarations: [
                    FocusPopoverTestComponent,
                ],
                providers: [
                    { provide: OverlayContainer, useFactory: overlayContainerFactory }
                ]
            });

            fixture = TestBed.createComponent(FocusPopoverTestComponent);
            comp = fixture.componentInstance;

            overlayContainerElement = fixture.debugElement.injector.get(OverlayContainer)
                .getContainerElement();
        });

        afterEach(() => {
            document.body.removeChild(overlayContainerElement);
        });

        it('should focus the initial element by default', fakeAsync(() => {
            fixture.detectChanges();
            comp.button1.nativeElement.focus();
            comp.button1.nativeElement.click();

            fixture.detectChanges();
            tick();
            const el = getActiveElement();
            expect(el.classList).toContain('input', 'Ensure input is focused');
        }));

        it('should not focus the initial element if autoFocus is false', fakeAsync(() => {
            comp.autoFocus = false;
            fixture.detectChanges();

            comp.button1.nativeElement.focus();
            comp.button1.nativeElement.click();

            fixture.detectChanges();
            tick();

            expect(document.activeElement).toEqual(comp.button1.nativeElement);
        }));

        it('should not focus the initial element with autoFocus option as false', fakeAsync(() => {
            fixture.detectChanges();
            comp.button1.nativeElement.focus();
            comp.popover.open({ autoFocus: false });

            fixture.detectChanges();
            tick();

            expect(document.activeElement).toEqual(comp.button1.nativeElement);
        }));

        it('should restore focus by default', fakeAsync(() => {
            fixture.detectChanges();
            comp.button1.nativeElement.focus();
            let el = getActiveElement();
            expect(el.textContent).toBe('Button 1', 'Button 1 focus');
            comp.popover.open();

            fixture.detectChanges();
            tick();
            expect(getActiveElement().classList).toContain('input', 'Popover input is focused');

            comp.button2.nativeElement.focus();
            expect(getActiveElement().textContent).toBe('Button 2', 'Button 2 focused while open');

            comp.popover.close();
            fixture.detectChanges();
            tick();
            expect(getActiveElement().textContent).toBe('Button 1', 'Button 1 focus restored');
        }));

        it('should not restore focus if restoreFocus as false', fakeAsync(() => {
            comp.restoreFocus = false;

            fixture.detectChanges();
            comp.button1.nativeElement.focus();
            expect(getActiveElement().textContent).toBe('Button 1', 'Button 1 focus');
            comp.popover.open();

            fixture.detectChanges();
            tick();
            expect(getActiveElement().classList).toContain('input', 'Popover input is focused');

            comp.button2.nativeElement.focus();
            expect(getActiveElement().textContent).toBe('Button 2', 'Button 2 focused while open');

            comp.popover.close();
            fixture.detectChanges();
            tick();
            expect(getActiveElement().textContent).toBe('Button 2', 'Button 2 remains focused');
        }));

        it('should not restore focus when opened with restoreFocus option as false', fakeAsync(() => {
            fixture.detectChanges();
            comp.button1.nativeElement.focus();
            expect(getActiveElement().textContent).toBe('Button 1', 'Button 1 focus');
            comp.popover.open({ restoreFocus: false });

            fixture.detectChanges();
            tick();
            expect(getActiveElement().classList).toContain('input', 'Popover input is focused');

            comp.button2.nativeElement.focus();
            expect(getActiveElement().textContent).toBe('Button 2', 'Button 2 focused while open');

            comp.popover.close();
            fixture.detectChanges();
            tick();
            expect(getActiveElement().textContent).toBe('Button 2', 'Button 2 remains focused');
        }));

    });

    describe('positioning', () => {
        let fixture: ComponentFixture<PositioningTestComponent>;
        let comp: PositioningTestComponent;
        let overlayContainerElement: HTMLElement;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [
                    PopModule,
                    NoopAnimationsModule,
                ],
                declarations: [PositioningTestComponent, PositioningAliasTestComponent],
                providers: [
                    { provide: OverlayContainer, useFactory: overlayContainerFactory }
                ]
            });

            fixture = TestBed.createComponent(PositioningTestComponent);
            comp = fixture.componentInstance;

            overlayContainerElement = fixture.debugElement.injector.get(OverlayContainer)
                .getContainerElement();
        });

        afterEach(() => {
            document.body.removeChild(overlayContainerElement);
        });

        it('should keep the same overlay when positions are static', fakeAsync(() => {
            fixture.detectChanges();

            // open the overlay and store the overlayRef
            comp.popover.open();
            const overlayAfterFirstOpen = comp.anchor._anchoring._overlayRef;

            comp.popover.close();
            fixture.detectChanges();
            tick();

            // change the position to the same thing and reopen, saving the new overlayRef
            comp.hAlign = 'center';
            fixture.detectChanges();

            comp.popover.open();
            const overlayAfterSecondOpen = comp.anchor._anchoring._overlayRef;

            expect(overlayAfterFirstOpen === overlayAfterSecondOpen).toBe(true);
        }));

        it('should reconstruct the overlay when positions are updated', fakeAsync(() => {
            fixture.detectChanges();

            // open the overlay and store the overlayRef
            comp.popover.open();
            const overlayAfterFirstOpen = comp.anchor._anchoring._overlayRef;

            comp.popover.close();
            fixture.detectChanges();
            tick();

            // change the position and reopen, saving the new overlayRef
            comp.hAlign = 'after';
            fixture.detectChanges();

            comp.popover.open();
            const overlayAfterSecondOpen = comp.anchor._anchoring._overlayRef;

            expect(overlayAfterFirstOpen === overlayAfterSecondOpen).toBe(false);
        }));

        it('should generate the correct number of positions', fakeAsync(() => {
            let strategy: FlexibleConnectedPositionStrategy | undefined;
            let overlayConfig, overlayRef;
            fixture.detectChanges();

            // centered over anchor can be any of 5 x 5 positions
            comp.popover.open();
            overlayRef = comp.anchor._anchoring._overlayRef;
            overlayConfig = overlayRef ? overlayRef.getConfig() : null;
            strategy = overlayConfig.positionStrategy as FlexibleConnectedPositionStrategy;
            expect(strategy.positions.length).toBe(25, 'overlapping');

            comp.popover.close();
            fixture.detectChanges();
            tick();

            // non-overlapping can be any of 2 x 2 positions
            comp.hAlign = 'after';
            comp.vAlign = 'below';
            fixture.detectChanges();

            comp.popover.open();
            overlayRef = comp.anchor._anchoring._overlayRef;
            overlayConfig = overlayRef ? overlayRef.getConfig() : null;
            strategy = overlayConfig.positionStrategy as FlexibleConnectedPositionStrategy;
            expect(strategy.positions.length).toBe(4, 'non-overlapping');

            comp.popover.close();
            fixture.detectChanges();
            tick();

            // overlapping in one direction can be any of 2 x 5 positions
            comp.hAlign = 'start';
            comp.vAlign = 'below';
            fixture.detectChanges();

            comp.popover.open();
            overlayRef = comp.anchor._anchoring._overlayRef;
            overlayConfig = overlayRef ? overlayRef.getConfig() : null;
            strategy = overlayConfig.positionStrategy as FlexibleConnectedPositionStrategy;
            expect(strategy.positions.length).toBe(10, 'overlapping in one dimension');
        }));

        it('should throw an error when an invalid horizontalAlign is provided', () => {
            fixture.detectChanges();

            // set invalid horizontalAlign
            comp.hAlign = 'kiwi';

            expect(() => {
                fixture.detectChanges();
            }).toThrow(getInvalidHorizontalAlignError('kiwi'));
        });

        it('should throw an error when an invalid verticalAlign is provided', () => {
            fixture.detectChanges();

            // set invalid verticalAlign
            comp.vAlign = 'banana';

            expect(() => {
                fixture.detectChanges();
            }).toThrow(getInvalidVerticalAlignError('banana'));
        });

        it('should allow aliases for horizontal and vertical align inputs', () => {
            const aliasFixture = TestBed.createComponent(PositioningAliasTestComponent);
            const aliasComp = aliasFixture.componentInstance;

            aliasComp.xAlign = 'before';
            aliasComp.yAlign = 'end';

            aliasFixture.detectChanges();

            expect(aliasComp.popover.horizontalAlign).toBe('before');
            expect(aliasComp.popover.verticalAlign).toBe('end');
        });

        it('should only generate one position when force aligned', () => {
            comp.forceAlignment = true;
            fixture.detectChanges();

            comp.popover.open();
            const strategy = getStrategy(comp);
            expect(strategy ? strategy.positions.length : null).toBe(1, 'only one position');
        });
    });

    describe('anchoring service', () => {
        let anchorFixture: ComponentFixture<ServiceTestComponent>;
        let anchorComp: ServiceTestComponent;
        let overlayEl: HTMLElement;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [
                    PopModule,
                    NoopAnimationsModule,
                ],
                declarations: [ServiceTestComponent],
                providers: [
                    { provide: OverlayContainer, useFactory: overlayContainerFactory }
                ]
            });

            anchorFixture = TestBed.createComponent(ServiceTestComponent);
            anchorComp = anchorFixture.componentInstance;

            overlayEl = anchorFixture.debugElement.injector.get(OverlayContainer)
                .getContainerElement();
        });

        afterEach(() => {
            document.body.removeChild(overlayEl);
        });

        it('should throw an error if never anchored', () => {
            // should not throw just by initializing
            expect(() => {
                anchorFixture.detectChanges();
            }).not.toThrowError();

            // should throw if trying to open
            expect(() => {
                anchorComp.popover.open();
            }).toThrow(getUnanchoredPopoverError());
        });

        it('should open via popover api after being anchored', () => {
            anchorComp.anchoring.anchor(anchorComp.popover, anchorComp.container, anchorComp.customAnchor);
            anchorFixture.detectChanges();
            expect(overlayEl.textContent).toBe('', 'Initially closed');
            anchorComp.popover.open();
            expect(overlayEl.textContent).toContain('Popover', 'Subsequently open');
        });

        it('should open via service api after being anchored', () => {
            anchorComp.anchoring.anchor(anchorComp.popover, anchorComp.container, anchorComp.customAnchor);
            anchorFixture.detectChanges();
            expect(overlayEl.textContent).toBe('', 'Initially closed');
            anchorComp.anchoring.openPopover();
            expect(overlayEl.textContent).toContain('Popover', 'Subsequently open');
        });

        it('should get the anchor elementRef', () => {
            anchorComp.anchoring.anchor(anchorComp.popover, anchorComp.container, anchorComp.customAnchor);
            expect(anchorComp.anchoring.getAnchorElement()).toEqual(anchorComp.customAnchor);
        });
    });

    describe('hover directive', () => {
        let hoverTestFixture: ComponentFixture<HoverDirectiveTestComponent>;
        let hoverComp: HoverDirectiveTestComponent;
        let overlayEl: HTMLElement;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [
                    PopModule,
                    NoopAnimationsModule,
                ],
                declarations: [
                    HoverDirectiveTestComponent,
                ],
                providers: [
                    { provide: OverlayContainer, useFactory: overlayContainerFactory }
                ]
            });

            hoverTestFixture = TestBed.createComponent(HoverDirectiveTestComponent);
            hoverComp = hoverTestFixture.componentInstance;

            overlayEl = hoverTestFixture.debugElement.injector.get(OverlayContainer)
                .getContainerElement();
        });

        afterEach(() => {
            document.body.removeChild(overlayEl);
        });

        it('should open the popover when the anchor is hovered', fakeAsync(() => {
            hoverTestFixture.detectChanges();

            hoverComp.anchorEl.nativeElement.dispatchEvent(createMouseEvent('mouseenter'));
            tick(1);
            expect(hoverComp.popover.isOpen()).toBe(true);

            hoverComp.anchorEl.nativeElement.dispatchEvent(createMouseEvent('mouseleave'));
            tick(1);
            expect(hoverComp.popover.isOpen()).toBe(false);
        }));

        it('should open the popover after a delay', fakeAsync(() => {
            hoverComp.delay = 500;
            hoverTestFixture.detectChanges();

            hoverComp.anchorEl.nativeElement.dispatchEvent(createMouseEvent('mouseenter'));
            tick(499);
            expect(hoverComp.popover.isOpen()).toBe(false);
            tick(1);
            expect(hoverComp.popover.isOpen()).toBe(true);

            hoverComp.anchorEl.nativeElement.dispatchEvent(createMouseEvent('mouseleave'));
            expect(hoverComp.popover.isOpen()).toBe(false);
        }));

        it('should not open the popover if mouseleave event during delay', fakeAsync(() => {
            hoverComp.delay = 500;
            hoverTestFixture.detectChanges();

            hoverComp.anchorEl.nativeElement.dispatchEvent(createMouseEvent('mouseenter'));
            tick(100);
            expect(hoverComp.popover.isOpen()).toBe(false);

            hoverComp.anchorEl.nativeElement.dispatchEvent(createMouseEvent('mouseleave'));
            expect(hoverComp.popover.isOpen()).toBe(false);

            tick(400);
            expect(hoverComp.popover.isOpen()).toBe(false);
        }));

    });

});
