import { Observable } from 'rxjs/Rx';
import { PicklistPaneComponent } from './pane/picklist-pane.component'

export type PicklistValueType = 'values' | 'valuesets' | 'both';

export interface IValueOption { code: string, title: string };
export interface IValueSetOption extends IValueOption { subValues: IValueOption[] };

export interface IPicklistOptions {
    values: IValueOption[];
    valueSets: IValueSetOption[];
}

export interface IPicklistTransferParams {
    source: PicklistPaneComponent;
    destination: PicklistPaneComponent;
}

export interface IPicklistSettings {
    codeIsSignificant?: boolean;
    useValuesets?: boolean;
    selected?: IPicklistOptions; // options selected in modal
    options: IPicklistOptionsSource; // options available for choosing
}

export interface IPicklistOptionsSource {
    values?: IValueOption[];
    valueSets?: IValueSetOption[];
    isPaged?: boolean;
    getOptions?: (params: PicklistRemoteQueryOptions) => Observable<IPicklistRemoteQueryResponse>;
    getValuesForValueset?: (code: string) => Observable<IValueOption[]>;
}

export class PicklistSettings implements IPicklistSettings {
    public codeIsSignificant = false;
    public useValuesets = false;
    public selected = { values: new Array<IValueOption>(), valueSets: new Array<IValueSetOption>() }; // options selected in modal
    public options = new PicklistOptionsSource(); // options available for choosing
}

export class PicklistOptionsSource implements IPicklistOptionsSource {
    public values = new Array<IValueOption>();
    public valueSets = new Array<IValueSetOption>()
    public isPaged = false;
    public getOptions?: (params: PicklistRemoteQueryOptions) => Observable<IPicklistRemoteQueryResponse>;
    public getValuesForValueset?: (code: string) => Observable<IValueOption[]>;
    public optionsAreLocal(): boolean { return (this.values && this.values.length > 0) || (this.valueSets && this.valueSets.length > 0) }
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
    values?: Array<IValueOption>,
    valueSets?: Array<IValueSetOption>
}

export class PicklistRemoteQueryOptions {
    valuePageSettings?: IPageSettings;
    valueSetPageSettings?: IPageSettings;
    constructor(
        public picklist: IPicklistSettings,
        public searchTerm: string,
        public valueTypeToQuery: PicklistValueType) {}
}