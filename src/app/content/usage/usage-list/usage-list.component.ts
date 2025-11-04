/* eslint-disable @typescript-eslint/no-explicit-any */
import {Component, OnInit, ViewChild, AfterViewInit, TemplateRef} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import {PaginationComponent, HcTableDataSource, ModalOptions, ModalService, HcToasterService, HcToastOptions} from '@healthcatalyst/cashmere';
import {SectionService} from '../../../shared/section.service';
import {BaseDemoComponent} from '../../../shared/base-demo.component';
import {IUsage} from '../usage';
import {environment} from '../../../../environments/environment';
import {ApplicationInsightsService} from '../../../shared/application-insights/application-insights.service';

@Component({
    selector: 'hc-usage-list',
    templateUrl: './usage-list.component.html',
    styleUrls: ['./usage-list.component.scss'],
    standalone: false
})
export class UsageListComponent extends BaseDemoComponent implements OnInit, AfterViewInit {
    filteredUsageList: IUsage[];
    usageList: IUsage[] = [];
    categories = ['All', 'Clinical', 'General', 'Health Catalyst', 'Industry', 'Technical'];
    types = ['All', 'Abbreviation', 'General usage'];
    selectedCategoriesControl = new FormControl('All', {nonNullable: true});
    selectedTypesControl = new FormControl('General usage', {nonNullable: true});
    searchControl = new FormControl();
    searchTerm = '';
    termsLoading = true;
    loadFailed = false;
    terms: IUsage[];

    editListForm: FormGroup;
    formSubmitted = false;
    editForm = document.forms['editListForm'];
    showErrors = false;

    displayedColumns: string[] = ['term', 'usage', 'example', 'edit'];
    dataSource: HcTableDataSource<IUsage>;
    pageNumber = 1;
    pageOpts = [10, 30, 50];

    addChangeControl = new FormGroup({
        id: new FormControl('', {nonNullable: true}),
        name: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
        usage: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
        comments: new FormControl('', {nonNullable: true}),
        contributorName: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),
        contributorEmail: new FormControl<string>('', {nonNullable: true, validators: [Validators.required, Validators.email]})
    });

    constructor(
        sectionService: SectionService,
        private fb: FormBuilder,
        private httpClient: HttpClient,
        private appInsights: ApplicationInsightsService,
        private modalService: ModalService,
        private toasterService: HcToasterService
    ) {
        super(sectionService);
    }

    get length(): number {
        return this.usageList.length;
    }

    @ViewChild(PaginationComponent)
    paginator: PaginationComponent;

    applyFilter(searchTerm: string): void {
        const filterStr = searchTerm;
        if (filterStr) {
            this.dataSource.filter = filterStr.trim().toLowerCase();
            this.appInsights.logTermSearch( this.dataSource.filter );
        } else {
            this.dataSource.filter = ' ';
        }
    }

    ngOnInit(): void {
        this.termsLoading = true;
        this.loadFailed = false;

        let headers = new HttpHeaders();
        headers = headers.append('Content-Type', 'application/json');
        const options = {headers: headers};

        this.httpClient.get<any>( environment.productCatalog.url + '/terms', options)
            .subscribe({
                next: data => {
                    data.forEach((term) => {
                        const rowEntry: IUsage = {
                            TermID: term.termID,
                            TermName: term.name,
                            TermUsage: term.usage,
                            TermTypes: term.types,
                            TermCategories: term.categories,
                            TermExample: term.example,
                            TermDateAdded: term.dateAdded ? new Date(term.dateAdded) : null
                        }
                        this.usageList.push( rowEntry );
                    });

                    this.filteredUsageList = this.usageList.sort((a, b) => (a.TermName.toLowerCase() > b.TermName.toLowerCase() ? 1 : -1));
                    this.dataSource = new HcTableDataSource(this.filteredUsageList);
                    this.dataSource.filterPredicate = (filterData: IUsage, filter: string) => this.usageFilter(filterData, filter);
                    this.dataSource.paginator = this.paginator;
                    this.termsLoading = false;
                    this.loadFailed = false;
                    setTimeout(() => {
                        this.applyFilter('');
                    });
                },
                error: msg => {
                    this.loadFailed = true;
                    this.termsLoading = false;
                    console.log( msg );
                }
            });

        this.editListForm = this.fb.group({
            addTerm: ['', Validators.required],
            addDef: ['', Validators.required],
            comment: '',
            yourEmail: ['', [Validators.required, Validators.email]],
            yourName: ['', [Validators.required, Validators.minLength(3)]],
            addNew: 'true'
        });
    }

    usageFilter(data: IUsage, filter: string): boolean {
        const catMatch =
            data.TermCategories.toLowerCase().includes(this.selectedCategoriesControl.value.toLowerCase()) || this.selectedCategoriesControl.value === 'All';
        const typeMatch = data.TermTypes.toLowerCase().includes(this.selectedTypesControl.value.toLowerCase()) || this.selectedTypesControl.value === 'All';
        const termMatch = data.TermName.toLowerCase().includes(filter) || filter === ' ';
        const defMatch = data.TermUsage.toLowerCase().includes(filter) || filter === ' ';

        return catMatch && typeMatch && (termMatch || defMatch);
    }

    getFormFillData(termItem: IUsage | null, content: TemplateRef<any>): void {
        if ( termItem ) {
            this.addChangeControl.patchValue({
                id: termItem.TermID,
                name: termItem.TermName,
                usage: termItem.TermUsage,
                comments: '',
                contributorName: '',
                contributorEmail: ''
            });
        } else {
            this.addChangeControl.reset();
        }

        const options: ModalOptions = {
            size: 'md',
            data: termItem
        };
        this.modalService.open(content, options);
    }

    submitRequest(): void {
        let headers = new HttpHeaders();
        headers = headers.append('Content-Type', 'application/json');
        const options = {headers: headers};

        const postSub = this.httpClient.post<any>( environment.productCatalog.url + '/termchange.add',
            {
                id: null,
                submitDate: new Date(),
                publishDate: null,
                term: this.addChangeControl.controls['id'].value !== '' ? Number(this.addChangeControl.controls['id'].value) : null,
                name: this.addChangeControl.controls['name'].value,
                usage: this.addChangeControl.controls['usage'].value,
                comment: this.addChangeControl.controls['comments'].value,
                contributorName: this.addChangeControl.controls['contributorName'].value,
                contributorEmail: this.addChangeControl.controls['contributorEmail'].value
            },
            options
        )
        .subscribe({
            next: () => {
                const options: HcToastOptions = {
                    header: 'Change Request Submitted',
                    body: this.addChangeControl.controls['name'].value + " successfully submitted.",
                    type: 'success',
                    position: 'bottom-right'
                };
                this.toasterService.addToast(options);
                postSub.unsubscribe();
            },
            error: msg => {
                const options: HcToastOptions = {
                    header: 'Request Failed',
                    body: "Unable to add term change request. Try again later.",
                    type: 'alert',
                    position: 'bottom-right'
                };
                this.toasterService.addToast(options);
                console.log( msg );
                postSub.unsubscribe();
            }
        });
    }
}
