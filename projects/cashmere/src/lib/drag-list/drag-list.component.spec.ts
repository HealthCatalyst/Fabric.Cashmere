import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { DragListModule } from './drag-list.module';
import { Component } from '@angular/core';

@Component({
    template: `
        <hc-drag-list></hc-drag-list>
    `
})
export class DragListTestComponent {
}

describe('DragListTestComponent', () => {
    let formComponent: DragListTestComponent;
    let formFixture: ComponentFixture<DragListTestComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [DragListTestComponent],
            imports: [DragListModule]
        }).compileComponents();

        formFixture = TestBed.createComponent(DragListTestComponent);
        formComponent = formFixture.componentInstance;
        formFixture.detectChanges();
    }));
});
