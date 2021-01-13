import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ButtonModule} from '../button';
import {LoadMorePaginationComponent} from './load-more-pagination.component';

describe('LoadMorePaginationComponent', () => {
    let fixture: ComponentFixture<LoadMorePaginationComponent>;
    let component: LoadMorePaginationComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ButtonModule],
            declarations: [LoadMorePaginationComponent]
        }).compileComponents();
        fixture = TestBed.createComponent(LoadMorePaginationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    function beforeEachWithTimeout(action: () => void): void {
        beforeEach((done) => {
            action();
            setTimeout(done);
        });
    }

    describe('upon initialization', () => {
        it('should initialize properly without errors', () => {
            expect(component).toBeTruthy();
            expect(component.buttonText).toEqual('Load more');
            expect(component.buttonStyle).toEqual('secondary');
        });
    });

    describe('when button text and style are set', () => {
        it('should set it to the provided text', () => {
            component.buttonText = 'Hello load more?';
            component.buttonStyle = 'primary';
            expect(component.buttonText).toEqual('Hello load more?');
            expect(component.buttonStyle).toEqual('primary');
        });
    });
    describe('when style is invalid', () => {
        it('should throw an error', () => {
            const wrap = () => (component.buttonStyle = 'not-a-valid-style');
            expect(wrap).toThrowError('Unsupported buttonStyle attribute value on LoadMorePaginationComponent: not-a-valid-style');
        });
    });

    describe('when _loadNextPage is called on the first page', () => {
        beforeEach(() => {
            component.pageNumber = 1;
            component.length = 100;
            component.pageSize = 10;
        });
        it('should set the pageNumber to be 2', (done) => {
            component._loadNextPage();

            // wait for page number to be set in next change detection cycle
            setTimeout(() => {
                expect(component.pageNumber).toEqual(2);
                done();
            });
        });
    });
    describe('when _loadNextPage is called on the last page', () => {
        beforeEach(() => {
            component.pageNumber = 10;
            component.length = 100;
            component.pageSize = 10;
        });
        it('should set the pageNumber to be 10', (done) => {
            component._loadNextPage();

            // wait for page number to be set in next change detection cycle
            setTimeout(() => {
                expect(component.pageNumber).toEqual(10);
                done();
            });
        });
    });

    describe('when _loadNextPage is called past the last page', () => {
        describe('when there are 10 pages and `pageNumber` is set to `11`', () => {
            beforeEachWithTimeout(() => {
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
