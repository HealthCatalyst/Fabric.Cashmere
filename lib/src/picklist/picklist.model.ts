import {Observable} from 'rxjs/Rx';
import {PicklistPaneComponent} from './pane/picklist-pane.component';

export type PicklistValueType = 'values' | 'valuesets' | 'both';

export interface IValueOption {
    code: string;
    title: string;
}
export interface IValueSetOption extends IValueOption {
    subValueCount: number;
    subValues: IValueOption[];
}

export interface IPicklistOptions {
    values: IValueOption[];
    valueSets: IValueSetOption[];
}

export interface IPicklistSettings {
    codeIsSignificant?: boolean; // True if code is considered important. If so, search and sorting will use the code. Defaults to false.
    useValuesets?: boolean; // Set to true to use valuesets. Defaults to false.
    showHeaderText?: boolean; // Set to true to show text in the header. Defaults to true.
    leftHeaderText?: string; // Text for left header. Defaults to "Available".
    rightHeaderText?: string; // Text for right header. Defaults to "Selected".
    selected?: IPicklistOptions; // Pre-seed the modal with selected options.
    options?: IPicklistOptionsSource; // Available options in the picklist. Set with local values or callbacks to retrieve remote values.
}

export interface IPicklistOptionsSource {
    values?: IValueOption[]; // Collection values to select from.
    valueSets?: IValueSetOption[]; // Collection valuesets to select from.
    isPaged?: boolean; // Will the results from the server be paged? Defaults to false.
    pageSize?: number; // What size results will be returned from the server? Defaults to 100.
    getOptions?: (params: PicklistRemoteQueryOptions) => Observable<IPicklistRemoteQueryResponse>; // Callback function retrieve values.
    getValuesForValueset?: (code: string) => Observable<IValueOption[]>; // Callback function to retrieve values for a valueset.
}

export class PicklistOptionsSource implements IPicklistOptionsSource {
    public values = new Array<IValueOption>();
    public valueSets = new Array<IValueSetOption>();
    public isPaged = false;
    public pageSize = 100;
    public getOptions?: (params: PicklistRemoteQueryOptions) => Observable<IPicklistRemoteQueryResponse>;
    public getValuesForValueset?: (code: string) => Observable<IValueOption[]>;
    public optionsAreLocal(): boolean {
        return !this.getOptions;
    }
}

export class PicklistSettings implements IPicklistSettings {
    public codeIsSignificant = false;
    public useValuesets = false;
    public showHeaderText = true;
    public leftHeaderText = 'Available';
    public rightHeaderText = 'Selected';
    public selected = {values: new Array<IValueOption>(), valueSets: new Array<IValueSetOption>()}; // options selected in modal
    public options = new PicklistOptionsSource(); // options available for choosing
}

/**
 * Interfaces for Remote Queries
 */
export interface IPagedCollection<IT> {
    pagerSettings: IPageSettings;
    totalItems: number;
    totalPages: number;
    values: IT[];
}

export interface IPageSettings {
    currentPage: number;
    itemsPerPage: number;
}

export interface IPicklistRemoteQueryResponse {
    pagedValues?: IPagedCollection<IValueOption>;
    pagedValueSets?: IPagedCollection<IValueSetOption>;
    values?: Array<IValueOption>;
    valueSets?: Array<IValueSetOption>;
}

export class PicklistRemoteQueryOptions {
    valuePageSettings?: IPageSettings;
    valueSetPageSettings?: IPageSettings;
    constructor(public picklist: IPicklistSettings, public searchTerm: string, public valueTypeToQuery: PicklistValueType) {}
}
