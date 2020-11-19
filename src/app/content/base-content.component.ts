import { AfterViewInit, Directive } from '@angular/core';
import { SectionService } from '../shared/section.service';

@Directive()
export class BaseContentComponent implements AfterViewInit {
    constructor(protected sectionService: SectionService) {}

    ngAfterViewInit() {
        this.loaded();
    }

    loaded() {
        this.sectionService.scrollToSection();
    }
}
