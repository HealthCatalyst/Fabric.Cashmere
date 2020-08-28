import {Injectable} from '@angular/core';
import * as cashmereComponentsDocumentItems from './cashmere-components-document-items.json';
import * as cashmereBitsDocumentItems from './cashmere-bits-document-items.json';

export type DocItemCategory = 'forms' | 'nav' | 'layout' | 'buttons' | 'popups' | 'table' | 'pipes';

export interface DocItem {
    id: string;
    name: string;
    category: DocItemCategory;
    examples: string[];
    usageDoc?: boolean;
    hideApi?: boolean;
}

export type DocItemType = 'components' | 'bits';

const cashmereComponents: DocItem[] = Object.keys(cashmereComponentsDocumentItems)
    .filter(name => name !== '$schema')
    .map(name => ({...cashmereComponentsDocumentItems[name], id: name}));
const cashmereBits: DocItem[] = Object.keys(cashmereBitsDocumentItems)
    .filter(name => name !== '$schema')
    .map(name => ({...cashmereBitsDocumentItems[name], id: name}));

@Injectable()
export class DocumentItemsService {
    getDocItems(type: DocItemType): DocItem[] {
        switch (type) {
            case 'components':
                return cashmereComponents;
            case 'bits':
                return cashmereBits;
            default:
                throw new Error(`Unrecognized doc type: ${type}`);
        }
    }

    getDocItemById(id: string, type: DocItemType): DocItem | undefined {
        const items = this.getDocItems(type);
        return items.find(doc => doc.id === id);
    }
}
