import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

import {ButtonComponent} from './button.component';

describe('ButtonComponent', () => {
    let component: ButtonComponent;
    let fixture: ComponentFixture<ButtonComponent>;
    let button: DebugElement;

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                declarations: [ButtonComponent]
            })
                .compileComponents()
                .then(() => {
                    fixture = TestBed.createComponent(ButtonComponent);
                    component = fixture.componentInstance;
                    button = fixture.debugElement.query(By.css('button'));

                    fixture.detectChanges();
                });
        })
    );

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('primary button should have styles set properly', () => {
        fixture.detectChanges();
        expect(button.classes['btn']).toBe(true);
        expect(button.classes['btn-primary']).toBe(true);
    });

    it('primary button should not have btn-tertiary style', () => {
        fixture.detectChanges();
        expect(button.classes['btn']).toBe(true);
        expect(button.classes['btn-tertiary']).toBeFalsy();
    });

    it('tertiary button should not have btn-primary style', () => {
        fixture.detectChanges();
        expect(button.classes['btn']).toBe(true);
        expect(button.classes['btn-primary']).toBeFalsy();
    });
});
