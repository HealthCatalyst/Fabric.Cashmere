import {fakeAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {SelectComponent} from './select.component';
import {SelectService} from './select.service';

describe('SelectComponent', () => {
    let component: SelectComponent;
    let fixture: ComponentFixture<SelectComponent>;

    beforeEach(
        fakeAsync(() => {
            TestBed.configureTestingModule({
                imports: [],
                providers: [SelectService],
                declarations: [SelectComponent]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(SelectComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
