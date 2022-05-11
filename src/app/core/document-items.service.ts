import {Injectable} from '@angular/core';
import * as cashmereComponentsDocumentItems from './cashmere-components-document-items.json';

export type DocItemCategory = 'forms' | 'nav' | 'layout' | 'buttons' | 'popups' | 'table' | 'pipes';

export interface DocItem {
    id: string;
    name: string;
    category: DocItemCategory;
    examples: string[];
    usageDoc?: boolean;
    hideApi?: boolean;
}

const cashmereComponents: DocItem[] = Object.keys(cashmereComponentsDocumentItems)
    .filter(name => name !== '$schema')
    .map(name => ({...cashmereComponentsDocumentItems[name], id: name}));

@Injectable()
export class DocumentItemsService {
    getDocItems(): DocItem[] {
        return cashmereComponents;
    }

    getDocItemById(id: string): DocItem | undefined {
        const items = this.getDocItems();
        return items.find(doc => doc.id === id);
    }
}
