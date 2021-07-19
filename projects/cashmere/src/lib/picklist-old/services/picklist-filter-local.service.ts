import {Injectable} from '@angular/core';
import {FilterableSelectList, SelectListOption} from '../pane/picklist-pane.model';

@Injectable()
export class PicklistFilterLocalService {
    public filter<T extends SelectListOption>(list: FilterableSelectList<T>, searchTokens: string[]): void {
        list.filteredOptions = [];
        list.options.forEach(item => {
            if (this.itemHasSearchTokens(list, item, searchTokens)) {
                list.filteredOptions.push(item);
            }
        });
        if (list.sort !== "none") {
            list.filteredOptions.sort(this.getSortFunc(list));
        }
    }

    public itemHasSearchTokens<T extends SelectListOption>(list: FilterableSelectList<T>, item: T, searchTokens: string[]): boolean {
        const valuesToSearchIn = [item.option.title, list.codeIsSignificant ? item.option.code : ''];
        valuesToSearchIn.filter(val => !!val);
        return searchTokens.every(token => valuesToSearchIn.some(value => value.toLocaleLowerCase().indexOf(token) > -1));
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private getSortFunc<T extends SelectListOption>(list: FilterableSelectList<T>): (a: any, b: any) => number {
        const sortField = list.codeIsSignificant ? 'code' : 'title';
        return (a, b) => a.option[sortField].localeCompare(b.option[sortField]) * (list.sort === "asc" ? -1 : 1);
    }
}
