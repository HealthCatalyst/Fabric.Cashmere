import { ItemsList } from './items-list';
import { PickPaneComponent } from './pick-pane.component';
import { DefaultSelectionModel } from './selection-model';
import { PickPaneDragService } from './pick-pane-drag.service';
import { Picklist2Service } from '../picklist2.service';
import { PickOption } from '../pick.types';
import { ChangeDetectorRef } from '@angular/core';

let list: ItemsList;
let cmp: PickPaneComponent;

describe('ItemsList', () => {
    describe('select', () => {
        beforeEach(() => {
            cmp = ngSelectFactory();
            cmp.bindLabel = 'label';
            list = itemsListFactory(cmp);
        });

        it('should add item to selected items', () => {
            list.select(new PickOption({ value: 'val' }));
            expect(list.selectedItems.length).toBe(1);
            expect(list.selectedItems[0].value).toBe('val');

            list.select(new PickOption({ value: 'val2' }));
            expect(list.selectedItems.length).toBe(2);
            expect(list.selectedItems[1].value).toBe('val2');
        });

        it('should skip when item already selected', () => {
            list.select(new PickOption({ selected: true }));
            expect(list.selectedItems.length).toBe(0);
        });

        it('should select all items in group when group is selected', () => {
            cmp.groupBy = 'groupKey';
            list.setItems([
                { label: 'K1', val: 'V1', groupKey: 'G1' },
                { label: 'K2', val: 'V2', groupKey: 'G1' }
            ]);
            list.select(list.items[0]); // G1

            expect(list.selectedItems.length).toBe(2);
            expect(list.selectedItems[0]).toBe(list.items[1]);
        });

        it('should be able to select items from different groups', () => {
            cmp.groupBy = 'groupKey';
            list.setItems([
                // G1
                { label: 'K1', val: 'V1', groupKey: 'G1' },
                { label: 'K2', val: 'V2', groupKey: 'G1' },
                // G2
                { label: 'K3', val: 'V3', groupKey: 'G2' },
                { label: 'K4', val: 'V4', groupKey: 'G2' }
            ]);

            list.select(list.items[1]); // K1
            list.select(list.items[4]); // K3

            expect(list.selectedItems.length).toBe(2);
        });

        
        it('should not select disabled items when selecting group', () => {
            cmp.groupBy = 'groupKey';
            list.setItems([
                { label: 'K1', val: 'V1', groupKey: 'G1' },
                { label: 'K2', val: 'V2', groupKey: 'G1', disabled: true }
            ]);
            list.select(list.items[0]); // G1

            expect(list.selectedItems.length).toBe(1);
            expect(list.selectedItems[0].label).toBe('K1');
        });

        it('should mark group selected when all child items are selected', () => {
            cmp.groupBy = 'groupKey';
            list.setItems([
                { label: 'K1', val: 'V1', groupKey: 'G1' },
                { label: 'K2', val: 'V2', groupKey: 'G1' }
            ]);
            list.select(list.items[1]) // K1
            list.select(list.items[2]); // K2

            expect(list.selectedItems.length).toBe(2); // only children included in selectedItems array
            expect(list.items[0].label).toBe('G1');
            expect(list.items[0].selected).toBeTruthy();
        });
    });

    describe('unselect', () => {
        beforeEach(() => {
            cmp = ngSelectFactory();
            cmp.bindLabel = 'label';
            list = itemsListFactory(cmp);
        });

        it('should unselect selected items', () => {
            list.setItems([
                { label: 'K1', val: 'V1' },
                { label: 'K2', val: 'V2' },
            ]);

            list.select(list.items[0]);
            list.select(list.items[1]);
            list.unselect(list.items[0]);
            list.unselect(list.items[1]);

            expect(list.selectedItems.length).toBe(0);
        });

        it('should unselect grouped selected item', () => {
            cmp.groupBy = 'groupKey';
            list.setItems([
                { label: 'K1', val: 'V1', groupKey: 'G1' },
                { label: 'K2', val: 'V2', groupKey: 'G1' },
            ]);

            list.select(list.items[1]); // K1
            list.select(list.items[2]); // K2
            list.unselect(list.items[1]);

            expect(list.selectedItems.length).toBe(1);
            expect(list.selectedItems[0]).toBe(list.items[2]);
        });

        it('should unselect grouped selected item after group was selected', () => {
            cmp.groupBy = 'groupKey';
            list.setItems([
                { label: 'K1', val: 'V1', groupKey: 'G1' },
                { label: 'K2', val: 'V2', groupKey: 'G1' },
            ]);

            list.select(list.items[0]); // G1
            list.unselect(list.items[1]); // K1

            expect(list.selectedItems.length).toBe(1);
            expect(list.selectedItems[0].label).toBe(list.items[2].label); // only K2 should be selected
        });

        it('should not unselect disabled items within a group', () => {
            cmp.groupBy = 'groupKey';
            list.setItems([
                { label: 'K1', val: 'V1', groupKey: 'G1' },
                { label: 'K2', val: 'V2', groupKey: 'G1', disabled: true },
                { label: 'K3', val: 'V3', groupKey: 'G2' },
                { label: 'K4', val: 'V4', groupKey: 'G2', disabled: true },
            ]);
            const item = list.findByLabel('K2');
            if (item) { list.selectedItems.push(item); }
            expect(list.selectedItems.length).toBe(1);

            const item2 = list.findByLabel('G1');
            if (item2) { list.unselect(item2); }
            expect(list.selectedItems.length).toBe(1);
            expect(list.selectedItems[0].label).toBe('K2');
        });

        it('should not affect disabled items when unselecting a group', () => {
            cmp.groupBy = 'groupKey';
            list.setItems([
                { label: 'K1', val: 'V1', groupKey: 'G1' },
                { label: 'K2', val: 'V2', groupKey: 'G1' },
                { label: 'K3', val: 'V3', groupKey: 'G1', disabled: true },
            ]);

            list.select(list.items[0]); // G1
            list.unselect(list.items[1]); // K1
            expect(list.selectedItems.length).toBe(1);
            expect(list.selectedItems[0].label).toBe('K2');
        });
    });

    describe('filter', () => {
        beforeEach(() => {
            cmp = ngSelectFactory();
            cmp.bindLabel = 'label';
            list = itemsListFactory(cmp);
        });

        it('should find item from items list and update counts', () => {
            list.setItems([
                { label: 'K1 part1 part2', val: 'V1' },
                { label: 'K2 part1 part2', val: 'V2' },
                { label: 'K3 part1 part2.2', val: 'V3' },
                { label: 'K4 part1 part2.2', val: 'V4' },
                { label: 'K5 part1 part2.2 part3', val: 'V5' },
            ]);

            list.filter('part1');
            expect(list.filteredItems.length).toBe(6); // +1 for default group
            expect(list.itemsShownCountStr).toBe('5'); // excludes groups
            expect(list.itemsTotalCountStr).toBe('5'); // excludes groups

            list.filter('part2.2');
            expect(list.filteredItems.length).toBe(4); // +1 for default group
            expect(list.itemsShownCountStr).toBe('3');
            expect(list.itemsTotalCountStr).toBe('5');

            list.filter('part3');
            expect(list.filteredItems.length).toBe(2); // +1 for default group
            expect(list.itemsShownCountStr).toBe('1');
            expect(list.itemsTotalCountStr).toBe('5');

            list.filter('nope');
            expect(list.filteredItems.length).toBe(0);
            expect(list.itemsShownCountStr).toBe('0');
            expect(list.itemsTotalCountStr).toBe('5');
        });

        it('should find item from grouped items list', () => {
            cmp.groupBy = 'groupKey';
            list.setItems([
                // G1 group
                { label: 'K1 part1 part2', val: 'V1', groupKey: 'G1' },
                { label: 'K2 part1 part2', val: 'V2', groupKey: 'G1' },
                // G2 group
                { label: 'K3 part1 part2.2', val: 'V3', groupKey: 'G2' },
                { label: 'K4 part1 part2.2', val: 'V4', groupKey: 'G2' },
                { label: 'K5 part1 part2.2 part3', val: 'V5', groupKey: 'G2' },
            ]);

            list.filter('part1');
            expect(list.filteredItems.length).toBe(7); // 5 items + 2 groups

            list.filter('part2.2');
            expect(list.filteredItems.length).toBe(4); // 3 item + 1 group

            list.filter('part3');
            expect(list.filteredItems.length).toBe(2); // 1 item + 1 group

            list.filter('nope');
            expect(list.filteredItems.length).toBe(0);
        });
    });

    describe('markSelectedOrDefault', () => {
        beforeEach(() => {
            cmp = ngSelectFactory();
            list = itemsListFactory(cmp);
            const items = Array.from(Array(30)).map((_, index) => (`item-${index}`));
            list.setItems(items);
        });

        it('should mark first item', () => {
            list.markSelectedOrDefault();
            expect(list.markedIndex).toBe(1); // index 0 is a group, so index 1 should be first selected
        });

        it('should keep marked item if it is above last selected item', () => {
            list.select(list.items[10]);
            list.markSelectedOrDefault();
            expect(list.markedIndex).toBe(10);

            list.markNextItem(true);
            list.markNextItem(true);
            list.markNextItem(true);
            list.markSelectedOrDefault();
            expect(list.markedIndex).toBe(13);
        });

        it('should mark first after previous marked item was filtered out', () => {
            list.markSelectedOrDefault();
            list.markNextItem(true);
            list.filter('item-0');
            list.markSelectedOrDefault();
            expect(list.markedIndex).toBe(1); // index 0 is a group, so index 1 should be first selected
            list.markNextItem(true);
            expect(list.markedIndex).toBe(1); // index still 1, because there only 1 items available to be marked
        });
    });

    describe('unmark', () => {
        beforeEach(() => {
            cmp = ngSelectFactory();
            list = itemsListFactory(cmp);
            const items = Array.from(Array(30)).map((_, index) => (`item-${index}`));
            list.setItems(items);
        });
        it('should reset the markedIndex property', () => {
            list.markItem(list.items[5]);
            list.unmark();
             expect(list.markedIndex).toBe(-1);
        });
    });
    describe('markItem', () => {
        beforeEach(() => {
            cmp = ngSelectFactory();
            list = itemsListFactory(cmp);
            const items = Array.from(Array(30)).map((_, index) => (`item-${index}`));
            list.setItems(items);
        });
        it('should set the markedIndex property according to the position of the item in the filtered list', () => {
            list.markItem(list.items[5]);
            expect(list.markedIndex).toBe(5);
        });
        it('should set the markedIndex property to -1 if the given item is not in the list', () => {
            list.markItem(new PickOption({}));
            expect(list.markedIndex).toBe(-1);
        });
    });

    describe('markFirst', () => {
        beforeEach(() => {
            cmp = ngSelectFactory();
            list = itemsListFactory(cmp);
            const items = Array.from(Array(30)).map((_, index) => (`item-${index}`));
            list.setItems(items);
        });
        it('unmarks what ever is currently marked and then marks the first selectable item', () => {
            list.markItem(list.items[5]);
            list.markFirst();
            expect(list.markedIndex).toBe(1); // groups are disabled by default, index 0 is a group
        });
    });

    describe('findOption', () => {
        beforeEach(() => {
            cmp = ngSelectFactory();
            list = itemsListFactory(cmp);
            const items = Array.from(Array(30)).map((_, index) => (`item-${index}`));
            list.setItems(items);
        });
        it('uses a given compareWith function to find a match', () => {
            cmp.compareWith = (a, b) => {
                return a === b.value;
            }
            const result = list.findOption(list.items[3]);
            expect(result?.value).toBe(list.items[3].value);
        });
        it('uses a given bindValue to find a match (if no compareWith func was given)', () => {
            cmp.bindValue = 'value';
            const result = list.findOption(list.items[3].value);
            expect(result?.value).toBe(list.items[3].value);
        });
        it('uses a given bindLabel to find a match (if no compareWith func or bindValue was given)', () => {
            cmp.bindValue = "";
            cmp.bindLabel = 'label';
            const result = list.findOption(list.items[3].value);
            expect(result?.value).toBe(list.items[3].value);
        });
    });

    describe('addOption', () => {
        beforeEach(() => {
            cmp = ngSelectFactory();
            list = itemsListFactory(cmp);
            const items = Array.from(Array(10)).map((_, index) => (`item-${index}`));
            list.setItems(items);
        });
        it('throws error if given an option without a parent', () => {
            const optionNoParent = new PickOption({ name: 'no parent', parent: undefined});
            expect(() => { list.addOption(optionNoParent) })
                .toThrow(new Error(`Trying to add an option that does not have a parent: ${optionNoParent}`));
        });
        it('adds option whose parent already exisits in the list', () => {
            const hasExistingParent = new PickOption({ name: 'default parent', parent: list.items[0]});
            expect(list.items.length).toBe(11);
            list.addOption(hasExistingParent);

            expect(list.items.length).toBe(12);
            expect(list.items[0].children?.length).toBe(11);
            expect(list.items[0].children?.[10].name).toBe(hasExistingParent.name);
        });
        it('adds option whose parent does not already exisits in the list', () => {
            const newParentOpt = new PickOption({name: 'new parent', children: []});
            const optionWithNewParent = new PickOption({ name: 'has new parent', parent: newParentOpt});
            newParentOpt.children?.push(optionWithNewParent);
            expect(list.items.length).toBe(11);
            list.addOption(optionWithNewParent);

            expect(list.items.length).toBe(13);
            expect(list.items[11].children?.length).toBe(1);
            expect(list.items[11].children?.[0].name).toBe(optionWithNewParent.name);
        });
    });
    describe('removeOption', () => {
        beforeEach(() => {
            cmp = ngSelectFactory();
            list = itemsListFactory(cmp);
            const items = Array.from(Array(10)).map((_, index) => (`item-${index}`));
            list.setItems(items);
        });
        it('throws error if given an option without a parent', () => {
            const optionNoParent = new PickOption({ name: 'no parent', parent: undefined});
            expect(() => { list.removeOption(optionNoParent) })
                .toThrow(new Error(`Trying to remove an option that does not have a parent: ${optionNoParent}`));
        });
        it('removes a given option from items list', () => {
            const existingOption = list.items[1];
            expect(list.items.length).toBe(11);
            list.removeOption(existingOption);
            expect(list.items.length).toBe(10);
        });
        it('removes a given option and its parent group if it was the last option in that group', () => {
            list.clearList();
            list.setItems([new PickOption({name: 'only option'})]);
            const onlyOption = list.items[1];
            
            expect(list.items.length).toBe(2); // the only option and its parent
            list.removeOption(onlyOption);
            expect(list.items.length).toBe(0);
        });
    });
    describe('clearSelected', () => {
        beforeEach(() => {
            cmp = ngSelectFactory();
            cmp.bindLabel = 'label';
            list = itemsListFactory(cmp);
        });

        it('should empty selected items list', () => {
            list.setItems([new PickOption({name: 'only option'})]);
            const onlyOption = list.items[1];
            list.select(onlyOption);
            expect(list.selectedItems.length).toBe(1);
            expect(onlyOption.selected).toBeTruthy();

            list.clearSelected();
            expect(list.selectedItems.length).toBe(0);
            expect(onlyOption.selected).toBeFalsy();
        });

        it('if nothing was selected when called, selectedItems property should still be empty', () => {
            list.setItems([45, 56, 67]);
            expect(list.selectedItems.length).toBe(0);
            list.clearSelected();
            expect(list.selectedItems.length).toBe(0);
        });
    });
    describe('selectAll', () => {
        beforeEach(() => {
            cmp = ngSelectFactory();
            cmp.bindLabel = 'label';
            list = itemsListFactory(cmp);
        });

        it('selects all items in the list', () => {
            list.setItems(['one', 'two', 'three']);
            list.selectAll();
            expect(list.selectedItems.length).toBe(3);
            list.selectedItems.forEach(i => {
                expect(i.selected).toBeTruthy();
            })
        });

        it('marks all items as selected, including groups, if canSelectGroup is true', () => {
            cmp.canSelectGroup = true;
            list.setItems(['one', 'two', 'three']);
            list.selectAll();
            expect(list.selectedItems.length).toBe(3); // only child items actually get placed in selectedItems array
            list.items.forEach(i => {
                expect(i.selected).toBeTruthy();
            })
        });

        it('selects all items in the list except disabled items', () => {
            list.setItems(['one', 'two', 'three']);
            list.items[1].disabled = true;
            list.selectAll();
            expect(list.selectedItems.length).toBe(2);
            expect(list.items[1].selected).toBeFalsy();
        });
    });
    
    describe('resolveNested', () => {
        beforeEach(() => {
            cmp = ngSelectFactory();
            list = itemsListFactory(cmp);
        });
        it('can pluck given property value from an object', () => {
            const testObj = { test: 1 };
            expect(list.resolveNested(testObj, 'test')).toBe(1);
        });
        it('can pluck given nested property value from an object', () => {
            const testObj = { test: 1, nestTest: { test2: 2 }};
            expect(list.resolveNested(testObj, 'nestTest.test2')).toBe(2);
        });
        it('can pluck given deeply nested property value from an object', () => {
            const testObj = { test: 1, nestTest: { test2: 2, deepNest: { deeperNest: { deepestNest: 3 }}}};
            expect(list.resolveNested(testObj, 'nestTest.deepNest.deeperNest.deepestNest')).toBe(3);
        });
    });

    describe('createHcOption', () => {
        beforeEach(() => {
            cmp = ngSelectFactory();
            cmp.bindLabel = 'label';
            list = itemsListFactory(cmp);
        });
        it('converts raw primitive value into an option', () => {
            const result = list._createHcOption(3);
            expect(result.value).toBe(3);
        });
        it('converts raw object value into an option', () => {
            const result = list._createHcOption({ countVal: 3 });
            expect((result.value as Object)['countVal']).toBe(3);
        });
        it('use given index', () => {
            const result = list._createHcOption(3, 2);
            expect(result.index).toBe(2);
        });
        it('use bindLabel from pane component to set label property', () => {
            cmp.bindLabel = 'myLabel';
            const expectedLabelVal = 'i am the label';
            const result = list._createHcOption({value: 4, myLabel: expectedLabelVal});
            expect(result.label).toBe(expectedLabelVal);
        });
        it('uses $hcOptionLabel and $hcOptionValue if they exist', () => {
            // for the <hc-pick-option> use case
            const expectedLabelVal = 'i am the label';
            const result = list._createHcOption({ $hcOptionLabel: expectedLabelVal, $hcOptionValue: 7 });
            expect(result.value).toBe(7);
            expect(result.label).toBe(expectedLabelVal);
        });
    });

    function itemsListFactory(pickCmp: PickPaneComponent): ItemsList {
        return new ItemsList(pickCmp, new DefaultSelectionModel());
    }

    function ngSelectFactory(): PickPaneComponent {
        return new PickPaneComponent(
            () => new DefaultSelectionModel(), {} as any, new Picklist2Service, (null as unknown) as ChangeDetectorRef, new PickPaneDragService());
    }
});
