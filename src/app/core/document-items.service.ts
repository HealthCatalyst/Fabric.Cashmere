import {Injectable} from '@angular/core';

export interface DocItem {
    id: string;
    name: string;
    examples?: string[];
    usageDoc?: boolean;
}

const docs: DocItem[] = [
    {id: 'accordion', name: 'Accordion', examples: ['accordion-overview']},
    {id: 'breadcrumbs', name: 'Breadcrumbs', usageDoc: true},
    {
        id: 'button',
        name: 'Button',
        examples: ['button-primary', 'button-split', 'button-secondary', 'button-disabled', 'button-anchor', 'button-link', 'button-icon']
    },
    {
        id: 'checkbox',
        name: 'Checkbox',
        examples: ['checkbox-standard', 'checkbox-disabled', 'checkbox-forms']
    },
    {
        id: 'chip',
        name: 'Chip',
        examples: ['chip-basic', 'chip-action', 'chip-row', 'chip-singlerow']
    },
    {
        id: 'drawer',
        name: 'Drawer',
        examples: ['drawer-basic', 'drawer-overlay', 'drawer-side', 'drawer-menu']
    },
    {id: 'icon', name: 'Icon', examples: ['icon-overview']},
    {
        id: 'input',
        name: 'Input',
        usageDoc: true,
        examples: ['input-required', 'input-suffix', 'input-prefix', 'input-disabled']
    },
    {id: 'list', name: 'List', examples: ['list-overview']},
    {id: 'modal', name: 'Modal', examples: ['modal-overview']},
    {id: 'navbar', name: 'Navbar', examples: ['navbar-overview']},
    {
        id: 'pagination',
        name: 'Pagination',
        usageDoc: true,
        examples: ['pagination-overview']
    },
    {id: 'picklist', name: 'Picklist', examples: ['picklist-simple', 'picklist-valueset'], usageDoc: true},
    {
        id: 'popover',
        name: 'Popover',
        examples: ['popover-overview', 'popover-placement', 'popover-dynamic']
    },
    {id: 'progress-indicators', name: 'Progress Indicators', examples: ['progress-spinner', 'progress-dots'], usageDoc: true},
    {
        id: 'radio-button',
        name: 'Radio button',
        examples: ['radio-button-standard', 'radio-button-disabled', 'radio-button-forms']
    },
    {
        id: 'select',
        name: 'Select',
        examples: ['select-standard', 'select-disabled', 'select-validation']
    },
    {
        id: 'sort',
        name: 'Sort',
        usageDoc: true
    },
    {id: 'subnav', name: 'Subnav', examples: ['subnav-overview']},
    {
        id: 'table',
        name: 'Table',
        examples: ['table-overview', 'table-sort', 'table-filter'],
        usageDoc: true
    },
    {
        id: 'tabs',
        name: 'Tabs',
        examples: ['tabs-horizontal', 'tabs-vertical']
    },
    {id: 'tile', name: 'Tile', examples: ['tile-overview']},
    {id: 'typeform-survey', name: 'Typeform survey', examples: ['typeform-survey-overview']}
];

@Injectable()
export class DocumentItemsService {
    getDocItems(): DocItem[] {
        return docs;
    }

    getItemById(id: string): DocItem | undefined {
        return docs.find(doc => doc.id === id);
    }
}
