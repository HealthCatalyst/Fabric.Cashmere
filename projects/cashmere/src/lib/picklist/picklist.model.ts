import {Observable} from 'rxjs';

/**
 * @type
 * @ignore
 */
export type PicklistValueType = 'values' | 'valuesets' | 'both';

/** Represents a simple picklist option. */
export interface IValueOption {
    /** Any unique string identifier. */
    code: string;
    /** The name of the option that will be displayed in the UI. */
    title: string;
}

/** Represents a collection or bundle of picklist options. */
export interface IValueSetOption extends IValueOption {
    /** Number of subvalues. Required because of the fact that `subValues` isn't always preloaded. */
    subValueCount: number;
    /** Collection of values in this value set. The code and title of each subvalue should match what
     * is used by the value when used outside of a valueset. Note: The `subValues` array can initially be
     * empty if the `getValuesForValueset` callback function is provided. */
    subValues: IValueOption[];
}

export interface IPicklistOptions {
    /** A collection of values. */
    values: IValueOption[];
    /** A collection of value sets, which may or may not be pre-seeded with its subvalues. */
    valueSets: IValueSetOption[];
}

export interface IPicklistSettings {
    /** True if code is considered important. If so, search and sorting will use the code. *Defaults to false.* */
    codeIsSignificant?: boolean;
    /** Set to true to use valuesets. *Defaults to false.* */
    useValuesets?: boolean;
    /** Set to true to show text in the header. *Defaults to true.* */
    showHeaderText?: boolean;
    /** Text for left header. *Defaults to "Available".* */
    leftHeaderText?: string;
    /** Text for right header. *Defaults to "Selected".* */
    rightHeaderText?: string;
    /** How to sort options in the pane. Options: `asc` | `desc` | `none`; *Defaults to `none`.* */
    sort?: string;
    /** Pre-seed the modal with selected options. */
    selected?: IPicklistOptions;
    /** Available options in the picklist. Set with local values or callbacks to retrieve remote values. */
    options?: IPicklistOptionsSource;
}

export interface IPicklistOptionsSource {
    /** Collection of values to select from. */
    values?: IValueOption[];
    /** Collection of value sets to select from. */
    valueSets?: IValueSetOption[];
    /** Will the results from the server be paged? *Defaults to false.* Not used without `getOptions` callback. */
    isPaged?: boolean;
    /** What size results will be returned from the server? *Defaults to 100.* Not used without `getOptions` callback. */
    pageSize?: number;
    /** Callback function retrieve values. */
    getOptions?: (params: PicklistRemoteQueryOptions) => Observable<IPicklistRemoteQueryResponse>;
    /** Callback function to retrieve values for a value set. */
    getValuesForValueset?: (code: string) => Observable<IValueOption[]>;
}

/**
 * @ignore
 */
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

/**
 * @ignore
 */
export class PicklistSettings implements IPicklistSettings {
    public codeIsSignificant = false;
    public useValuesets = false;
    public showHeaderText = true;
    public leftHeaderText = 'Available';
    public rightHeaderText = 'Selected';
    public sort = 'none';
    public selected = {values: new Array<IValueOption>(), valueSets: new Array<IValueSetOption>()}; // options selected in modal
    public options = new PicklistOptionsSource(); // options available for choosing
}

/** Interface to be used as part of the response when loading values over HTTP. */
export interface IPagedCollection<IT> {
    /** Page being returned in the response, and the number of items per page. */
    pagerSettings: IPageSettings;
    /** Total number of items, including those already on the client or included in this response. */
    totalItems: number;
    /** Total number of pages. */
    totalPages: number;
    /** An array of `IValueOption` or `IValuesetOption`. */
    values: IT[];
}

export interface IPageSettings {
    /** Current page of the request or response. */
    currentPage: number;
    /** Total number of items on a page */
    itemsPerPage: number;
}

/** Interface to be used for the response when loading values over HTTP. This the type your `getOptions()` callback should return. */
export interface IPicklistRemoteQueryResponse {
    /** Paged collection of `IValueOptions`. Only used if this picklist has `optionSource.isPaged` set to true. */
    pagedValues?: IPagedCollection<IValueOption>;
    /** Paged collection of `IValueSetOptions`. Only used if this picklist has `optionSource.isPaged` set to true. */
    pagedValueSets?: IPagedCollection<IValueSetOption>;
    /** An array of `{ code: string, title: string}`. Only used if this picklist has `optionSource.isPaged` set to false. */
    values?: Array<IValueOption>;
    /** An array of `{ code: string, title: string, subValueCount: number, subValues: IValueOption[]}`.
     * Only used if this picklist has `optionSource.isPaged` set to false. Note: The `subValues` array can
     * initially be empty if the `getValuesForValueset` callback function is provided. */
    valueSets?: Array<IValueSetOption>;
}

/** An instance of this class will be sent to the `getOptions()` callback if loading values over HTTP. */
export class PicklistRemoteQueryOptions {
    /** Page and number of items per page requested for values. */
    valuePageSettings?: IPageSettings;
    /** Page and number of items per page requested for value sets. */
    valueSetPageSettings?: IPageSettings;

    constructor(
        /** The settings for this picklist. Particularly, `codeIsSignificant`, `useValuesets`,
         * and selected values will be useful in obtaining the needed values & value sets. */
        public picklist: IPicklistSettings,
        /** Search term entered by the user that triggered the request. */
        public searchTerm: string,
        /** Which types of values should we be getting? */
        public valueTypeToQuery: PicklistValueType
    ) {}
}
