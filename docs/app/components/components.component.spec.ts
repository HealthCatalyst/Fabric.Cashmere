import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ComponentsComponent } from './components.component';
import { TabsModule } from '../../../lib/src/tabs';

describe('ComponentsComponent', () => {
    let component: ComponentsComponent;
    let fixture: ComponentFixture<ComponentsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ComponentsComponent],
            imports: [
                RouterTestingModule,
                TabsModule
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ComponentsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
