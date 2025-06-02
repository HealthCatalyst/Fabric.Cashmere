import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProgressDotsComponent, ProgressDotsColor } from './progress-dots.component';

describe('ProgressDotsComponent', () => {
    let component: ProgressDotsComponent;
    let fixture: ComponentFixture<ProgressDotsComponent>;

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ProgressDotsComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProgressDotsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('Color', () => {
        it('should change color to light', () => {
            component.color = 'light';
            expect(component.color).toBe('light');
        });

        it('should throw an error on bad color', () => {
            expect(() => {
                component.color = 'beige' as string as ProgressDotsColor;
                fixture.detectChanges();
            }
            ).toThrow(new Error('Unsupported progress dots color value: beige'));
        });
    });
});
