import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ResizableComponent } from '@healthcatalyst/cashmere';

/**
 * @title Overview of Resizable Container functionality
 */
@Component({
    selector: 'hc-resizable-overview-example',
    templateUrl: 'resizable-overview-example.component.html',
    styleUrls: ['./resizable-overview-example.component.scss']
})
export class ResizableOverviewExampleComponent {
    resizablePosition = new FormControl('top', {nonNullable: true});
    resizeableEnabled = new FormControl(true, {nonNullable: true});
    @ViewChild('resizableContainer') resizableContainer: ResizableComponent;

    get topContainer(): boolean {
        return this.resizablePosition.value === 'top' || this.resizablePosition.value === 'left';
    }

    get isVertical(): boolean {
        if ( this.resizablePosition.value === 'top' || this.resizablePosition.value === 'bottom' ) {
            return true;
        } else {
            return false;
        }
    }

    resetContainer(): void {
        this.resizableContainer.reset();
    }
}
