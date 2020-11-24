import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Drawer} from './drawer.component';
import {ElementRef} from '@angular/core';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('DrawerComponent', () => {
    let component: Drawer;
    let fixture: ComponentFixture<Drawer>;
    let el: ElementRef = new ElementRef({focus() {}});

    beforeEach(async done => {
        await TestBed.configureTestingModule({
            declarations: [Drawer],
            imports: [NoopAnimationsModule],
            providers: [{provide: ElementRef, useValue: el}]
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

    it('should dispatch an event when a drawer is opened', async () => {
        const spy = jasmine.createSpy('openedChange called');
        component.openedChange.subscribe(spy);

        component.toggleOpen();
        fixture.detectChanges();

        await fixture.whenStable();
        expect(spy).toHaveBeenCalledTimes(1);
        expect(component.opened).toBe(true);
    });

    it('should emit openStart when a drawer is opened', async () => {
        const spy = jasmine.createSpy('openStart called');
        component.openStart.subscribe(spy);

        component.toggleOpen();
        fixture.detectChanges();

        await fixture.whenStable();
        expect(spy).toHaveBeenCalled();
    });

    it('should dispatch an event when a drawer is closed', async () => {
        const spy = jasmine.createSpy('openedChange called');
        component.openedChange.subscribe(spy);

        component.toggleOpen();
        fixture.detectChanges();

        await fixture.whenStable();
        component.toggleClose();
        fixture.detectChanges();

        await fixture.whenStable();
        expect(spy).toHaveBeenCalledTimes(2);
        expect(component.opened).toBe(false);
    });

    it('should emit closeStart when a drawer is closed', async () => {
        const spy = jasmine.createSpy('closeStart called');
        component.closeStart.subscribe(spy);

        component.toggleOpen();
        fixture.detectChanges();

        await fixture.whenStable();
        component.toggleClose();
        fixture.detectChanges();

        await fixture.whenStable();
        expect(spy).toHaveBeenCalled();
    });
});
