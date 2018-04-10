import { Observable } from 'rxjs/Rx';

export type PicklistValueType = 'values' | 'valuesets' | 'both';

export class PicklistModel {
    public codeIsSignificant = false;
    public allowValuesets = false;
    public selectedOptions = new PickListOptions(); // options selected in modal
    public optionsSource = new PicklistOptionsSource();
}

export class PicklistOptionsSource {
    public optionsAreLocal = true; // if false, use getOptions function to retrieve options from some external source
    public isPaged = false;
    public options = new PickListOptions();
    public getOptions: (params: RemoteMultiselectQueryParams) => Observable<IFilterComponentValueBase>;
    public getValuesForValueset: (valueSetGuid: string) => Promise<IValueOption[]>;
}

export interface IValueOption { code: string, title: string };
export interface IValueSetOption extends IValueOption { subValues: IValueOption[] };

export class PickListOptions {
    public values: IValueOption[] = [];
    public valueSets: IValueSetOption[] = [];
}

export class FilterableSelectList<T extends SelectListOption> {
    public selectedOptions = new Map<string, T>();
    public lastClickedOption: T | null = null;
    public filteredOptions = new Array<T>();
    public optionFieldsToSearch: Array<string> = ['title'];
    public sortFunc: (a: SelectListOption, b: SelectListOption) => number;
    public isActive = true;

    public additionalRemoteOptions = 0;
    public loadingOptions: Observable<boolean>;
    public appendingOptions: Observable<boolean>;
    constructor(public options = new Map<string, T>()) {}
}

export class SubSelectList extends FilterableSelectList<ValueListOption> {
    public parentValueSet: ValueSetListOption;
}

export class SelectListOption {
    public option: any; // needs to be a class that implements the IListOption interface
    public selected: boolean;
    public code: string;

    constructor(option: any, code: string) {
        this.option = option;
        this.selected = false;
        this.code = code;
    }
}

export class ValueListOption extends SelectListOption {
    public option: IValueOption;
}

export class ValueSetListOption extends SelectListOption {
    public option: IValueSetOption;
    public subValuesSelectList = new SubSelectList();
    public showValues = false;
    public loadingValues = false;

    constructor(option: IValueSetOption, code: string) {
        super(option, code);
        this.subValuesSelectList.parentValueSet = this;
        if (option.subValues && option.subValues.length > 0) {
            new SubSelectList()
        }
    }
}

export class PicklistValueOptions {
    public values = new Map<string, ValueListOption>();
    public valueSets = new Map<string, ValueSetListOption>();
}


// Remote server stuff
export interface IPagedCollection<IT> {
    pagerSettings: IPagerSettings;
    totalItems: number;
    totalPages: number;
    values: IT[];
}
export interface IPageQueryOptionsBase {
    currentPage: number;
    itemsPerPage: number;
}
export interface IPagerSettings {
    currentPage: number;
    itemsPerPage: number;
}
export interface IFilterComponentValueBase {
    componentKey: string;
}
export interface IPagedSelectOptionGroup {
    componentKey: string;
    pagedValues: IPagedCollection<IValueOption>;
}

export interface IValueOptionGroup {
    componentKey: string;
    compatibleValueSets: IValueSetOption[];
    selectOptions: IValueOption[];
}

export interface IValueSetOptionGroup {
    componentKey: string;
    pagedValues: IPagedCollection<IValueOption>;
    pagedValueSets: IPagedCollection<IValueSetOption>;
}

export class RemoteMultiselectQueryParams {
    public valuePagerSettings: IPagerSettings;
    public valueSetPagerSettings: IPagerSettings;
    public valueQueryOptions: MultiselectQueryOptions;
    public valueSetQueryOptions: MultiselectQueryOptions;
}

export class MultiselectQueryOptions {
    public alreadySelected: string[] = [];
    public search: string;
    public shouldSearchCodes: boolean = false;
    public sorting: { field: string; };
}