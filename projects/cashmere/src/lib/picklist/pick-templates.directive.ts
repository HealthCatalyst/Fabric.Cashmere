import { Directive, ElementRef, Input, OnChanges, TemplateRef } from '@angular/core';
import { escapeHTML } from '../util';

/** @docs-private */
@Directive({ selector: '[hcPickItemLabel]' })
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
@Directive({ selector: '[hcPaneHeaderLeftTmp]' })
export class PickPaneHeaderLeftTemplateDirective {
    constructor(public template: TemplateRef<unknown>) { }
}

/** @docs-private */
@Directive({ selector: '[hcPaneHeaderRightTmp]' })
export class PickPaneHeaderRightTemplateDirective {
    constructor(public template: TemplateRef<unknown>) { }
}

/** @docs-private */
@Directive({ selector: '[hcPickOptionTmp]' })
export class PickOptionTemplateDirective {
    constructor(public template: TemplateRef<unknown>) { }
}

/** @docs-private */
@Directive({ selector: '[hcPickOptgroupTmp]' })
export class PickOptgroupTemplateDirective {
    constructor(public template: TemplateRef<unknown>) { }
}

/** @docs-private */
@Directive({ selector: '[hcPaneToolbarTmp]' })
export class PickPaneToolbarTemplateDirective {
    constructor(public template: TemplateRef<unknown>) { }
}

/** @docs-private */
@Directive({ selector: '[hcPaneFooterTmp]' })
export class PickPaneFooterTemplateDirective {
    constructor(public template: TemplateRef<unknown>) { }
}

/** @docs-private */
@Directive({ selector: '[hcPickCustomItemTmp]' })
export class PickCustomItemTemplateDirective {
    constructor(public template: TemplateRef<unknown>) { }
}
