import {
    AfterContentInit,
    Component,
    ContentChildren,
    ElementRef,
    HostBinding,
    QueryList,
    Renderer2,
    ViewEncapsulation
} from '@angular/core';
import { ListLineDirective } from './directives/list-line.directive';

@Component({
    selector: 'hc-list-item',
    templateUrl: './list-item.component.html',
    encapsulation: ViewEncapsulation.None
})
export class ListItemComponent implements AfterContentInit {
    @ContentChildren(ListLineDirective) listItems: QueryList<ListLineDirective>;

    @HostBinding('class.hc-list-item')
    get hostClass(): boolean {
        return true;
    }

    constructor(private element: ElementRef,
                private renderer: Renderer2) {
    }

    ngAfterContentInit(): void {
        this.setLineClass(this.listItems.length);
        this.listItems.changes.subscribe(() => {
            this.setLineClass(this.listItems.length);
        });
    }

    private setLineClass(lineCount: number): void {
        this.removeLineClasses();
        if (lineCount === 2 || lineCount === 3) {
            this.setClass(`hc-list-line-${lineCount}`, true);
        } else if (lineCount > 3) {
            this.setClass('hc-list-line-multi', true);
        }
    }

    private removeLineClasses(): void {
        this.setClass('hc-list-line-2', false);
        this.setClass('hc-list-line-3', false);
        this.setClass('hc-list-line-multi', false);
    }

    private setClass(className: string, addClass: boolean) {
        if (addClass) {
            this.renderer.addClass(this.element.nativeElement, className);
        } else {
            this.renderer.removeClass(this.element.nativeElement, className);
        }

    }
}
