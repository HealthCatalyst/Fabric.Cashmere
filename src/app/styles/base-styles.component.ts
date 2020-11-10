import {AfterViewInit} from '@angular/core';
import {SectionService} from '../shared/section.service';

export class BaseStylesComponent implements AfterViewInit {
    constructor(protected sectionService: SectionService) {}

    ngAfterViewInit() {
        this.loaded();
    }

    protected loaded() {
        this.sectionService.scrollToSection();
    }
}
