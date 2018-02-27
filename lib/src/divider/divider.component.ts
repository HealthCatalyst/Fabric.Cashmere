import { ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'hc-divider',
    template: '',
    styleUrls: ['divider.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DividerComponent {
    @HostBinding('attr.role') role = 'separator';
    @HostBinding('class.hc-divider') dividerClass = true;
}
