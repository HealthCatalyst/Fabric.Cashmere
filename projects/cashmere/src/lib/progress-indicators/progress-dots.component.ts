import {Component, Input} from '@angular/core';

@Component({
    selector: 'hc-progress-dots',
    templateUrl: 'progress-dots.component.html'
})
export class ProgressDotsComponent {
    /** Use "light" on darker backgrounds and "dark" for lighter backgrounds. */
    @Input() public color: 'dark' | 'light' = 'dark';
    /** If true, the loader will center itself within its container. */
    @Input() public isCentered = true;
    /** If true, you'll get a teeny tiny little loader. */
    @Input() public isMini = false;
}
