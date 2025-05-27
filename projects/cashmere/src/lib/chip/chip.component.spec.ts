import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {ChipModule} from './chip.module';
import {Component} from '@angular/core';
import {By} from '@angular/platform-browser';

@Component({
    template: `
        <hc-chip [color]="colorValue" [hasCloseButton]="closeValue">Test Chip</hc-chip>
    `,
    standalone: false
})
export class TestChipComponent {
    colorValue = 'red';
    closeValue = false;
}

describe('ChipComponent', () => {
    let component: TestChipComponent;
    let fixture: ComponentFixture<TestChipComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TestChipComponent],
            imports: [ChipModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestChipComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should set the chip style based on the color parameter', () => {
        const chipComponent = fixture.debugElement.query(By.css('div'));
        expect(chipComponent.nativeElement.classList.contains('hc-chip-red')).toBe(true);
    });

    it('should throw an error if an unsupported style is set', () => {
        expect(function() {
            component.colorValue = 'beige';
            fixture.detectChanges();
        }).toThrow(new Error('Unsupported chip color value: beige'));
    });

    it('should not include a close button if action is false', () => {
        const closeSpans = fixture.debugElement.queryAll(By.css('span'));
        expect(closeSpans.length).toBe(1);
    });

    it('should include a close button if action is true', () => {
        component.closeValue = true;
        fixture.detectChanges();

        const closeSpan = fixture.debugElement.queryAll(By.css('span'));
        expect(closeSpan[1].nativeElement.classList.contains('hc-chip-close')).toBe(true);
        expect(closeSpan[2].nativeElement.classList.contains('hc-chip-close-icon')).toBe(true);
    });
});

@Component({
    template: `
        <hc-chip-row [wrap]="wrapValue">
            <hc-chip>Chip One</hc-chip>
            <hc-chip>Chip Two</hc-chip>
        </hc-chip-row>
    `,
    standalone: false
})
export class TestChipRowComponent {
    wrapValue = false;
}

describe('ChipRowComponent', () => {
    let component: TestChipRowComponent;
    let fixture: ComponentFixture<TestChipRowComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TestChipRowComponent],
            imports: [ChipModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestChipRowComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should display single or multi line based on the wrap parameter', () => {
        const rowComponent = fixture.debugElement.query(By.css('div'));
        expect(rowComponent.nativeElement.classList.contains('hc-chip-single-row')).toBe(true);

        component.wrapValue = true;
        fixture.detectChanges();

        expect(rowComponent.nativeElement.classList.contains('hc-chip-single-row')).toBe(false);
    });
});
