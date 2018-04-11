import { Component, Input } from '@angular/core';

@Component({
    selector: 'hc-progress-dots',
    templateUrl: 'progress-dots.component.html'
})
export class ProgressDotsComponent {
    @Input() public color: 'dark' | 'light' = 'dark';
    @Input() public isCentered = true;
    @Input() public isMini = false;
}