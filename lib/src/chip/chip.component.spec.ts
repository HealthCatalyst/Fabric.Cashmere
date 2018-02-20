import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChipComponent } from './chip.component';
import { RouterTestingModule } from '@angular/router/testing';
import { IconModule } from './../icon/icon.module';

describe('SelectComponent', () => {
    let component: ChipComponent;
    let fixture: ComponentFixture<ChipComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [IconModule, RouterTestingModule],
            providers: [],
            declarations: [ChipComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ChipComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
