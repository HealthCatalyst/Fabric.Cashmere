import {Component} from '@angular/core';

@Component({
    selector: 'hc-icon-guide',
    templateUrl: './icon-guide.component.html',
    styleUrls: ['./icon-guide.component.scss']
})
export class IconGuideComponent {
    lastModified: Date = new Date(document.lastModified);
}
