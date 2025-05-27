import { Component } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TileModule } from './tile.module';
import { TileHeaderDirective, TileHeaderType } from './tile-header.directive';

@Component({
    template: `
        <hc-tile>
            <div hcTileHeader [type]="headerType">Header</div>
        </hc-tile>
    `,
    standalone: false
})
class TestComponent {
    headerType = 'blue';
}

describe('TileHeaderDirective', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let directive: TileHeaderDirective;

    beforeEach(waitForAsync(() => {
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

    describe('when setting an invalid value', () => {
        const setInvalid = () => (directive.type = ('someInvalidValue' as string) as TileHeaderType);
        it('should throw an error', () => expect(setInvalid).toThrowError());
    });
});
