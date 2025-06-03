import {Component} from '@angular/core';
import {SectionService} from '../../shared/section.service';
import {BaseDemoComponent} from '../../shared/base-demo.component';
import { ICON_OPTIONS, IconCategory } from './v2-icon-metadata';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'hc-icon-guide-v2',
    templateUrl: './icon-guide-v2.component.html',
    styleUrls: ['./icon-guide-v2.component.scss'],
    standalone: false
})
export class IconGuideV2Component extends BaseDemoComponent {
    iconLibrary = ICON_OPTIONS;
    iconCategories: IconCategory[] = [];
    readonly isGridView = new FormControl(true, {nonNullable: true});
    constructor(sectionService: SectionService) {
        super(sectionService);
        const iconCatsMap = {};
        this.iconLibrary.forEach(icon => {
            if (!iconCatsMap[icon.category]) {
                iconCatsMap[icon.category] = { name: icon.category, icons: []};
            }
            iconCatsMap[icon.category].icons.push(icon);
        });
        this.iconCategories = Object.values(iconCatsMap);
        this.iconCategories.forEach(cat => {
            cat.count = cat.icons.length;
        })
    }
}
