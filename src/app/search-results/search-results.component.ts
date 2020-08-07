import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PaginationComponent, HcTableDataSource } from '@healthcatalyst/cashmere';

@Component({
    selector: 'hc-search-results',
    templateUrl: './search-results.component.html',
    styleUrls: ['./search-results.component.scss']
})

export class SearchResultsComponent implements AfterViewInit {
    searchBar = new FormControl("");
    SearchResultsData = [
        { title: "Navbar Component", sourceLink1: "CustomerBASE", sourceLink2: "AdventureWorksLocal", description: "Created 10 months ago • Jared Ammerman • Platform", subContent: "In order to edit the descriptions within ATLAS does a user have to be an Admin and" },
        { title: "Navbar Documentation", sourceLink1: "CustomerBASE", sourceLink2: "AdventureWorksLocal", description: "Created 10 months ago • Jared Ammerman • Platform", subContent: "When searching Atlas it would be nice to have the results tabularized.  For example: " },
        { title: "Subnavbar Component", sourceLink1: "CustomerBASE", sourceLink2: "AdventureWorksLocal", description: "Created 10 months ago • Jared Ammerman • Platform", subContent: "I have a couple of questions as it relates to the Comment tab within Atlas.   1) Are th" },
        { title: "Subnavbar Documentation", sourceLink1: "CustomerBASE", sourceLink2: "AdventureWorksLocal", description: "Created 10 months ago • Jared Ammerman • Platform", subContent: "K.C. Bell demos the latest progress on Atlas’s EDW Visualization feature and explain" },
        { title: "Navbar Component", sourceLink1: "CustomerBASE", sourceLink2: "AdventureWorksLocal", description: "Created 10 months ago • Jared Ammerman • Platform", subContent: "In order to edit the descriptions within ATLAS does a user have to be an Admin and" },
    ];
    pageNumber = 1;
    length = this.SearchResultsData.length;
    @ViewChild(PaginationComponent, { static: false })
    paginator: PaginationComponent;

    ngAfterViewInit(): void {
    }
}