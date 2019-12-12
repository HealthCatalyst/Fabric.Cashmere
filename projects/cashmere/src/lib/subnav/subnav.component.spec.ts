import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {SubnavModule} from './subnav.module';
import {Component} from '@angular/core';
import {By} from '@angular/platform-browser';
import {SubnavComponent} from './subnav.component';
import {SubnavRightDirective} from './subnav-right.directive';

@Component({
    template: `
        <hc-subnav [fixedTop]="fixedValue"><div hcSubnavRight></div></hc-subnav>
    `
})
export class SubNavRightComponent {
    fixedValue: boolean = false;
}

describe('SubnavComponent', () => {
    let component: SubNavRightComponent;
    let fixture: ComponentFixture<SubNavRightComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SubNavRightComponent],
            imports: [SubnavModule]
        }).compileComponents();

        fixture = TestBed.createComponent(SubNavRightComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should add hc-fixed-position css class when fixedTop is set to true', () => {
        component.fixedValue = true;
        fixture.detectChanges();

        let subnavComponent = fixture.debugElement.query(By.directive(SubnavComponent));
        expect(subnavComponent.nativeElement.classList.contains('hc-fixed-top')).toBe(true);
    });

    it('should add hc-subnav-right css class when hcSubnavRight directive is included', () => {
        let subnavRight = fixture.debugElement.query(By.directive(SubnavRightDirective));
        expect(subnavRight.nativeElement.classList.contains('hc-subnav-right')).toBe(true);
    });
});
