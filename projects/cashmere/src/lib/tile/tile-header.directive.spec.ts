import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TileModule } from './tile.module';
import { TileHeaderDirective } from './tile-header.directive';

@Component({
    template: `
        <hc-tile>
            <div hcTileHeader [type]="headerType">Header</div>
        </hc-tile>
    `
})
class TestComponent {
    headerType: string = 'blue';
}

describe('TileHeaderDirective', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let directive: TileHeaderDirective;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TestComponent],
            imports: [TileModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        const el = fixture.debugElement.query(By.directive(TileHeaderDirective));
        fixture.detectChanges();
        directive = el.injector.get(TileHeaderDirective);
    });

    it('should create', () => {
        expect(directive).toBeTruthy();
    });

    it('should change styles when type is changed', () => {
        component.headerType = 'title';
        fixture.detectChanges();
        expect(directive._headerTitle).toBeTruthy();
        expect(directive._headerBlue).toBeFalsy();
    });

    it('when setting an invalid value', () => {
        const setInvalid = () => component.headerType = 'someInvalidValue';
        it('should throw an error', () => expect(setInvalid).toThrowError());
    });
});
