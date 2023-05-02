import { Component } from '@angular/core';
import { SectionService } from '../../shared/section.service';
import { BaseDemoComponent } from '../../shared/base-demo.component';
import { ModalOptions, ModalService } from 'projects/cashmere/src/lib/modal';
import { IconPickerComponent } from './icon-picker/icon-picker.component';

@Component({
    selector: 'hc-products',
    templateUrl: './products-demo.component.html',
    styleUrls: ['./products-demo.component.scss']
})
export class ProductsDemoComponent extends BaseDemoComponent {
    constructor(sectionService: SectionService, private modalService: ModalService) {
        super(sectionService);
    }

    openIconPicker(iconName: string): void {
        const options: ModalOptions = {
            data: iconName,
            closeIcon: true
        };
        this.modalService.open(IconPickerComponent, options);
    }
}
