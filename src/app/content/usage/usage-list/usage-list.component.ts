import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PaginationComponent, HcTableDataSource, TabChangeEvent } from '@healthcatalyst/cashmere';
import { SectionService } from 'src/app/shared/section.service';
import { BaseDemoComponent } from '../../../shared/base-demo.component';
import { UsageService } from '../usage.service';
import { IUsage } from '../usage';
import { IListFilter } from '../listfilter';
// import { ConsoleReporter } from 'jasmine';

@Component({
    selector: 'hc-usage-list',
    templateUrl: './usage-list.component.html',
    styleUrls: ['./usage-list.component.scss']
})
export class UsageListComponent extends BaseDemoComponent implements OnInit, AfterViewInit {
    filteredUsageList: IUsage[];
    usageList: IUsage[] = [];
    filterArray: IListFilter[] = [];
    categories = ['Health Catalyst', 'Industry', 'Technical'];
    mySearch: string;
    myCategory: string;
    readonly selectedCategoriesControl = new FormControl([]);
    readonly selectedTypesControl = new FormControl([]);
    readonly searchControl = new FormControl([]);

    editListForm: FormGroup;
    formSubmitted = false;
    scriptURL = 'https://script.google.com/macros/s/AKfycbwWZCf0aBg1e5BFD9G-hVTb-zbSTXT1KGFSwoyRLwMhu7FZF2g/exec';
    editForm = document.forms['editListForm'];

    types = ['Abbreviation']; //<!--'glossary', 'usage', 'trademarks'--->

    newList: string[]=[];
    newMap = new Map([]);
    resultList;


    displayedColumns: string[] = ['term', 'usage', 'edit'];
    dataSource;
    pageNumber = 1;
    pageOpts = [5, 10, 20];

    selectedIndex: number = 0;

    selectionChanged(event: TabChangeEvent) {
        this.selectedIndex = event.index;
    }

    addTask(event: Event) {
        window.alert('The "Add Task tab was clicked.');
    }

    constructor(sectionService: SectionService, private usageService: UsageService, private fb: FormBuilder, private httpClient: HttpClient ) {
        super(sectionService);}

    get length(): number {
        return this.usageList.length;
    }

    @ViewChild(PaginationComponent)
      paginator: PaginationComponent;

    applyFilter(myFilter: string, myControl: string) {

            myFilter = myFilter.trim().toLowerCase();
            // console.log(myFilter);

            if (myControl === "searchControl") {
                this.mySearch = myFilter;
                this.myCategory = this.selectedCategoriesControl.value;
            }
            else {
                this.myCategory = myFilter;
                this.mySearch = this.searchControl.value.trim().toLowerCase();
            }

            this.filterArray = [
                {
                    filterKey: this.mySearch,
                    filterColumn: "TermName"
                },
                {
                    filterKey: this.myCategory,
                    filterColumn: "TermCategory"
                }
            ]

            // use myFilter for search filter or filterArray for multiple filters
            this.dataSource.filter = myFilter;

    }

    ngOnInit(): void {
        this.usageList = this.usageService.getUsageList();
        this.filteredUsageList = this.usageList;
        this.dataSource = new HcTableDataSource(this.filteredUsageList);

        // filterPredicate for one filter (search filter)
        this.dataSource.filterPredicate = (data: IUsage, filter: any) => {
            let filterColumn = data.TermName.toLocaleLowerCase();
            return filterColumn.indexOf(filter) !== -1;
        }

        // filterPredicate for multiple filters ... but not working
        // this.dataSource.filterPredicate = (data: IUsage, filter: any) => {

        //     filter.forEach((element, index, array): boolean => {

        //             // console.log(element.filterColumn);
        //         return data[element.filterColumn].indexOf(element.filterKey) !== -1;

        //     })
        // }

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

    save() {
        // console.log(this.editListForm);
        // console.log('Saved: ' + JSON.stringify(this.editListForm.value));
    }

    // Needs work ... how to reset validators so they're not all red when the form resets?
    onCancel () {
        this.editListForm.reset();
        this.editListForm.markAsPristine();
        this.editListForm.markAsUntouched();
        this.editListForm.updateValueAndValidity();
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
        console.log(serializedForm);

        this.httpClient.post<any>(this.scriptURL, formData).subscribe(
            (res) => console.log(res),
            (err) => console.log(err)
        );

        this.editListForm.reset();

    }
}
