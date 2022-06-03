import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {SlideToggleModule} from './slide-toggle.module';
import {SlideToggleComponent} from './slide-toggle.component';
import {Component, ViewChild} from '@angular/core';
import {By} from '@angular/platform-browser';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
    template: `
        <hc-slide-toggle #st
            [disabled]="disabledVal"
            [buttonSize]="buttonSizeVal"
            [buttonStyle]="buttonStyleVal"
            [labelPosition]="labelPosVal"
            [insideLabel]="insideLabelVal"
            [buttonState]="buttonStateVal"
            (buttonStateChanged)="onSlideChange($event)"
        >
        </hc-slide-toggle>
    `
})
export class SlideToggleTestComponent {
    disabledVal = false;
    buttonSizeVal = 'sm';
    buttonStyleVal = 'blue';
    labelPosVal = 'left';
    insideLabelVal = 'on';
    buttonStateVal = true;

    onSlideChange: (event?: boolean) => void = () => null;

    @ViewChild('st', {static: false})
    slideToggleElement: SlideToggleComponent;
}

@Component({
    template: `
        <hc-slide-toggle [formControl]="slideForm"></hc-slide-toggle>
    `
})
export class SlideToggleFormComponent {
    slideForm: FormControl = new FormControl( true );
}

describe('SlideToggleComponent', () => {
    let component: SlideToggleTestComponent;
    let fixture: ComponentFixture<SlideToggleTestComponent>;
    let formComponent: SlideToggleFormComponent;
    let formFixture: ComponentFixture<SlideToggleFormComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [SlideToggleTestComponent, SlideToggleFormComponent],
            imports: [SlideToggleModule, FormsModule, ReactiveFormsModule]
        }).compileComponents();

        fixture = TestBed.createComponent(SlideToggleTestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        formFixture = TestBed.createComponent(SlideToggleFormComponent);
        formComponent = formFixture.componentInstance;
        formFixture.detectChanges();

    }));

    it('should change the style of the toggle when buttonStyle is set', () => {
        const slideToggleDebugElement = fixture.debugElement.query(By.directive(SlideToggleComponent));
        expect(slideToggleDebugElement.queryAll(By.css('.hc-slide-toggle-blue')).length).toBe(1);

        component.buttonStyleVal = 'green';
        fixture.detectChanges();

        expect(slideToggleDebugElement.queryAll(By.css('.hc-slide-toggle-green')).length).toBe(1);
    });

    it('should change the size of the toggle when buttonSize is set', () => {
        const slideToggleDebugElement = fixture.debugElement.query(By.directive(SlideToggleComponent));
        expect(slideToggleDebugElement.queryAll(By.css('.hc-slide-toggle-sm')).length).toBe(1);

        component.buttonSizeVal = 'lg';
        fixture.detectChanges();

        expect(slideToggleDebugElement.queryAll(By.css('.hc-slide-toggle-lg')).length).toBe(1);
    });

    it('should change the label name when insideLabel is set', () => {
        const slideToggleDebugElement = fixture.debugElement.query(By.directive(SlideToggleComponent));
        expect(slideToggleDebugElement.queryAll(By.css('.hc-slide-toggle-inside-label-on')).length).toBe(1);

        component.insideLabelVal = 'true';
        fixture.detectChanges();

        expect(slideToggleDebugElement.queryAll(By.css('.hc-slide-toggle-inside-label-true')).length).toBe(1);
    });

    it('should throw an error when an invalid insideLabel type is set', () => {
        expect( () => fixture.componentInstance.slideToggleElement.insideLabel = 'healthCatalyst' ).toThrowError(/Unsupported inside label type: .*/);
    });

    it('should adjust the position of the outside label when labelPosition is set', () => {
        const slideToggleDebugElement = fixture.debugElement.query(By.directive(SlideToggleComponent));
        expect(slideToggleDebugElement.queryAll(By.css('.hc-slide-toggle-container-reverse')).length).toBe(0);

        component.labelPosVal = 'right';
        fixture.detectChanges();

        expect(slideToggleDebugElement.queryAll(By.css('.hc-slide-toggle-container-reverse')).length).toBe(1);
    });

    it('should adjust to disabled styling when disabled is set', () => {
        const slideToggleDebugElement = fixture.debugElement.query(By.directive(SlideToggleComponent));
        expect(slideToggleDebugElement.queryAll(By.css('.hc-slide-toggle-disabled')).length).toBe(0);

        component.disabledVal = true;
        fixture.detectChanges();

        expect(slideToggleDebugElement.queryAll(By.css('.hc-slide-toggle-disabled')).length).toBe(1);
    });

    it('should update the control when a FormField value changes', () => {
        const slideToggleDebugElement = formFixture.debugElement.query(By.directive(SlideToggleComponent));
        expect( slideToggleDebugElement.componentInstance.buttonState ).toBe( true );

        formComponent.slideForm.setValue( false );
        formFixture.detectChanges();

        expect( slideToggleDebugElement.componentInstance.buttonState ).toBe( false );
    });

    it('should update the FormControl when the toggle is clicked', () => {
        const slideToggleDebugElement = formFixture.debugElement.query(By.directive(SlideToggleComponent));
        expect( slideToggleDebugElement.componentInstance.buttonState ).toBe( true );

        slideToggleDebugElement.componentInstance.buttonState = false;
        formFixture.detectChanges();

        expect( formComponent.slideForm.value ).toBe( false );
    });
});

