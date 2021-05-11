import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormControl, FormGroup, FormBuilder, Validators, FormGroupDirective} from '@angular/forms';
import {Observable} from 'rxjs';
import {GoogleSheetsDbService} from 'ng-google-sheets-db';
import {PaginationComponent, HcTableDataSource, TabComponent, TabSetComponent} from '@healthcatalyst/cashmere';
import {SectionService} from 'src/app/shared/section.service';
import {BaseDemoComponent} from '../../../shared/base-demo.component';
import {IUsage, usageAttributesMapping} from '../usage';

@Component({
    selector: 'hc-usage-list',
    templateUrl: './usage-list.component.html',
    styleUrls: ['./usage-list.component.scss']
})
export class UsageListComponent extends BaseDemoComponent implements OnInit, AfterViewInit {
    filteredUsageList: IUsage[];
    usageList: IUsage[] = [];
    categories = ['All', 'Health Catalyst', 'Industry', 'Technical'];
    selectedCategoriesControl = new FormControl('All');
    searchControl = new FormControl();
    termList$: Observable<IUsage[]>;
    terms: IUsage[];

    editListForm: FormGroup;
    formSubmitted = false;
    scriptURL = 'https://script.google.com/macros/s/AKfycbwWZCf0aBg1e5BFD9G-hVTb-zbSTXT1KGFSwoyRLwMhu7FZF2g/exec';
    editForm = document.forms['editListForm'];
    showErrors = false;
    @ViewChild('tabSetElement') tabSetRef: TabSetComponent;
    @ViewChild('formTab') formTabRef: TabComponent;
    @ViewChild('formDirective') formDirective: FormGroupDirective;

    displayedColumns: string[] = ['term', 'usage', 'edit'];
    dataSource: HcTableDataSource<IUsage>;
    pageNumber = 1;
    pageOpts = [10, 20, 30];

    constructor(
        sectionService: SectionService,
        private fb: FormBuilder,
        private httpClient: HttpClient,
        private googleSheetsDbService: GoogleSheetsDbService
    ) {
        super(sectionService);
    }

    get length(): number {
        return this.usageList.length;
    }

    @ViewChild(PaginationComponent)
    paginator: PaginationComponent;

    applyFilter() {
        const filterStr = this.searchControl.value;
        if (filterStr) {
            this.dataSource.filter = filterStr.trim().toLowerCase();
        } else {
            this.dataSource.filter = ' ';
        }
    }

    ngOnInit(): void {
        this.termList$ = this.googleSheetsDbService.get<IUsage>('18lD03x12tYE_DTqiXPX9oqR3sqRdMXEE_jhIGvTF_xk', 1, usageAttributesMapping);
        this.termList$.subscribe(data => {
            this.usageList = data;
            this.filteredUsageList = this.usageList.sort((a, b) => (a.TermName > b.TermName ? 1 : -1));
            this.dataSource = new HcTableDataSource(this.filteredUsageList);
            this.dataSource.filterPredicate = (filterData: IUsage, filter: string) => this.usageFilter(filterData, filter);
            this.dataSource.paginator = this.paginator;
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

    usageFilter(data: IUsage, filter: string) {
        const catMatch =
            data.TermCategories.includes(this.selectedCategoriesControl.value) || this.selectedCategoriesControl.value === 'All';
        const termMatch = data.TermName.toLowerCase().includes(filter) || filter === ' ';
        const defMatch = data.TermUsage.toLowerCase().includes(filter) || filter === ' ';

        return catMatch && (termMatch || defMatch);
    }

    onCancel() {
        this.editListForm.reset();
        this.formDirective.resetForm();
        this.formSubmitted = false;
        this.showErrors = false;
    }

    onSubmit() {
        if (this.editListForm.invalid) {
            this.showErrors = true;
            return;
        }

        this.formSubmitted = true;
        const formData = new FormData();
        formData.append('addTerm', this.editListForm.controls.addTerm.value);
        formData.append('addDef', this.editListForm.controls.addDef.value);
        formData.append('yourName', this.editListForm.controls.yourName.value);
        formData.append('yourEmail', this.editListForm.controls.yourEmail.value);
        formData.append('comment', this.editListForm.controls.comment.value);
        formData.append('addNew', this.editListForm.controls.addNew.value);

        this.httpClient.post<any>(this.scriptURL, formData).subscribe(
            res => console.log(res),
            err => console.log(err)
        );

        this.editListForm.reset();
        this.formDirective.resetForm();
    }

    getFormFillData(termItem: IUsage): void {
        this.tabSetRef._setActive(this.formTabRef);
        this.editListForm.patchValue({
            addTerm: termItem.TermName,
            addDef: termItem.TermUsage,
            addNew: 'false'
        });
    }
}
