import {Component, ViewChild} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HcSort} from './sort';
import {SortModule} from './sort-module';

@Component({
    template: `
        <div hcSort [hcSortMulti]="multiSort" #sort="hcSort">
            <button hc-sort-header="name" start="asc">Name</button>
            <button hc-sort-header="weight" start="desc">Weight</button>
            <button hc-sort-header="symbol" start="asc">Symbol</button>
        </div>
    `,
    standalone: false
})
class SortHeaderTestComponent {
    multiSort = false;

    @ViewChild('sort')
    sort!: HcSort;
}

describe('HcSortHeader aria-sort', () => {
    let fixture: ComponentFixture<SortHeaderTestComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SortHeaderTestComponent],
            imports: [SortModule]
        }).compileComponents();
    });

    function createFixture(multiSort = false): void {
        fixture = TestBed.createComponent(SortHeaderTestComponent);
        fixture.componentInstance.multiSort = multiSort;
        fixture.detectChanges();
    }

    function header(id: string): HTMLElement {
        const element = fixture.nativeElement.querySelector(`[hc-sort-header="${id}"]`) as HTMLElement | null;
        if (!element) {
            throw new Error(`Expected sort header '${id}'`);
        }
        return element;
    }

    it('renders evaluated aria-sort values for single-sort headers', () => {
        createFixture();
        expect(header('name').getAttribute('aria-sort')).toBeNull();

        header('name').click();
        fixture.detectChanges();
        expect(header('name').getAttribute('aria-sort')).toBe('ascending');
        expect(header('weight').getAttribute('aria-sort')).toBeNull();

        header('name').click();
        fixture.detectChanges();
        expect(header('name').getAttribute('aria-sort')).toBe('descending');
        expect(header('name').getAttribute('aria-sort')).not.toContain('function');
    });

    it('exposes only the primary direction in multi-sort, including priority changes and removal', () => {
        createFixture(true);
        const {sort} = fixture.componentInstance;
        sort.sort(sort.sortables.get('name')!);
        fixture.detectChanges();

        expect(header('name').getAttribute('aria-sort')).toBe('ascending');
        expect(header('weight').getAttribute('aria-sort')).toBeNull();

        sort.addSecondarySort(sort.sortables.get('weight')!);
        fixture.detectChanges();
        expect(header('name').getAttribute('aria-sort')).toBe('ascending');
        expect(header('weight').getAttribute('aria-sort')).toBeNull();

        sort.setSortPriority('weight', 1);
        fixture.detectChanges();
        expect(header('name').getAttribute('aria-sort')).toBeNull();
        expect(header('weight').getAttribute('aria-sort')).toBe('descending');

        sort.removeSort('weight');
        fixture.detectChanges();
        expect(header('name').getAttribute('aria-sort')).toBe('ascending');

        sort.addSecondarySort(sort.sortables.get('weight')!);
        sort.removeSort('name');
        fixture.detectChanges();
        expect(header('name').getAttribute('aria-sort')).toBeNull();
        expect(header('weight').getAttribute('aria-sort')).toBe('descending');
    });

    it('resets a multi-sort to the clicked header as the sole primary sort', () => {
        createFixture(true);
        const {sort} = fixture.componentInstance;
        sort.sort(sort.sortables.get('name')!);
        sort.addSecondarySort(sort.sortables.get('weight')!);
        fixture.detectChanges();

        header('symbol').click();
        fixture.detectChanges();

        expect(sort.sorts).toEqual([{active: 'symbol', direction: 'asc', priority: 1}]);
        expect(header('symbol').getAttribute('aria-sort')).toBe('ascending');
        expect(header('name').getAttribute('aria-sort')).toBeNull();
        expect(header('weight').getAttribute('aria-sort')).toBeNull();
    });

    it('toggles a clicked secondary header without changing its priority', () => {
        createFixture(true);
        const {sort} = fixture.componentInstance;
        sort.sort(sort.sortables.get('name')!);
        sort.addSecondarySort(sort.sortables.get('weight')!);
        fixture.detectChanges();

        header('weight').click();
        fixture.detectChanges();

            expect(sort.sorts).toEqual([
                {active: 'name', direction: 'asc', priority: 1},
                {active: 'weight', direction: 'asc', priority: 2}
            ]);
        expect(header('weight').getAttribute('aria-sort')).toBeNull();
        expect(header('name').getAttribute('aria-sort')).toBe('ascending');

        header('weight').click();
        fixture.detectChanges();

            expect(sort.sorts).toEqual([
                {active: 'name', direction: 'asc', priority: 1},
                {active: 'weight', direction: 'desc', priority: 2}
            ]);
        expect(header('weight').getAttribute('aria-sort')).toBeNull();
        expect(header('name').getAttribute('aria-sort')).toBe('ascending');
    });
});
