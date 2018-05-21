import {Observable} from 'rxjs/Rx';
import {IValueOption, IValueSetOption} from '../picklist.model';

export class FilterableSelectList<T extends SelectListOption> {
    public selectedOptions = new Map<string, T>();
    public lastClickedOption: T | null = null;
    public filteredOptions = new Array<T>();
    public isActive = true;

    public additionalRemoteOptions = 0;
    public loadingOptions: Observable<boolean> = Observable.from([]);
    public appendingOptions: Observable<boolean> = Observable.from([]);
    public codeIsSignificant: boolean = false;
    constructor(public options = new Map<string, T>()) {}
}

export class SubSelectList extends FilterableSelectList<ValueListOption> {
    constructor(public parentValueSet: ValueSetListOption, public options = new Map<string, ValueListOption>()) {
        super(options);
    }
}

export function isSubList(model: FilterableSelectList<SelectListOption>): model is SubSelectList {
    const subList = <SubSelectList>model;
    return subList && subList.parentValueSet !== undefined;
}

export class SelectListOption {
    public selected: boolean;

    constructor(public option: any, public code: string) {
        this.selected = false;
    }
}

export class ValueListOption extends SelectListOption {
    constructor(option: IValueOption, code: string) {
        super(option, code);
    }
}

export class ValueSetListOption extends SelectListOption {
    public subValuesSelectList: SubSelectList;
    public showValues = false;
    public loadingValues = false;

    constructor(option: IValueSetOption, code: string) {
        super(option, code);
        this.subValuesSelectList = new SubSelectList(this);
    }
}

export class PicklistValueOptions {
    public values = new Map<string, ValueListOption>();
    public valueSets = new Map<string, ValueSetListOption>();
}
