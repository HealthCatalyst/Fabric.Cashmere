import { Injectable } from '@angular/core';
import { ItemsList } from './items-list';
import { PickPaneComponent } from './pick-pane.component';
import { PickOption } from '../pick.types';

@Injectable()
/** Contains logic for dragging and dropping items between picklist panes.
 * @docs-private
 */
export class PickPaneDragService {
    private pane: PickPaneComponent;

    public reset(pane: PickPaneComponent): void {
        this.pane = pane;
    }

    public drag(event: DragEvent, list: ItemsList, item: PickOption): void {
        event.stopPropagation();
        if (!item.selected) { list.clearSelected(true); }
        list.select(item);
        this.pane._isDragging = true;
    }

    public allowDrop(event: DragEvent): void {
        if (!this.pane._isDragging) {
            event.preventDefault();
            this.pane._willAcceptDrop = true;
        }
    }

    public drop(event: DragEvent): void {
        if (this.pane._willAcceptDrop) {
            event.preventDefault();
            this.pane._companionPane.triggerMove.emit();
        }

        this.dragLeave();
        this.dragEnd();
    }

    public dragEnd(): void {
        this.pane._isDragging = false;
        this.pane._companionPane._isDragging = false;
    }

    public dragLeave(): void {
        this.pane._willAcceptDrop = false;
        this.pane._companionPane._willAcceptDrop = false;
        this.pane.detectChanges();
        this.pane._companionPane.detectChanges();
    }
}
