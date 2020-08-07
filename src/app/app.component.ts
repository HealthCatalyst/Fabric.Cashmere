import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { FormControl } from '@angular/forms';
// tslint:disable-next-line: use-pipe-transform-interface
@Component({
    selector: 'hc-root',
    styleUrls: ['./app.component.scss'],
    templateUrl: './app.component.html'
})

export class AppComponent implements AfterViewInit {
    @ViewChild('hc-nav-search-input', { static: false }) userInput: ElementRef;

    ngAfterViewInit() {
        this.userInput.nativeElement.addEventListener('keyup', (event) => {
            if (event.key.length === 1) {
                this.getItems(event);
            }
        });
    }

    getItems = (event) => {
        console.log(event);
    }
    // tslint:disable-next-line: member-ordering
    searchResults = [
        { title: "Navbar Component", sourceLink1: "CustomerBASE", sourceLink2: "AdventureWorksLocal", description: "Created 10 months ago • Jared Ammerman • Platform", subContent: "In order to edit the descriptions within ATLAS does a user have to be an Admin and" },
        { title: "Navbar Documentation", sourceLink1: "CustomerBASE", sourceLink2: "AdventureWorksLocal", description: "Created 10 months ago • Jared Ammerman • Platform", subContent: "When searching Atlas it would be nice to have the results tabularized.  For example: " },
        { title: "Subnavbar Component", sourceLink1: "CustomerBASE", sourceLink2: "AdventureWorksLocal", description: "Created 10 months ago • Jared Ammerman • Platform", subContent: "I have a couple of questions as it relates to the Comment tab within Atlas.   1) Are th" },
        { title: "Subnavbar Documentation", sourceLink1: "CustomerBASE", sourceLink2: "AdventureWorksLocal", description: "Created 10 months ago • Jared Ammerman • Platform", subContent: "K.C. Bell demos the latest progress on Atlas’s EDW Visualization feature and explain" },
    ];

    // tslint:disable-next-line: member-ordering
    navSearchBar = new FormControl('');

    public showAll = () => {
        console.log("showing all");
    };

}



