import {Injectable} from '@angular/core';

export interface DocItem {
    id: string;
    name: string;
    category: 'forms' | 'nav' | 'layout' | 'buttons' | 'popups' | 'table' | 'pipes';
    examples?: string[];
    usageDoc?: boolean;
    hideApi?: boolean;
}

const docs: DocItem[] = [
    {
        id: 'checkbox',
        name: 'Checkbox',
        category: 'forms',
        examples: ['checkbox-standard', 'checkbox-indeterminate', 'checkbox-forms'],
        usageDoc: true
    },
    {id: 'accordion', name: 'Accordion', category: 'layout', examples: ['accordion-overview']},
    {id: 'banner', name: 'Banner', category: 'popups', examples: ['banner-overview']},
    {id: 'breadcrumbs', name: 'Breadcrumbs', category: 'nav', usageDoc: true},
    {
        id: 'button',
        name: 'Button',
        category: 'buttons',
        examples: ['button-type', 'button-split', 'button-size', 'button-anchor', 'button-link', 'button-icon']
    },
    {
        id: 'chip',
        name: 'Chip',
        category: 'buttons',
        examples: ['chip-basic', 'chip-action', 'chip-row', 'chip-singlerow']
    },
    {
        id: 'datepicker',
        name: 'Datepicker',
        category: 'forms',
        examples: ['datepicker', 'datepicker-sugar', 'datepicker-selected-value', 'datepicker-touchui'],
        usageDoc: true
    },
    {
        id: 'date-range',
        name: 'DateRange',
        category: 'forms',
        examples: ['date-range', 'date-range-time'],
        usageDoc: true
    },
    {
        id: 'drawer',
        name: 'Drawer',
        category: 'layout',
        examples: ['drawer-basic', 'drawer-overlay', 'drawer-side', 'drawer-menu']
    },
    {id: 'ellipsis-pipe', name: 'Ellipsis', category: 'pipes', usageDoc: true, hideApi: true, examples: ['ellipsis-overview']},
    {id: 'form-field', name: 'Form Field', category: 'forms', examples: ['form-field-overview']},
    {id: 'icon', name: 'Icon', category: 'buttons', examples: ['icon-overview']},
    {
        id: 'input',
        name: 'Input',
        category: 'forms',
        usageDoc: true,
        examples: ['input-required', 'input-suffix', 'input-prefix', 'input-text-area']
    },
    {id: 'list', name: 'List', category: 'layout', examples: ['list-overview']},
    {id: 'modal', name: 'Modal', category: 'popups', examples: ['modal-overview']},
    {
        id: 'navbar',
        name: 'Navbar',
        category: 'nav',
        examples: ['navbar-overview', 'navbar-app-switcher'],
        usageDoc: true
    },
    {
        id: 'pagination',
        name: 'Pagination',
        category: 'nav',
        usageDoc: true,
        examples: ['pagination-standard', 'pagination-load-more', 'pagination-simple']
    },
    {id: 'picklist', name: 'Picklist', category: 'layout', examples: ['picklist-simple', 'picklist-valueset'], usageDoc: true},
    {
        id: 'pop',
        name: 'Popover',
        category: 'popups',
        examples: ['popover-simple', 'popover-menu', 'popover-tooltip', 'popover-right-click', 'popover-overview'],
        usageDoc: true
    },
    {
        id: 'progress-indicators',
        name: 'Progress Indicators',
        category: 'buttons',
        examples: ['progress-spinner', 'progress-dots'],
        usageDoc: true
    },
    {
        id: 'radio-button',
        name: 'Radio Button',
        category: 'forms',
        examples: ['radio-button-standard', 'radio-button-disabled', 'radio-button-forms'],
        usageDoc: true
    },
    {
        id: 'scroll-nav',
        name: 'ScrollNav',
        category: 'nav',
        examples: ['scroll-nav']
    },
    {
        id: 'select',
        name: 'Select',
        category: 'forms',
        examples: ['select-standard', 'select-disabled', 'select-validation', 'select-forms'],
        usageDoc: true
    },
    {id: 'sort', name: 'Sort', category: 'table', usageDoc: true},
    {id: 'subnav', name: 'Subnav', category: 'nav', examples: ['subnav-overview']},
    {
        id: 'table',
        name: 'Table',
        category: 'table',
        examples: ['resizable-columns', 'table-sort', 'table-filter'],
        usageDoc: true
    },
    {
        id: 'tabs',
        name: 'Tabs',
        category: 'layout',
        examples: ['tabs-horizontal', 'tabs-vertical']
    },
    {id: 'tile', name: 'Tile', category: 'layout', examples: ['tile-overview']},
    {id: 'toaster', name: 'Toaster Messages', category: 'popups', examples: ['toaster-overview']},
    {
        id: 'typeform-survey',
        name: 'Typeform Survey',
        category: 'popups',
        examples: ['typeform-survey-overview'],
        usageDoc: true
    }
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
