import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioButtonComponent } from './radio-button.component';
import { FormsModule } from '@angular/forms';

describe('RadioButtonComponent', () => {
    let component: RadioButtonComponent;
    let fixture: ComponentFixture<RadioButtonComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RadioButtonComponent],
            imports: [FormsModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RadioButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
