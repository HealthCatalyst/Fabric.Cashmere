import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProgressBarComponent } from './progress-bar.component';

describe('ProgressBarComponent', () => {
    let component: ProgressBarComponent;
    let fixture: ComponentFixture<ProgressBarComponent>;

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ProgressBarComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProgressBarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('Color', () => {
        it('should throw an error on bad color', () => {
            expect(() => {
                component.color = 'beige' as string;
                fixture.detectChanges();
            }
            ).toThrow(new Error('Unsupported progress bar color value: beige'));
        });
    });
});
