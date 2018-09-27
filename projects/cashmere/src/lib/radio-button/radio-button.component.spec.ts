import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RadioButtonComponent} from './radio';
import {RadioButtonModule} from './radio-button.module';

describe('RadioButtonComponent', () => {
    let component: RadioButtonComponent;
    let fixture: ComponentFixture<RadioButtonComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RadioButtonModule]
        }).compileComponents();
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
