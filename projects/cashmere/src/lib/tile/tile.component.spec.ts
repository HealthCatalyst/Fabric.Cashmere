import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TileComponent} from './tile.component';
import {TileModule} from './tile.module';

describe('TileComponent', () => {
    let component: TileComponent;
    let fixture: ComponentFixture<TileComponent>;

    beforeEach(async(() => {
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
});
