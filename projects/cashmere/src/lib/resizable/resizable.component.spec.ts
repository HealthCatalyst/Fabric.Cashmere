import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ResizableComponent } from './resizable.component';
import { ResizableModule } from './resizable.module';

describe('ResizableComponent', () => {
    let component: ResizableComponent;
    let fixture: ComponentFixture<ResizableComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports:[ResizableModule],
            declarations: [ResizableComponent]
        }).compileComponents();
        fixture = TestBed.createComponent(ResizableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create the component without error', () => {
        expect(component).toBeTruthy();
    });
});
