import {fakeAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {ProgressSpinnerComponent} from './progress-spinner.component';

describe('ProgressSpinnerComponent', () => {
    let component: ProgressSpinnerComponent;
    let fixture: ComponentFixture<ProgressSpinnerComponent>;

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ProgressSpinnerComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProgressSpinnerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('Diameter', () => {
        it('will not allow values less than 20', () => {
            component.diameter = -1000;
            expect(component.diameter).toBe(20);

            component.diameter = 19;
            expect(component.diameter).toBe(20);
        });

        it('will not allow values greater than 250', () => {
            component.diameter = 251;
            expect(component.diameter).toBe(250);

            component.diameter = 2000;
            expect(component.diameter).toBe(250);
        });
    });

    describe('Progress', () => {
        it('will not allow values less than 0', () => {
            component.progress = -5;
            expect(component.progress).toBe(0);
        });

        it('will not allow values greater than 100', () => {
            component.progress = 101;
            expect(component.progress).toBe(100);
        });

        describe('makes calculations based on progress to determine transition type', () => {
            it('uses ease-in-out transtions if change in progress does not cross 50% threshold', () => {
                component.progress = 0;
                component.progress = 50;
                expect(component._leftCircleTransition.indexOf('ease-in-out') > -1).toBeTruthy();
                expect(component._rightCircleTransition.indexOf('ease-in-out') > -1).toBeTruthy();
            });
            it('uses ease-in for left and ease out for right if progress goes from below to above 50%', () => {
                component.progress = 60;
                component.progress = 10;
                expect(component._leftCircleTransition.indexOf('ease-in') > -1).toBeTruthy();
                expect(component._rightCircleTransition.indexOf('ease-out') > -1).toBeTruthy();
            });
            it('uses ease-out for left and ease in for right if progress goes from above to below 50%', () => {
                component.progress = 10;
                component.progress = 60;
                expect(component._leftCircleTransition.indexOf('ease-out') > -1).toBeTruthy();
                expect(component._rightCircleTransition.indexOf('ease-in') > -1).toBeTruthy();
            });
        });

        describe('makes calculations based on progress to determine rotation', () => {
            describe('of right inner circle:', () => {
                it('sets rotation to -135 when progress is 0', () => {
                    component.progress = 0;
                    expect(component._rightCircleTransform).toBe('rotate(-135deg)');
                });
                it('sets rotation to 45 when progress is 50 or above', () => {
                    component.progress = 50;
                    expect(component._rightCircleTransform).toBe('rotate(45deg)');

                    component.progress = 95;
                    expect(component._rightCircleTransform).toBe('rotate(45deg)');
                });
                it('correctly sets rotation for stuff between 0 and 50', () => {
                    component.progress = 1;
                    expect(component._rightCircleTransform).toBe('rotate(-131.4deg)');

                    component.progress = 14;
                    expect(component._rightCircleTransform).toBe('rotate(-84.6deg)');
                });
            });

            describe('of left inner circle:', () => {
                it('sets rotation to 135 when progress is 50 or below', () => {
                    component.progress = 50;
                    expect(component._leftCircleTransform).toBe('rotate(135deg)');

                    component.progress = 24;
                    expect(component._leftCircleTransform).toBe('rotate(135deg)');
                });
                it('sets rotation to 315 when progress is 100', () => {
                    component.progress = 100;
                    expect(component._leftCircleTransform).toBe('rotate(315deg)');
                });
                it('correctly sets rotation for stuff between 51 and 100', () => {
                    component.progress = 53;
                    expect(component._leftCircleTransform).toBe('rotate(145.8deg)');

                    component.progress = 97;
                    expect(component._leftCircleTransform).toBe('rotate(304.2deg)');
                });
            });
        });
    });
});
