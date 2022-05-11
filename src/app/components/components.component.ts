import {Component, OnDestroy, OnInit} from '@angular/core';
import {DocItem, DocumentItemsService, DocItemCategory} from '../core/document-items.service';
import {ActivatedRoute, Router} from '@angular/router';
import {takeUntil, tap, map} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {ApplicationInsightsService} from '../shared/application-insights/application-insights.service';

@Component({
    selector: 'hc-demo-components',
    templateUrl: './components.component.html',
    styleUrls: ['../shared/base-demo.component.scss']
})
export class ComponentsComponent implements OnInit, OnDestroy {
    readonly categorizedDocItems: Array<{category: DocItemCategory | 'misc'; displayName: string; items?: DocItem[]}> = [
        {category: 'forms', displayName: 'Forms'},
        {category: 'nav', displayName: 'Navigation'},
        {category: 'layout', displayName: 'Layout'},
        {category: 'buttons', displayName: 'Buttons & Indicators'},
        {category: 'popups', displayName: 'Popups & Notifications'},
        {category: 'table', displayName: 'Data Table'},
        {category: 'pipes', displayName: 'Pipes'},
        {category: 'misc', displayName: 'Miscellaneous'}
    ];

    private _docItems: DocItem[];
    get allDocItems(): DocItem[] {
        return this._docItems;
    }
    set allDocItems(value: DocItem[]) {
        this._docItems = value;
        this.categorizedDocItems.forEach(c => (c.items = []));
        if (value) {
            value.forEach(item => {
                let category = this.categorizedDocItems.find(c => c.category === item.category);
                if (!category) {
                    category = this.categorizedDocItems.find(c => c.category === 'misc');
                }
                category?.items?.push(item);
            });
        }
    }

    id = '';
    activeItem: DocItem | undefined;
    activeCategory = '';
    selectOptions: Array<string> = [];
    private unsubscribe = new Subject<void>();
    private appInsights: ApplicationInsightsService;

    constructor(private docItemService: DocumentItemsService, private activatedRoute: ActivatedRoute, private router: Router) {
        this.appInsights = new ApplicationInsightsService();
    }

    ngOnInit(): void {
        const id$ = this.activatedRoute.paramMap.pipe(
            map(paramMap => paramMap.get('id') as string),
            tap(id => (this.id = id))
        );

       id$.pipe(takeUntil(this.unsubscribe)).subscribe(() => this.loadDocs());
    }

    loadDocs(): void {
        this.allDocItems = this.docItemService.getDocItems();
        const categoriesWithItems = this.categorizedDocItems.filter(c => c.items && c.items.length);
        if (!this.id && categoriesWithItems[0]) {
            const items = categoriesWithItems[0].items
            this.navUpdate(items && items.length > 0 ? items[0].id : '');
            return;
        }
        this.activeItem = this.allDocItems.find(i => i.id === this.id);
        if (this.activeItem) {
            this.appInsights.logPageView(this.activeItem.name, `/web/components/` + this.id);
            this.activeCategory = this.activeItem.category;
        }
    }

    // Handle nav changes via the sidebar or mobile dropdown
    navUpdate(id: string): void {
        this.router.navigate([`/web/components/` + id]);
        window.scrollTo(0, 0);
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }
}
