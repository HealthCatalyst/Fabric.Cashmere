import {HcSort, HcSortable} from './sort';

describe('HcSort', () => {
    const name: HcSortable = {id: 'name', start: 'asc', disableClear: true};
    const weight: HcSortable = {id: 'weight', start: 'desc', disableClear: true};
    const date: HcSortable = {id: 'date', start: 'asc', disableClear: true};

    it('cycles an active multi-sort without an off state', () => {
        const sort = new HcSort();
        sort.multiSort = true;
        sort.sort(name);
        sort.sort(name);
        expect(sort.sorts).toEqual([{active: 'name', direction: 'desc', priority: 1}]);
        sort.sort(name);
        expect(sort.sorts).toEqual([{active: 'name', direction: 'asc', priority: 1}]);
    });

    it('limits multi-sort state to two columns', () => {
        const sort = new HcSort();
        sort.multiSort = true;
        sort.sort(name);
        sort.addSecondarySort(weight);
        sort.addSecondarySort(date);
        expect(sort.sorts).toEqual([
            {active: 'name', direction: 'asc', priority: 1},
            {active: 'weight', direction: 'desc', priority: 2}
        ]);
    });

    it('adds an unsorted header as the secondary sort', () => {
        const sort = new HcSort();
        sort.sort(name);
        sort.multiSort = true;

        sort.sort(weight);

        expect(sort.sorts).toEqual([
            {active: 'name', direction: 'asc', priority: 1},
            {active: 'weight', direction: 'desc', priority: 2}
        ]);
    });

    it('swaps priorities immediately', () => {
        const sort = new HcSort();
        sort.multiSort = true;
        sort.sort(name);
        sort.addSecondarySort(weight);
        sort.setSortPriority('weight', 1);
        expect(sort.sorts).toEqual([
            {active: 'weight', direction: 'desc', priority: 1},
            {active: 'name', direction: 'asc', priority: 2}
        ]);
    });

    it('sets an unsorted multi-sort column as the primary sort direction', () => {
        const sort = new HcSort();
        sort.multiSort = true;

        sort.setSortDirection(name, 'desc');

        expect(sort.sorts).toEqual([{active: 'name', direction: 'desc', priority: 1}]);
    });

    it('syncs multi-sort state when active and direction inputs change', () => {
        const sort = new HcSort();
        sort.multiSort = true;
        sort.active = 'name';
        sort.direction = 'asc';
        sort.ngOnInit();

        sort.active = 'weight';
        sort.direction = 'desc';
        sort.ngOnChanges();

        expect(sort.sorts).toEqual([{active: 'weight', direction: 'desc', priority: 1}]);
    });

    it('keeps the secondary sort when removing the primary sort', () => {
        const sort = new HcSort();
        sort.multiSort = true;
        sort.sort(name);
        sort.addSecondarySort(weight);

        sort.removeSort('name');

        expect(sort.sorts).toEqual([{active: 'weight', direction: 'desc', priority: 1}]);
    });

    it('keeps the primary sort when removing the secondary sort', () => {
        const sort = new HcSort();
        sort.multiSort = true;
        sort.sort(name);
        sort.addSecondarySort(weight);

        sort.removeSort('weight');

        expect(sort.sorts).toEqual([{active: 'name', direction: 'asc', priority: 1}]);
    });

    it('ignores invalid priority changes', () => {
        const sort = new HcSort();
        sort.multiSort = true;
        sort.sort(name);
        sort.addSecondarySort(weight);

        sort.setSortPriority('weight', 3);
        sort.setSortPriority('unknown', 1);

        expect(sort.sorts).toEqual([
            {active: 'name', direction: 'asc', priority: 1},
            {active: 'weight', direction: 'desc', priority: 2}
        ]);
    });

    it('does not remove the final active sort', () => {
        const sort = new HcSort();
        sort.multiSort = true;
        sort.sort(name);
        sort.removeSort('name');
        expect(sort.sorts).toEqual([{active: 'name', direction: 'asc', priority: 1}]);
    });
});
