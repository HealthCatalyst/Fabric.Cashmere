##### Loading Values over HTTP

The picklist can be given callback functions to retrieve values and valuesets from a server. This is needed in cases where there are too many items (1,000+) to hold in memory on the browser.

*   `getOptions: (params: PicklistRemoteQueryOptions) => Observable<IPicklistRemoteQueryResponse>;`
*   `getValuesForValueset: (code: string) => Observable<IValueOption[]>;`

#### HTML

```HTML
<hc-picklist [(ngModel)]="myRemoteModel" [settings]="myRemotePicklistSettings"></hc-picklist>
```

#### Typescript

```TypeScript
import { IPicklistSettings } from '@healthcatalyst/cashmere';

// ...

public myremotePicklistSettings: IPicklistSettings = {
    codeIsSignificant: true,
    useValuesets: true,
    options: {
        useValuesets: true,
        options: {
            isPaged: true,
            pageSize: 25,
            getValuesForValueset: (code) => this.fakeService.getValuesForValueset(code),
            getOptions: (params) => this.fakeService.getOptions(params)
        }
    }
};
```

#### Things to Look Out For

*   For the best experience when using the getValue() callback function, it's important to match the picklist's method of searching and sorting. This helps us to avoid unnecessary round trips to the server while maintaining a consistent user experience.
*   When searching, the default is to execute the search on the titles of each value, unless codeIsSignificant is set to true, in which case the codes of values will be searched as well. (Value sets will not be searched by code.) If multiple tokens exist in a search string (i.e, "three search terms"), the code will split up the tokens and only return those values or value sets that contain all three tokens. Review picklist-filter-local.service.spec.ts on github for further details on search.
*   When sorting, the javascript function localCompare() is used. Read more about it on MDN. By default, the picklist will sort by title, unless codeIsSignificant is set to true, in which case values will be sorted by code. (Value sets will still be sorted by title.)
*   When returning values or valuesets from the server, it's important not to return values that are already selected. Otherwise, the counts of total available items or items per page can get out of sync. When implementing getValues(), you'll have access to information about the current state of the picklist, including which values are already selected. See "Interfaces for Loading Values over HTTP" for more details.
*   The picklist has a "select all" button. When values are being loaded via callback, this button will fire off a request asking for all available values (matching the current search term, if there is one) to be returned, up to a limit of 2,000. If the number of total values on the server is above that, then 2,00 will be loaded and the user will be notified that they hit the limit. If "select all" is clicked with the value set tab active, only the current valuesets in the pane will be selected.
*   To see a simplified example of implementing loading values over HTTP, visit the github repo and review the FakeRemoteOptionsService in picklist-demo-data.ts.
