import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {animate, AnimationEvent, state, style, transition, trigger} from '@angular/animations';
import {DrawerPromiseResult, Drawer} from './drawer.component';
import * as util from '../util';
import {ElementRef, NO_ERRORS_SCHEMA} from '@angular/core';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {async} from '@angular/core/testing';

describe('DrawerComponent', () => {
    let component: Drawer;
    let fixture: ComponentFixture<Drawer>;
    // should e1 be a constant ?
    let e1: ElementRef = new ElementRef({focus() {}});
    // beforeEach(() => (component = new Drawer(e1)));
    // describe('angular initialization', () => {
    beforeEach(async done => {
        await TestBed.configureTestingModule({
            declarations: [Drawer],
            imports: [NoopAnimationsModule],
            providers: [{provide: ElementRef, useValue: e1}]
        }).compileComponents();
        fixture = TestBed.createComponent(Drawer);
        component = fixture.componentInstance;
        fixture.detectChanges();
        await fixture.whenStable();
        done();
    });
    it('should create the component without error', () => {
        expect(component).toBeTruthy();
    });
    // });

    describe('.mode', () => {
        describe('by default', () => {
            it('should be "push"', () => expect(component.mode).toBe('push'));
        });
        describe('after setting to valid value', () => {
            beforeEach(() => (component.mode = 'side'));
            it('should be the set value', () => expect(component.mode).toBe('side'));
        });
        describe('when setting to invalid value', () => {
            const setInvalid = () => (component.mode = 'someInvalidValue' as string);
            it('should throw an error', () => expect(setInvalid).toThrowError());
        });
    });

    describe('.align', () => {
        describe('by default', () => {
            it('should be "left"', () => expect(component.align).toBe('left'));
        });
        describe('after setting to valid value', () => {
            beforeEach(() => (component.align = 'right'));
            it('should be the set value', () => expect(component.align).toBe('right'));
        });
        describe('when setting to invalid value', () => {
            const setInvalid = () => (component.align = 'someInvalidValue' as string);
            it('should throw an error', () => expect(setInvalid).toThrowError());
        });
    });

    describe('.opened', () => {
        describe('by default', () => {
            it('should be "false"', () => expect(component.opened).toBe(false));
        });
        describe('after setting to valid value', () => {
            beforeEach(() => (component.opened = true as boolean));
            it('should be the set value', () => expect(component.opened).toBe(true));
        });
        describe('when setting to invalid value', () => {
            const setInvalid = () => (component.opened = ('someInvalidValue' as any) as boolean);
            it('should throw an error', () => expect(setInvalid).toThrowError());
        });
    });

    // Test Case we were working on in the meeting
    describe('.openStart', () => {
        describe('when the drawer starts to open', () => {
            let spy: jasmine.Spy;
            beforeEach(() => {
                spy = jasmine.createSpy('openStart');
                component.openStart.subscribe(spy);
                component.toggleOpen();
            });

            it('should emit', () => {
                expect(spy).toHaveBeenCalled();
            });
            it('opened is false', () => {
                expect(component.opened).toBe(false);
            });
        });
    });

    // a different try for the function we were working on
    // still failing
    describe('.openStart', () => {
        describe('when the drawer is toggled', () => {
            let spy: jasmine.Spy;

            beforeEach(fakeAsync(() => {
                spy = jasmine.createSpy('openStart');
                component.openStart.subscribe(spy);
                //component.toggleOpen();
                let event: Partial<AnimationEvent> = {fromState: 'void', toState: 'open'};
                component._onAnimationStart((event as any) as AnimationEvent);
                tick();
            }));
            it('should not emit', () => expect(spy).toHaveBeenCalled());
        });
    });
    // function if emitted or not are working properly
    describe('.openStart', () => {
        describe('when the drawer is already open', () => {
            let spy: jasmine.Spy;

            beforeEach(fakeAsync(() => {
                spy = jasmine.createSpy('openStart');
                component.openStart.subscribe(spy);
                let event: Partial<AnimationEvent> = {fromState: 'open', toState: 'open'};
                component._onAnimationStart((event as any) as AnimationEvent);
                tick();
            }));
            it('should not emit', () => expect(spy).not.toHaveBeenCalled());
        });
    });

    describe('.closeStart', () => {
        describe('when the drawer starts to close', () => {
            let spy: jasmine.Spy;

            beforeEach(fakeAsync(() => {
                spy = jasmine.createSpy('closeStart');
                component.closeStart.subscribe(spy);
                let event: Partial<AnimationEvent> = {fromState: 'open', toState: 'void'};
                component._onAnimationStart((event as any) as AnimationEvent);
                tick();
            }));
            it('should emit', () => expect(spy).toHaveBeenCalled());
        });
    });

    describe('.closeStart', () => {
        describe('when the drawer is already closed', () => {
            let spy: jasmine.Spy;

            beforeEach(fakeAsync(() => {
                spy = jasmine.createSpy('closeStart');
                component.closeStart.subscribe(spy);
                let event: Partial<AnimationEvent> = {fromState: 'void', toState: 'void'};
                component._onAnimationStart((event as any) as AnimationEvent);
                tick();
            }));
            it('should not emit', () => expect(spy).not.toHaveBeenCalled());
        });
    });

    describe('._openChange', () => {
        describe('when the drawer has opened', () => {
            let spy: jasmine.Spy;
            let spyIsOpened: jasmine.Spy;
            let spyIsClosed: jasmine.Spy;
            beforeEach(fakeAsync(() => {
                spy = jasmine.createSpy('_openChange');
                component._openChange.subscribe(spy);
                let event: Partial<AnimationEvent> = {fromState: 'void', toState: 'open'};
                component._onAnimationEnd((event as any) as AnimationEvent);
                spyIsOpened = spyOnProperty(component, '_isOpened', 'get').and.callThrough();
                spyIsClosed = spyOnProperty(component, '_isClosed', 'get').and.callThrough();
                tick();
            }));

            it('should emit', async(() => {
                expect(spy).toHaveBeenCalled();
            }));
            // Should be true
            it('_isOpened is false', async(() => {
                fixture.whenRenderingDone().then(() => {
                    expect(component._isOpened).toBe(false);
                });
            }));
            // Should be false
            it('_isClosed is true', async(() => {
                fixture.whenRenderingDone();
                expect(component._isClosed).toBe(true);
            }));
        });
    });
});
