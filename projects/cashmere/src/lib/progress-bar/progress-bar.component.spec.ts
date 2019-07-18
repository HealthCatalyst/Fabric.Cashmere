import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ProgressBarComponent} from './progress-bar.component';

describe('ProgressBarComponent', () => {
    let component: ProgressBarComponent;
    let fixture: ComponentFixture<ProgressBarComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ProgressBarComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProgressBarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('set items()', () => {
        it('should set empty array when not an array', () => {
            // arrange

            let badList = null;
            // act
            // @ts-ignore to prove appropriate handling
            component.items = badList;
            // assert
            // @ts-ignore
            expect(component.items).toEqual([]);
        });

        it('should set items when given a list of at least one progress item', () => {
            // arrange

            let goodList = [{id: 'test', title: 'test', status: 'test'}];
            // act
            // @ts-ignore to prove appropriate handling
            component.items = goodList;
            // assert
            // @ts-ignore
            expect(component.items.length).toEqual(1);
        });

        it('should set greatestCompletedItemIndex when given a list of at least one progress item', () => {
            // arrange

            let goodList = [
                {id: 'test', title: 'test', status: 'completed'},
                {
                    id: 'test2',
                    title: 'test2',
                    status: 'test2'
                }
            ];
            // act
            // @ts-ignore to prove appropriate handling
            component.items = goodList;
            // assert
            // @ts-ignore
            expect(component.greatestCompletedItemIndex).toEqual(0);
        });

        it('should set select a progress item when when given a list of at least one progress item', () => {
            // arrange
            const aCompletedItem = {id: 'test', title: 'test', status: 'completed'};
            let unSelectedItemToBeSelected = {id: 'test2', title: 'test2', status: 'test2'};
            let expectedSelectedItem = {...unSelectedItemToBeSelected, focused: true};
            let goodList = [aCompletedItem, unSelectedItemToBeSelected];
            let listWithItemSelected = [aCompletedItem, expectedSelectedItem];

            // act
            component.items = goodList;

            // assert
            expect(component.currentSelectedItem).toEqual(expectedSelectedItem);
            expect(component.items).toEqual(listWithItemSelected);
        });
    });

    describe('findGreatestCompletedIndexFromItems', () => {
        it('should return the correct item when given list of progress items with at least one completed item', () => {
            // arrange
            let foundIndex = null;
            let listWithCompletedItem = [
                {id: 'test', title: 'test', status: 'completed'},
                {id: 'test2', title: 'test2', status: 'test2'},
                {id: 'test3', title: 'test3', status: 'test3'}
            ];
            // act
            // @ts-ignore to prove appropriate handling
            foundIndex = component.findGreatestCompletedIndexFromItems(listWithCompletedItem);
            // assert
            // @ts-ignore
            expect(foundIndex).toEqual(0);
        });

        it('should return -1 when provided a list with no completed items', () => {
            // arrange
            let foundIndex = null;
            let listWithCompletedItem = [
                {id: 'test', title: 'test', status: 'test'},
                {id: 'test2', title: 'test2', status: 'test2'},
                {id: 'test3', title: 'test3', status: 'test3'}
            ];
            // act
            // @ts-ignore to prove appropriate handling
            foundIndex = component.findGreatestCompletedIndexFromItems(listWithCompletedItem);
            // assert
            // @ts-ignore
            expect(foundIndex).toEqual(-1);
        });
    });

    describe('getNextItemToSelectFromItems()', () => {
        it('should return the correct item when last completed is not last item', () => {
            // arrange
            const greatestCompletedItemIndex = 0;
            const correctItemToReturn = {id: 'test2', title: 'test2', status: 'test2'};
            let returnedItem = null;
            const listWithOneCompletedItem = [
                {id: 'test', title: 'test', status: 'completed'},
                correctItemToReturn,
                {id: 'test3', title: 'test3', status: 'test3'}
            ];
            // act
            // @ts-ignore to prove appropriate handling
            returnedItem = component.getNextItemToSelectFromItems(listWithOneCompletedItem, greatestCompletedItemIndex);
            // assert
            // @ts-ignore
            expect(returnedItem).toEqual(correctItemToReturn);
        });

        it('should return the correct item when last completed is last item', () => {
            // arrange
            const greatestCompletedItemIndex = 2;
            const correctItemToReturn = {id: 'test3', title: 'test3', status: 'completed'};
            let returnedItem = null;
            const listWithAllItemsCompleted = [
                {id: 'test', title: 'test', status: 'completed'},
                {id: 'test2', title: 'test2', status: 'completed'},
                correctItemToReturn
            ];
            // act
            // @ts-ignore to prove appropriate handling
            returnedItem = component.getNextItemToSelectFromItems(listWithAllItemsCompleted, greatestCompletedItemIndex);
            // assert
            // @ts-ignore
            expect(returnedItem).toEqual(correctItemToReturn);
        });
    });

    // describe('completeCurrent()', () => {});
    //
    // describe('itemClicked', () => {});
});
