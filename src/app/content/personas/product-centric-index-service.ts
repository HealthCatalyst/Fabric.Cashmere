import {Injectable} from '@angular/core';
export interface ProductFile {
    title: string;
    route: string;
    // types are: 'internal' and 'external'
    type: string;
    document: string;
}

@Injectable()
export class ProductCentricIndexService {
    public productPersonasLists: ProductFile[] = [
        {
            title: 'Healthcare.AI',
            route: 'healthcare-ai',
            type: 'npi-app',
            document: require('raw-loader!../../../../guides/content/products/healthcare-ai.md')
        },
        {
            title: 'healthfinch',
            route: 'healthfinch',
            type: 'npi-app',
            document: require('raw-loader!../../../../guides/content/products/healthfinch.md')
        }
    ];
}
