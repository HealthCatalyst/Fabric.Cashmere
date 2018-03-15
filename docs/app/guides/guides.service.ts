import { Injectable } from '@angular/core';

export interface IGuide {
    title: string;
    route: string;
    document: string;
}

@Injectable()
export class GuidesService {
    public guides: IGuide[] = [
        {
            title: 'Getting Started',
            route: 'getting-started',
            document: require('raw-loader!../../../guides/getting-started.md')
        },
        {
            title: 'Contribution Guide',
            route: 'contribution-guide',
            document: require('raw-loader!../../../guides/contribution-guide.md')
        },
        {
            title: 'Supported Browsers',
            route: 'supported-browsers',
            document: require('raw-loader!../../../guides/supported-browsers.md')
        }
    ];
}