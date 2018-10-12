import {Injectable} from '@angular/core';

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
            title: 'Guidelines for Contribution',
            route: 'contribution-guide',
            document: require('raw-loader!../../../guides/contribution-guide.md')
        },
        {
            title: 'Naming Conventions',
            route: 'naming-conventions',
            document: require('raw-loader!../../../guides/naming-conventions.md')
        },
        {
            title: 'Submit an Issue',
            route: 'submit-an-issue',
            document: require('raw-loader!../../../guides/submit-an-issue.md')
        },
        {
            title: 'Supported Browsers',
            route: 'supported-browsers',
            document: require('raw-loader!../../../guides/supported-browsers.md')
        },
        {
            title: 'Using and Customizing Components',
            route: 'using-customizing-components',
            document: require('raw-loader!../../../guides/using-and-customizing-components.md')
        }
    ];
}
