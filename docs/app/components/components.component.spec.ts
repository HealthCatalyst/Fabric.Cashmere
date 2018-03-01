import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';

import { ComponentsComponent } from './components.component';
import { TabsModule } from '../../../lib/src/tabs';
import { SelectModule } from '../../../lib/src/select';
import { SubnavModule } from '../../../lib/src/subnav';

describe('ComponentsComponent', () => {
    let component: ComponentsComponent;
    let fixture: ComponentFixture<ComponentsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ComponentsComponent],
            imports: [
                RouterTestingModule,
                FormsModule,
                TabsModule,
                SelectModule,
                SubnavModule
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
