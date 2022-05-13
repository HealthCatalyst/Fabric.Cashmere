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
    npmPackage?: string;
}

export type DocItemType = 'components';

const cashmereComponents: DocItem[] = Object.keys(cashmereComponentsDocumentItems)
    .filter(name => name !== '$schema')
    .map(name => ({...cashmereComponentsDocumentItems[name], id: name}));

@Injectable()
export class DocumentItemsService {
    getDocItems(type: DocItemType): DocItem[] {
        switch (type) {
            case 'components':
                return cashmereComponents;
            default:
                throw new Error(`Unrecognized doc type: ${type}`);
        }
    }

    getDocItemById(id: string, type: DocItemType): DocItem | undefined {
        const items = this.getDocItems(type);
        return items.find(doc => doc.id === id);
    }
}
