import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { StylesComponent } from './styles.component';

describe('ComponentsComponent', () => {
    let component: StylesComponent;
    let fixture: ComponentFixture<StylesComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [StylesComponent],
            imports: [
                RouterTestingModule
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(StylesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
