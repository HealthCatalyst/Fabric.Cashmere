import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import {PaginationComponent, HcTableDataSource, TabChangeEvent} from '@healthcatalyst/cashmere';
import {SectionService} from 'src/app/shared/section.service';
import {BaseDemoComponent} from '../../../shared/base-demo.component';
import {UsageService} from '../usage.service';
import {IUsage} from '../usage';

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

    editListForm: FormGroup;
    formSubmitted = false;
    scriptURL = 'https://script.google.com/macros/s/AKfycbwWZCf0aBg1e5BFD9G-hVTb-zbSTXT1KGFSwoyRLwMhu7FZF2g/exec';
    editForm = document.forms['editListForm'];

    displayedColumns: string[] = ['term', 'usage', 'edit'];
    dataSource: HcTableDataSource<IUsage>;
    pageNumber = 1;
    pageOpts = [5, 10, 20];

    constructor(
        sectionService: SectionService,
        private usageService: UsageService,
        private fb: FormBuilder,
        private httpClient: HttpClient
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
        if ( filterStr ) {
            this.dataSource.filter = filterStr.trim().toLowerCase();
        } else {
            this.dataSource.filter = ' ';
        }
    }

    ngOnInit(): void {
        this.usageList = this.usageService.getUsageList();
        this.filteredUsageList = this.usageList;
        this.dataSource = new HcTableDataSource(this.filteredUsageList);

        this.dataSource.filterPredicate = (data: IUsage, filter: string) => this.usageFilter(data, filter);

        this.editListForm = this.fb.group({
            addTerm: ['', Validators.required],
            addDef: ['', Validators.required],
            yourEmail: ['', [Validators.required, Validators.email]],
            yourName: ['', [Validators.required, Validators.minLength(3)]]
        });
    }
    ngAfterViewInit(): void {
        this.dataSource.paginator = this.paginator;
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
    }

    onSubmit() {
        this.formSubmitted = true;

        if (this.editListForm.invalid) {
            return;
        }

        const formData = new FormData();
        formData.append('addTerm', this.editListForm.controls.addTerm.value);
        formData.append('addDef', this.editListForm.controls.addDef.value);
        formData.append('yourName', this.editListForm.controls.yourName.value);
        formData.append('yourEmail', this.editListForm.controls.yourEmail.value);

        const formObject = this.editListForm.getRawValue();
        const serializedForm = JSON.stringify(formObject);

        this.httpClient.post<any>(this.scriptURL, formData).subscribe(
            res => console.log(res),
            err => console.log(err)
        );

        this.editListForm.reset();
    }
}
