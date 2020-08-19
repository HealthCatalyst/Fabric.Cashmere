import {Injectable} from '@angular/core';

export interface IGuide {
    title: string;
    route: string;
    // Categories are: 'using' and 'dev'
    category: string;
    document: string;
}

@Injectable()
export class GuidesService {
    public guides: IGuide[] = [
        {
            title: 'Getting Started',
            route: 'getting-started',
            category: 'using',
            document: require('raw-loader!../../../guides/getting-started.md')
        },
        {
            title: 'Guidelines for Contribution',
            route: 'contribution-guide',
            category: 'dev',
            document: require('raw-loader!../../../guides/contribution-guide.md')
        },
        {
            title: 'Naming Conventions',
            route: 'naming-conventions',
            category: 'dev',
            document: require('raw-loader!../../../guides/naming-conventions.md')
        },
        {
            title: 'Submit an Issue',
            route: 'submit-an-issue',
            category: 'using',
            document: require('raw-loader!../../../guides/submit-an-issue.md')
        },
        {
            title: 'Supported Browsers',
            route: 'supported-browsers',
            category: 'using',
            document: require('raw-loader!../../../guides/supported-browsers.md')
        },
        {
            title: 'Supported Angular Versions',
            route: 'supported-angular-versions',
            category: 'using',
            document: require('raw-loader!../../../guides/supported-angular-versions.md')
        },
        {
            title: 'Customizing Components',
            route: 'using-customizing-components',
            category: 'dev',
            document: require('raw-loader!../../../guides/using-customizing-components.md')
        },
        {
            title: 'Working with Examples',
            route: 'working-with-examples',
            category: 'dev',
            document: require('raw-loader!../../../guides/working-with-examples.md')
        }
    ];
}
