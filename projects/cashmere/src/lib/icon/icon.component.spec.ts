import {fakeAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {IconModule} from './icon.module';
import {IconComponent} from './icon.component';
import {Component} from '@angular/core';
import {By} from '@angular/platform-browser';

@Component({
    template: `
        <hc-icon [fontIcon]="iconValue" hcIconLg></hc-icon>
    `,
    standalone: false
})
export class TestIconComponent {
    iconValue = 'icon-medicine';
}

describe('IconComponent', () => {
    let component: TestIconComponent;
    let fixture: ComponentFixture<TestIconComponent>;

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TestIconComponent],
            imports: [IconModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestIconComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should update the font class when the fontIcon value is changed', () => {
        const subnavComponent = fixture.debugElement.query(By.directive(IconComponent));
        expect(subnavComponent.nativeElement.classList.contains('icon-medicine')).toBe(true);

        component.iconValue = 'fa-pied-piper';
        fixture.detectChanges();

        expect(subnavComponent.nativeElement.classList.contains('fa-pied-piper')).toBe(true);
    });

    it('should add the hc-icon-lg class when the hcIconLg directive is included', () => {
        const subnavComponent = fixture.debugElement.query(By.directive(IconComponent));
        expect(subnavComponent.nativeElement.classList.contains('hc-icon-lg')).toBe(true);
    });

    it('should add the aria hidden attribute', () => {
        const subnavComponent = fixture.debugElement.query(By.directive(IconComponent));
        expect(subnavComponent.nativeElement.getAttribute('aria-hidden')).toEqual('true');
    });
});
