import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ButtonModule} from '../button';
import {LoadMorePaginationComponent} from './load-more-pagination.component';

describe('PaginationComponent', () => {
    let fixture: ComponentFixture<LoadMorePaginationComponent>;
    let component: LoadMorePaginationComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ButtonModule],
            declarations: [LoadMorePaginationComponent]
        }).compileComponents();
        fixture = TestBed.createComponent(LoadMorePaginationComponent);
        component = fixture.componentInstance;
    });

    describe('upon initialization', () => {
        beforeEach(() => {
            fixture.detectChanges();
        });
        it('should initialize properly without errors', () => {
            expect(component).toBeTruthy();
            expect(component.buttonText).toEqual('Load more');
            expect(component.buttonStyle).toEqual('secondary');
        });
    });

    describe('when button text and style are set', () => {
        beforeEach(() => {
            fixture.detectChanges();
        });
        it('should set it to the provided text', () => {
            component.buttonText = 'Hello load more?';
            component.buttonStyle = 'primary';
            expect(component.buttonText).toEqual('Hello load more?');
            expect(component.buttonStyle).toEqual('primary');
        });
    });
    describe('when style is invalid', () => {
        beforeEach(() => {
            fixture.detectChanges();
        });
        it('should throw an error', () => {
            const wrap = () => (component.buttonStyle = 'not-a-valid-style');
            expect(wrap).toThrowError('Unsupported buttonStyle attribute value on ButtonComponent: not-a-valid-style');
        });
    });

    describe('when _loadNextPage is called on the first page', () => {
        beforeEach(() => {
            fixture.detectChanges();
            component.pageNumber = 1;
            component.length = 100;
            component.pageSize = 10;
        });
        it('should set the pageNumber to be 2', () => {
            component._loadNextPage();
            expect(component.pageNumber).toEqual(2);
        });
    });
    describe('when _loadNextPage is called on the last page', () => {
        beforeEach(() => {
            fixture.detectChanges();
            component.pageNumber = 10;
            component.length = 100;
            component.pageSize = 10;
        });
        it('should set the pageNumber to be 10', () => {
            component._loadNextPage();
            expect(component.pageNumber).toEqual(10);
        });
    });

    describe('when _loadNextPage is called past the last page', () => {
        describe('when there are 10 pages and `pageNumber` is set to `11`', () => {
            beforeEach(done => {
                component.pageNumberChange.subscribe(done);

                component.length = 100;
                component.pageSize = 10;
                component.pageNumber = 11;
            });
            it('should be `10`', async () => {
                component._loadNextPage();
                expect(component.pageNumber).toBe(10);
            });
        });
    });
});
