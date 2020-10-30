import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BannerType, HcBannerComponent} from './hc-banner.component';
import * as cashmereUtil from '../util';

describe('HcBannerComponent', () => {
    let component: HcBannerComponent;

    beforeEach(() => (component = new HcBannerComponent()));

    describe('angular initialization', () => {
        let fixture: ComponentFixture<HcBannerComponent>;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                declarations: [HcBannerComponent]
            }).compileComponents();
            fixture = TestBed.createComponent(HcBannerComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
            await fixture.whenStable();
        });

        it('should create the component without error', () => {
            expect(component).toBeTruthy();
        });
    });

    describe('.type', () => {
        describe('by default', () => {
            it('should be "info"', () => expect(component.type).toBe('info'));
        });
        describe('after setting to valid value', () => {
            beforeEach(() => (component.type = 'warning'));
            it('should be the set value', () => expect(component.type).toBe('warning'));
        });
        describe('when setting to invalid value', () => {
            const setInvalid = () => (component.type = ('someInvalidValue' as string) as BannerType);
            it('should throw an error', () => expect(setInvalid).toThrowError());
        });
    });

    describe('.clickDismiss', () => {
        describe('by default', () => {
            it('should be false', () => expect(component.clickDismiss).toBe(false));
        });
        describe('when a value is set', () => {
            beforeEach(() => {
                spyOn(cashmereUtil, 'parseBooleanAttribute');
                component.clickDismiss = ('true' as any) as boolean;
            });
            it('the value is sanitized using parseBooleanAttribute', () => {
                expect(cashmereUtil.parseBooleanAttribute).toHaveBeenCalled();
            });
        });
    });

    describe('._bannerClick', () => {
        describe('when _clickDismiss is true', () => {
            let spy: jasmine.Spy;
            let mouseEvent: MouseEvent;

            beforeEach(() => {
                spy = jasmine.createSpy('bannerClose');
                mouseEvent = new MouseEvent('');
                component.bannerClose.subscribe(spy);
                component.clickDismiss = true;
                component._bannerClick(mouseEvent);
            });
            it('should emit the bannerClose event with the mouse event', () => expect(spy).toHaveBeenCalledWith(mouseEvent));
        });
        describe('when _clickDismiss is false', () => {
            let spy: jasmine.Spy;

            beforeEach(() => {
                spy = jasmine.createSpy('bannerClose');
                component.bannerClose.subscribe(spy);
                component.clickDismiss = false;
                component._bannerClick(new MouseEvent(''));
            });
            it('should not emit the bannerClose event', () => expect(spy).not.toHaveBeenCalled());
        });
    });
});
