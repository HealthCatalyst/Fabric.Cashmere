import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressDotsComponent } from './progress-dots.component';
import { By } from '@angular/platform-browser';

describe('ProgressDotsComponent', () => {
    let component: ProgressDotsComponent;
    let fixture: ComponentFixture<ProgressDotsComponent>;

    beforeEach(async(() => {
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
                component.color = 'beige';
                fixture.detectChanges();
            }
            ).toThrow(new Error('Unsupported progress dots color value: beige'));
        });
    });
});
