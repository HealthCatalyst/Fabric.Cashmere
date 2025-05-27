import { Directive, ElementRef, Input, OnChanges, TemplateRef } from '@angular/core';
import { escapeHTML } from '../util';

/** @docs-private */
@Directive({
    selector: '[hcPickItemLabel]',
    standalone: false
})
export class PickItemLabelDirective implements OnChanges {
    @Input() hcPickItemLabel: string;
    @Input() escape = true;

    constructor(private element: ElementRef<HTMLElement>) { }

    ngOnChanges(): void {
        this.element.nativeElement.innerHTML = this.escape ?
            escapeHTML(this.hcPickItemLabel) :
            this.hcPickItemLabel;
    }
}

/** @docs-private */
@Directive({
    selector: '[hcPaneHeaderLeftTmp]',
    standalone: false
})
export class PickPaneHeaderLeftTemplateDirective {
    constructor(public template: TemplateRef<unknown>) { }
}

/** @docs-private */
@Directive({
    selector: '[hcPaneHeaderRightTmp]',
    standalone: false
})
export class PickPaneHeaderRightTemplateDirective {
    constructor(public template: TemplateRef<unknown>) { }
}

/** @docs-private */
@Directive({
    selector: '[hcPickOptionTmp]',
    standalone: false
})
export class PickOptionTemplateDirective {
    constructor(public template: TemplateRef<unknown>) { }
}

/** @docs-private */
@Directive({
    selector: '[hcPickOptgroupTmp]',
    standalone: false
})
export class PickOptgroupTemplateDirective {
    constructor(public template: TemplateRef<unknown>) { }
}

/** @docs-private */
@Directive({
    selector: '[hcPaneToolbarTmp]',
    standalone: false
})
export class PickPaneToolbarTemplateDirective {
    constructor(public template: TemplateRef<unknown>) { }
}

/** @docs-private */
@Directive({
    selector: '[hcPaneFooterTmp]',
    standalone: false
})
export class PickPaneFooterTemplateDirective {
    constructor(public template: TemplateRef<unknown>) { }
}

/** @docs-private */
@Directive({
    selector: '[hcPickCustomItemTmp]',
    standalone: false
})
export class PickCustomItemTemplateDirective {
    constructor(public template: TemplateRef<unknown>) { }
}
