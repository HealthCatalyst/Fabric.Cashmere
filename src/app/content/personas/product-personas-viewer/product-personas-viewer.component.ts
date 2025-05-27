import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {ProductCentricIndexService, ProductFile} from '../product-centric-index-service';

@Component({
    selector: 'hc-product-personas-viewer',
    templateUrl: './product-personas-viewer.component.html',
    styleUrls: ['./product-personas-viewer.component.scss'],
    standalone: false
})
export class ProductPersonasViewerComponent implements OnInit, OnDestroy {
    public document = '';
    public orgChart = false;
    private unsubscribe = new Subject<void>();

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        public productCentricIndexService: ProductCentricIndexService
    ) {}

    ngOnInit(): void {
        this.activatedRoute.paramMap.pipe(takeUntil(this.unsubscribe)).subscribe(queryParams => {
            const route = queryParams.get('id');
            const selectedProduct: ProductFile | undefined = this.productCentricIndexService.productPersonasLists.find(
                productPersonasList => productPersonasList.route === route
            );
            if (selectedProduct) {
                this.document = selectedProduct.document;
            }
        });

        const url = this.router.url;
        const parsed = this.router.parseUrl(url);
        if (parsed.queryParamMap.get('referrer')) {
            this.orgChart = true;
        }
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }
}
