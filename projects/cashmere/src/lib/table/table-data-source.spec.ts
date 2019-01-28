import {PaginationComponent} from '../pagination/pagination.component';
import {HcTableDataSource} from './table-data-source';
import { HcSort } from '../sort';

interface PeriodicElement {
    name: string;
    id: number;
    weight: number;
    discoveryDate: Date;
    sortTestCol: any;
}

const ELEMENT_DATA: PeriodicElement[] = [
    {id: 1, name: 'Hydrogen', weight: 1.0079, sortTestCol: 1, discoveryDate: new Date('January 2 1900')},
    {id: 2, name: 'Helium', weight: 4.0026, sortTestCol: 12341234, discoveryDate: new Date('January 1 1900')},
    {id: 3, name: 'Lithium', weight: 6.941, sortTestCol: 'C', discoveryDate: new Date('January 1 1800')},
    {id: 4, name: 'Beryllium', weight: 9.0122, sortTestCol: 'A', discoveryDate: new Date('January 1 2000')},
    {id: 5, name: 'Boron', weight: 10.811, sortTestCol: 'a', discoveryDate: new Date('January 1 1956')},
    {id: 6, name: 'Carbon', weight: 12.0107, sortTestCol: 'c', discoveryDate: new Date('January 1 1945')},
    {id: 7, name: 'Nitrogen', weight: 14.0067, sortTestCol: '1A', discoveryDate: new Date('January 1 1976')},
    {id: 8, name: 'Oxygen', weight: 15.9994, sortTestCol: '1B', discoveryDate: new Date('January 1 1923')},
    {id: 9, name: 'Fluorine', weight: 18.9984, sortTestCol: '2C', discoveryDate: new Date('February 1 1900')},
    {id: 10, name: 'Neon', weight: 20.1797, sortTestCol: 'B', discoveryDate: new Date('May 1 1900')},
    {id: 11, name: '1CasHydrogen', weight: 10.0079, sortTestCol: 12341234, discoveryDate: new Date('November 1 1900')},
    {id: 12, name: 'CasHelium', weight: 40.0026, sortTestCol: 2, discoveryDate: new Date('June 1 1900')},
    {id: 13, name: '2CasLithium', weight: 60.941, sortTestCol: 3, discoveryDate: new Date('January 1 1010')},
    {id: 14, name: 'CasBeryllium', weight: 90.0122, sortTestCol: null, discoveryDate: new Date('January 1 1923')},
    {id: 15, name: '3CasBoron', weight: 100.811, sortTestCol: '', discoveryDate: new Date('January 1 2001')},
    {id: 16, name: 'CasCarbon', weight: 120.0107, sortTestCol: undefined, discoveryDate: new Date('January 1 2002')},
    {id: 17, name: 'CasNitrogen', weight: 140.0067, sortTestCol: NaN, discoveryDate: new Date('January 1 2004')},
    {id: 18, name: 'CasOxygen', weight: 150.9994, sortTestCol: new Date('January 1 1990'), discoveryDate: new Date('January 1 2005')},
    {id: 19, name: '', weight: 180.9984, sortTestCol: new Date('January 1 1970'), discoveryDate: new Date('January 1 2007')},
    {id: 20, name: '7CasNeon', weight: 200.1797, sortTestCol: new Date('January 1 1980'), discoveryDate: new Date('January 1 2006')}
];

describe('HcTableDataSource', () => {
    let pager: PaginationComponent;
    let dataSource: HcTableDataSource<PeriodicElement>;
    beforeEach(() => {
        pager = new PaginationComponent();
    });

    describe('when paged', () => {
        describe('appropriately sets the page after new data is added', () => {
            it('page should be 1', () => {
                dataSource = new HcTableDataSource([]);
                dataSource.paginator = pager;
                dataSource.data = ELEMENT_DATA;
                expect(dataSource.paginator.pageNumber).toBe(1);
            });
        });
    });

    describe('sortData()', () => {
        it('sorts mixed values', () => {
            const sort = new HcSort();
            sort.direction = 'asc';
            sort.active = 'sortTestCol';
            const result = dataSource.sortData(ELEMENT_DATA, sort);
            expect(result.map(e => e.sortTestCol).toString()).toBe(
                [
                    '',
                    '',
                    '',
                    1,
                    12341234,
                    '1A',
                    '1B',
                    '2C',
                    'A',
                    'a',
                    'B',
                    'C',
                    'c',
                    2,
                    3,
                    12341234,
                    NaN,
                    new Date('January 1 1970'),
                    new Date('January 1 1980'),
                    new Date('January 1 1990')
            ].toString());
        });
        it('sorts numbers',
         () => {
            const sort = new HcSort();
            sort.direction = 'asc';
            sort.active = 'weight';
            const result = dataSource.sortData(ELEMENT_DATA,
                 sort);
            expect(result.map(e => e.weight).toString()).toBe(
                [
                    1.0079,
                    4.0026,
                    6.941,
                    9.0122,
                    10.0079,
                    10.811,
                    12.0107,
                    14.0067,
                    15.9994,
                    18.9984,
                    20.1797,
                    40.0026,
                    60.941,
                    90.0122,
                    100.811,
                    120.0107,
                    140.0067,
                    150.9994,
                    180.9984,
                    200.1797
            ].toString());
        });
        it('sorts dates', () => {
            const sort = new HcSort();
            sort.direction = 'asc';
            sort.active = 'discoveryDate';
            const result = dataSource.sortData(ELEMENT_DATA, sort);
            expect(result.map(e => e.discoveryDate).toString()).toBe(
                [
                    new Date('January 1 1010'),
                    new Date('January 1 1800'),
                    new Date('January 1 1900'),
                    new Date('January 2 1900'),
                    new Date('February 1 1900'),
                    new Date('May 1 1900'),
                    new Date('June 1 1900'),
                    new Date('November 1 1900'),
                    new Date('January 1 1923'),
                    new Date('January 1 1923'),
                    new Date('January 1 1945'),
                    new Date('January 1 1956'),
                    new Date('January 1 1976'),
                    new Date('January 1 2000'),
                    new Date('January 1 2001'),
                    new Date('January 1 2002'),
                    new Date('January 1 2004'),
                    new Date('January 1 2005'),
                    new Date('January 1 2006'),
                    new Date('January 1 2007')
                ].toString());
        });
        it('sorts strings', () => {
            const sort = new HcSort();
            sort.direction = 'asc';
            sort.active = 'name';
            const result = dataSource.sortData(ELEMENT_DATA, sort);
            expect(result.map(e => e.name).toString()).toBe(
                [
                    '',
                    '1CasHydrogen',
                    '2CasLithium',
                    '3CasBoron',
                    '7CasNeon',
                    'Beryllium',
                    'Boron',
                    'Carbon',
                    'CasBeryllium',
                    'CasCarbon',
                    'CasHelium',
                    'CasNitrogen',
                    'CasOxygen',
                    'Fluorine',
                    'Helium',
                    'Hydrogen',
                    'Lithium',
                    'Neon',
                    'Nitrogen',
                    'Oxygen'
                ].toString());
        });
    });
});