:::

##### Simple Picklist

For the simplest usage, provide an array of unique strings as options.

```html
<hc-picklist
    [(ngModel)]="mySimpleModel"
    [simpleOptions]="['North', 'South', 'East', 'West']">
</hc-picklist>
```

:::

:::

##### Using More Advanced Values & Value Sets

You can pass more advanced configuration into `[settings]` to take advantage of value sets, values with unique ids, and other options.
See `IPicklistSettings` for more detail on available settings.

#### HTML

```html
<hc-picklist [(ngModel)]="myLocalModel" [settings]="myLocalPicklistSettings"></hc-picklist>
```

#### TypeScript

```typescript
import { IPicklistSettings } from '@healthcatalyst/cashmere';

// ...

public myLocalPicklistSettings: IPicklistSettings = {
    codeIsSignificant: true,
    useValuesets: true,
    options: {
        values: [
            { code: '001', title: 'Cholera'},
            { code: '002', title: 'Typhoid'},
            { code: '003', title: 'Salmonella infection'},
            { code: '004', title: 'Shigellosis'},
        ],
        valueSets: [
            {   code: 'VS1',
                subValueCount: 2,
                subValues: [{ code: '001', title: 'Cholera'}, { code: '002', title: 'Typhoid'}],
                title: 'Cholera & Typhoid'
            },
        ]
    }
};
```

You can also set picklist settings in your TypeScript code:

```typescript
@ViewChild(PicklistComponent) public myPicklist: PicklistComponent;

this.myPicklist.reset(myLocalPicklistSettings)
```

:::

:::

##### Loading Values over HTTP

The picklist can be given callback functions to retrieve values and valuesets from a server. This is needed in cases where there
are too many items (1,000+) to hold in memory on the browser.

*   `getOptions: (params: PicklistRemoteQueryOptions) => Observable<IPicklistRemoteQueryResponse>;`
*   `getValuesForValueset: (code: string) => Observable<IValueOption[]>;`

#### HTML

```html
<hc-picklist [(ngModel)]="myRemoteModel" [settings]="myRemotePicklistSettings"></hc-picklist>
```

#### TypeScript

```typescript
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

*   For the best experience when using the `getValue()` callback function, it's important to match the picklist's method of searching and sorting.
    This helps us to avoid unnecessary round trips to the server while maintaining a consistent user experience.
    *   When searching, the default is to execute the search on the titles of each value, unless `codeIsSignificant` is set to true, in which case
        the codes of values will be searched as well. (Value sets **will not** be searched by code.) If multiple tokens exist in a search string (i.e, "three search terms"), the code will split up the tokens and only return those values or value sets that contain **all three tokens**. Review `picklist-filter-local.service.spec.ts` on [github](https://github.com/HealthCatalyst/Fabric.Cashmere) for further details on search.
    *   When sorting, the javascript function `localCompare()` is used.
        [Read more about it on MDN.](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare)
        By default, the picklist will sort by title, unless `codeIsSignificant` is set to true,
        in which case values will be sorted by code. (Value sets will still be sorted by title.)
*   When returning values or valuesets from the server, it's important not to return values that are **already selected.** Otherwise, the counts of
    total available items or items per page can get out of sync. When implementing `getValues()`, you'll have access to information about the current
    state of the picklist, including which values are already selected. See "Interfaces for Loading Values over HTTP" for more details.
*   The picklist has a "select all" button. When values are being loaded via callback, this button will fire off a request asking for all available values (matching the current search term, if there is one) to be returned, up to a limit of 2,000. If the number of total values on the server is above that, then 2,00 will be loaded and the user will be notified that they hit the limit. If "select all" is clicked with the value set tab active, only the current valuesets in the pane will be selected.
*   To see a simplified example of implementing loading values over HTTP, [visit the github repo](https://github.com/HealthCatalyst/Fabric.Cashmere) and review the `FakeRemoteOptionsService` in `picklist-demo-data.ts`.
    :::

:::

##### Picklist Component

| Property                 | Type                                              | Description                                                                                                                    |
| ------------------------ | ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| @Input() settings        | `IPicklistSettings`                               | Settings for the picklist. Internally, this will trigger a call to `reset()`.                                                  |
| @Input() simpleOptions   | string[]                                          | An array of unique strings to be used as the picklist options.                                                                 |
| @Input() showHeaderText  | boolean                                           | Set to true to show text in the header. _Defaults to true._                                                                    |
| @Input() leftHeaderText  | string                                            | Text for left header. _Defaults to "Available"._                                                                               |
| @Input() rightHeaderText | string                                            | Text for right header. _Defaults to "Selected"._                                                                               |
| @Output() changed        | `EventEmitter`                                    | Emits when the value changes.                                                                                                  |
| value                    | `IPicklistOptions` &verbar; string[]              | If `simpleOptions` are being used, this will be an array of the selected strings. Otherwise, you'll get `IPicklistOptions`.    |
| reset()                  | (settings: `IPicklistSettings`) => void           | Will reset the picklist with the given settings. _Will reset values passed in via an `@Input` as well._                        |
| update()                 | (settings: `IPicklistSettings`) => void           | Will update the picklist with the given settings, maintaining any previous settings that have not been overridden.             |
| setActiveValueType()     | (type: `'values'` &verbar; `'valuesets'`) => void | Will change the active tab. (Will do nothing if `settings.useValuesets` is false.)                                             |
| moveSelectedItems()      | (pane: `PicklistPaneComponent`) => void           | Will move all selected items from the given pane into its companion pane. Used internally by the left and right arrow buttons. |

:::

:::

##### Settings

#### IPicklistSettings

| Property           | Type                     | Description                                                                                                                                                                                                                                                                                                                                                             |
| ------------------ | ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| codeIsSignificant? | boolean                  | True if code is considered important for values, like ICD codes for diagnoses. If it is, the code will be displayed in the UI, searches will look at the `code` property in addition to the `title` property, and sorting for will based on code instead of alphabetically by title. _Defaults to false._ **All of the above apply only to values, not to value sets.** |
| useValuesets?      | boolean                  | Set to true to use valuesets. _Defaults to false._                                                                                                                                                                                                                                                                                                                      |
| showHeaderText?    | boolean                  | Set to true to show text in the header. _Defaults to true._                                                                                                                                                                                                                                                                                                             |
| leftHeaderText?    | string                   | Text for left header. _Defaults to "Available"._                                                                                                                                                                                                                                                                                                                        |
| rightHeaderText?   | string                   | Text for right header. _Defaults to "Selected"._                                                                                                                                                                                                                                                                                                                        |
| selected?          | `IPicklistOptions`       | Pre-seed the picklist with selected options.                                                                                                                                                                                                                                                                                                                            |
| options?           | `IPicklistOptionsSource` | Options available in the picklist. Set with local values or callbacks to retrieve remote values.                                                                                                                                                                                                                                                                        |

#### IPicklistOptions

| Property  | Type                | Description                                                                        |
| --------- | ------------------- | ---------------------------------------------------------------------------------- |
| values    | `IValueOption[]`    | A collection of values.                                                            |
| valueSets | `IValueSetOption[]` | A collection of value sets, which may or may not be pre-seeded with its subvalues. |

#### IValueOptions

| Property | Type   | Description                |
| -------- | ------ | -------------------------- |
| code     | string | Unique code for the value. |
| title    | string | Title for the value.       |

#### IValueSetOptions

| Property      | Type             | Description                                                                                                                                                                                                                                                                 |
| ------------- | ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| code          | string           | Unique code for the value set.                                                                                                                                                                                                                                              |
| title         | string           | Title for the value set.                                                                                                                                                                                                                                                    |
| subValues     | `IValueOption[]` | Collection of subvalues in this valueset. The code and title of each subvalue should match what is used by the value when used outside of a valueset. **Note**: The `subValues` array can initially be empty _if_ the `getValuesForValueset` callback function is provided. |
| subValueCount | number           | Number of subvalues. Required because of the fact that subvalues aren't always preloaded.                                                                                                                                                                                   |

#### IPicklistOptionsSource

| Property              | Type                                                                                       | Description                                                                                                                                                         |
| --------------------- | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| values?               | `IValueOption[]`                                                                           | Collection of values to select from.                                                                                                                                |
| valueSets?            | `IValueSetOption[]`                                                                        | Collection of valuesets to select from.                                                                                                                             |
| isPaged?              | boolean                                                                                    | Will the results from the server be paged? _Defaults to false._ Not used without `getOptions` callback.                                                             |
| pageSize?             | number                                                                                     | What size results will be returned from the server? _Defaults to 100._ Not used without `getOptions` callback.                                                      |
| getOptions?           | (params: `PicklistRemoteQueryOptions`) => Observable&lt;`IPicklistRemoteQueryResponse`&gt; | Callback function to retrieve values. Return values and/or valuesets, which may or may not be paged. See "Interfaces for Loading Values over HTTP" for more detail. |
| getValuesForValueset? | (code: string) => Observable&lt;`IValueOption[]`&gt;                                       | Callback function to retrieve values for a valueset.                                                                                                                |

:::

:::

##### Interfaces for Loading Values over HTTP

#### Class: PicklistRemoteQueryOptions

| Property              | Type                                                                                       | Description                                                                                                                                                         |
| --------------------- | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| valuePageSettings?    | `IPageSettings`                                                                            | Page and number of items per page requested for values.                                                                                                             |
| valueSetPageSettings? | `IPageSettings`                                                                            | Page and number of items per page requested for value sets.                                                                                                         |
| picklist              | `IPicklistSettings`                                                                        | The settings for this picklist. Particularly, `codeIsSignificant`, `useValuesets`, and `selected` values will be useful in obtaining the needed values & valuesets. |
| searchTerm            | string                                                                                     | Search term entered by the user that triggered the request.                                                                                                         |
| valueTypeToQuery      | `'values'` &verbar; `'valuesets'` &verbar; `'both'`                                        | Which types of values should we be getting?                                                                                                                         |
| constructor           | (picklist: `IPicklistSettings`, searchTerm: string, valueTypeToQuery: `PicklistValueType`) | Constructor with the required properties as parameters.                                                                                                             |

#### IPicklistRemoteQueryResponse

| Property        | Type                                | Description                                                                                                                                                                                                                                                                                  |
| --------------- | ----------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| pagedValues?    | `IPagedCollection<IValueOption>`    | Paged collection of `IValueOptions`. Only used if this picklist has `optionSource.isPaged` set to true.                                                                                                                                                                                      |
| pagedValueSets? | `IPagedCollection<IValueSetOption>` | Paged collection of `IValueSetOptions`. Only used if this picklist has `optionSource.isPaged` set to true.                                                                                                                                                                                   |
| values?         | `IValueOption[]`                    | An array of `{ code: string, title: string}`. Only used if this picklist has `optionSource.isPaged` set to false.                                                                                                                                                                            |
| valueSets?      | `IValueSetOption[]`                 | An array of `{ code: string, title: string, subValueCount: number, subValues: IValueOption[]}`. Only used if this picklist has `optionSource.isPaged` set to false. <br> **Note**: The subValues array can initially be empty _if_ the `getValuesForValueset` callback function is provided. |

#### IPagedCollection&lt;T&gt;

| Property      | Type          | Description                                                                                |
| ------------- | ------------- | ------------------------------------------------------------------------------------------ |
| pagerSettings | IPageSettings | Page being returned in the response, and the number of items per page.                     |
| totalItems    | number        | Total number of items, including those already on the client or included in this response. |
| totalPages    | number        | Total number of pages.                                                                     |
| values        | `T[]`         | An array of `IValueOption` or `IValuesetOption`.                                           |

#### IPageSettings

| Property     | Type   | Description                              |
| ------------ | ------ | ---------------------------------------- |
| currentPage  | number | Current page of the request or response. |
| itemsPerPage | number | Total number of items on a page.         |

:::
