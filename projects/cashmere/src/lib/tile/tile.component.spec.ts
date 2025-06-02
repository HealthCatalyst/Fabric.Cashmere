import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { TileComponent } from './tile.component';
import { TileModule } from './tile.module';

describe('TileComponent', () => {
    let component: TileComponent;
    let fixture: ComponentFixture<TileComponent>;

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            imports: [TileModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TileComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe("_tight", () => {
        it('should check _tight to be false after being created', () => {
            expect(component._tight).toBeFalsy();
        });

        it('should set _tight to "true"', () => {
            component.tight = true;
            expect(component._tight).toBeTruthy();
        });
    });

});
