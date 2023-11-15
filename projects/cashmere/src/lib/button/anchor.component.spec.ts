import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AnchorComponent} from './anchor.component';

describe('a[hc-button]', () => {
    let component: AnchorComponent;
    let fixture: ComponentFixture<AnchorComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AnchorComponent]
        }).compileComponents();
        fixture = TestBed.createComponent(AnchorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        await fixture.whenStable();
    });
    it('should create the component without error', () => {
        expect(component).toBeTruthy();
    });

    describe('when not disabled', () => {
        it('should handle click events', () => {
            const inlineStyles = getComputedStyle(fixture.nativeElement);
            expect( inlineStyles['pointer-events'] ).toBe('auto');
        });

        it('should not add aria-disabled', () => {
            expect(fixture.nativeElement.getAttribute('aria-disabled')).toBe('false');
        });
    });

    describe('when disabled', () => {
        it('should remove tabindex', () => {
            expect( fixture.nativeElement.getAttribute('tabindex') ).toBe('0');

            component.disabled = true;
            fixture.detectChanges();

            expect( fixture.nativeElement.getAttribute('tabindex') ).toBe('-1');
        });

        it('should not handle click events', () => {
            let inlineStyles = getComputedStyle(fixture.nativeElement);
            expect( inlineStyles['pointer-events'] ).toBe('auto');

            component.disabled = true;
            fixture.detectChanges();

            inlineStyles = getComputedStyle(fixture.nativeElement);
            expect( inlineStyles['pointer-events'] ).toBe('none');
        });

        it('should add aria-disabled', () => {
            component.disabled = true;
            fixture.detectChanges();

            expect(fixture.nativeElement.getAttribute('aria-disabled')).toBe('true');
        });
    });
});
