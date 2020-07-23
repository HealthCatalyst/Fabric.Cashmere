import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressDotsComponent } from './progress-dots.component';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';

// @Component({
//     template: `
//     <div class="hc-dots-container" [ngClass]="{'center-dots': isCentered }">
//         <div class="hc-dots-loader" [ngClass]="{'loader-light': color === 'light', 'loader-mini': isMini}">
//             <div class="loader-animate"></div>
//         </div>
//     </div>
// `
// })
// export class ProgressDotsComponent {
//     color: string = 'light';
//     isCentered: boolean = false;
//     isMini: boolean = false;
// }

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
    // TODO:
    // Remove the F
    fdescribe('d', () => {
        it('should set the current step based on the activeIndex', () => {
            console.log(component);
            component.isCentered = false;
            fixture.detectChanges();

            let dotsContainer = fixture.debugElement.queryAll(By.css('hc-dots-container'));
            console.log(dotsContainer);
            // expect(dotsContainer[0].nativeElement.classList.contains('center-dots')).toBe(false);
        });
    });
});
