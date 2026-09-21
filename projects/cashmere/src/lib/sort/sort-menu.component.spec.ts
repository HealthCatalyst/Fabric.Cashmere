import {HcSort} from './sort';
import {HcSortMenuComponent} from './sort-menu.component';

describe('HcSortMenuComponent', () => {
    const name = {id: 'name', start: 'asc' as const, disableClear: true};
    const age = {id: 'age', start: 'desc' as const, disableClear: true};

    it('sets direction through the existing single-sort API', () => {
        const sort = new HcSort();
        const menu = new HcSortMenuComponent();
        menu.sort = sort;
        menu.sortable = name;
        menu.sortDescending();
        expect(sort.active).toBe('name');
        expect(sort.direction).toBe('desc');
    });

    it('adds and removes a secondary sort', () => {
        const sort = new HcSort();
        sort.multiSort = true;
        sort.sort(name);
        const menu = new HcSortMenuComponent();
        menu.sort = sort;
        menu.sortable = age;
        expect(menu.canAddSecondarySort).toBe(true);
        menu.addSecondarySort();
        expect(menu.canRemoveSort).toBe(true);
        menu.removeSort();
        expect(sort.sorts).toHaveSize(1);
    });
});
