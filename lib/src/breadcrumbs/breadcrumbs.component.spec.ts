import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BreadcrumbsComponent } from './breadcrumbs.component';
import { RouterTestingModule } from '@angular/router/testing';
import { IconModule } from './../icon/icon.module';

describe('SelectComponent', () => {
    let component: BreadcrumbsComponent;
    let fixture: ComponentFixture<BreadcrumbsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [IconModule, RouterTestingModule],
            providers: [],
            declarations: [BreadcrumbsComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BreadcrumbsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
