import {
    FilterableSelectList,
    SubSelectList,
    SelectListOption,
    IFilterComponentValueBase,
    IPagedSelectOptionGroup,
    IValueSetOptionGroup } from './picklist.model';

export function isSubList(model: FilterableSelectList<SelectListOption>): model is SubSelectList {
    const subList = (<SubSelectList>model);
    return subList && subList.parentValueSet !== undefined;
}

export function isPaged(model: IFilterComponentValueBase): model is IPagedSelectOptionGroup {
    const pagedOptions = (<IPagedSelectOptionGroup>model);
    return pagedOptions && pagedOptions.pagedValues !== undefined;
}

export function isPagedWithValueSets(model: IFilterComponentValueBase): model is IValueSetOptionGroup {
    const pagedOptions = (<IValueSetOptionGroup>model);
    return pagedOptions && pagedOptions.pagedValues !== undefined && pagedOptions.pagedValueSets !== undefined;
}