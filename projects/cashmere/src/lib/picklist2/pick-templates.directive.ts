import { Directive, ElementRef, Input, OnChanges, SimpleChanges, TemplateRef } from '@angular/core';
import { escapeHTML } from './value-utils';

/** @docs-private */
@Directive({ selector: '[hcPickItemLabel]' })
export class PickItemLabelDirective implements OnChanges {
    @Input() hcPickItemLabel: string;
    @Input() escape = true;

    constructor(private element: ElementRef<HTMLElement>) { }

    ngOnChanges(changes: SimpleChanges) {
        this.element.nativeElement.innerHTML = this.escape ?
            escapeHTML(this.hcPickItemLabel) :
            this.hcPickItemLabel;
    }
}

/** @docs-private */
@Directive({ selector: '[hc-pane-header-left-tmp]' })
export class PickPaneHeaderLeftTemplateDirective {
    constructor(public template: TemplateRef<any>) { }
}

/** @docs-private */
@Directive({ selector: '[hc-pane-header-right-tmp]' })
export class PickPaneHeaderRightTemplateDirective {
    constructor(public template: TemplateRef<any>) { }
}

/** @docs-private */
@Directive({ selector: '[hc-pick-option-tmp]' })
export class PickOptionTemplateDirective {
    constructor(public template: TemplateRef<any>) { }
}

/** @docs-private */
@Directive({ selector: '[hc-pick-optgroup-tmp]' })
export class PickOptgroupTemplateDirective {
    constructor(public template: TemplateRef<any>) { }
}

/** @docs-private */
@Directive({ selector: '[hc-pane-toolbar-tmp]' })
export class PickPaneToolbarTemplateDirective {
    constructor(public template: TemplateRef<any>) { }
}

/** @docs-private */
@Directive({ selector: '[hc-pane-footer-tmp]' })
export class PickPaneFooterTemplateDirective {
    constructor(public template: TemplateRef<any>) { }
}

/** @docs-private */
@Directive({ selector: '[hc-pick-custom-item-tmp]' })
export class PickCustomItemTemplateDirective {
    constructor(public template: TemplateRef<any>) { }
}
