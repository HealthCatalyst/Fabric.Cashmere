import {Component, OnDestroy} from '@angular/core';
import {SectionService} from '../../../shared/section.service';
import {BaseDemoComponent} from '../../../shared/base-demo.component';
import {ProductFile, ProductCentricIndexService} from '../product-centric-index-service';
import {ActivatedRoute} from '@angular/router';
import {NavigationEnd, Router} from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
    selector: 'hc-product-centric-index',
    templateUrl: './product-centric-index.component.html',
    styleUrls: ['./product-centric-index.component.scss']
})
export class ProductCentricIndexComponent extends BaseDemoComponent implements OnDestroy {
    private unsubscribe = new Subject<void>();
    productLists: ProductFile[];
    viewerMode = false;

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        sectionService: SectionService,
        public productCentricIndexService: ProductCentricIndexService
    ) {
        super(sectionService);
        this.productLists = productCentricIndexService.productPersonasLists;
        this.productLists.sort(this.compareProducts);
        if ( activatedRoute.firstChild && activatedRoute.firstChild.routeConfig ) {
            this.viewerMode = true;
        }

        this.router.events.pipe(takeUntil(this.unsubscribe)).subscribe(event => {
            if (event instanceof NavigationEnd) {
                if ( activatedRoute.firstChild && activatedRoute.firstChild.routeConfig ) {
                    this.viewerMode = true;
                } else {
                    this.viewerMode = false;
                }
            }
        });
    }

    compareProducts(a: ProductFile, b: ProductFile): number {
        let comparison = 0;
        if (a.title > b.title) {
            comparison = 1;
        } else if (a.title < a.title) {
            comparison = -1;
        }
        return comparison;
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }
}
