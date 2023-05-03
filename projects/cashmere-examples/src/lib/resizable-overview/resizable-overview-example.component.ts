import {Component, ElementRef, ViewChild} from '@angular/core';
import { FormControl } from '@angular/forms';

/**
 * @title Overview of Resizable Container functionality
 */
@Component({
    selector: 'hc-resizable-overview-example',
    templateUrl: 'resizable-overview-example.component.html',
    styleUrls: ['./resizable-overview-example.component.scss']
})
export class ResizableOverviewExampleComponent {
    readonly resizablePosition = new FormControl('top', {nonNullable: true});
    @ViewChild('resizableContainer') resizableContainer: ElementRef<HTMLElement>;

    resetContainer(): void {
        this.resizableContainer.nativeElement.style.height = '300px';
    }
}
