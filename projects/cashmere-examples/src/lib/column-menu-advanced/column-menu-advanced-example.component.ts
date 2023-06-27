import {Component} from '@angular/core';
import { HcTableDataSource, HcDynamicColumn } from '@healthcatalyst/cashmere';

/**
 * @title Advanced Column Menu
 */
@Component({
    selector: 'hc-column-menu-advanced-example',
    templateUrl: 'column-menu-advanced-example.component.html',
    styleUrls: ['column-menu-advanced-example.component.scss']
})
export class ColumnMenuAdvancedExampleComponent {
    dataSource: HcTableDataSource<BrandonSandersonBook>;
    readonly cacheKey = 'HC_CASHMERE_SANDERSON_GRID';
    columns: HcDynamicColumn[] = [
        {name: 'name', title: 'Name', isHidable: false},
        {name: 'series', title: 'Series'},
        {name: 'year', title: 'Released'},
        {name: 'pages', title: 'Pages'},
        {name: 'isInCosmere', title: 'Cosmere'},
        {name: 'characters', title: 'Characters', isShownByDefault: false}
    ];
    staticPrefixCols = ['checkbox'];
    staticSuffixCols = ['actions'];

    ngOnInit(): void {
        this.dataSource = new HcTableDataSource(DATA);
    }
}

export interface BrandonSandersonBook {
    name: string;
    year: number;
    pages: number;
    series: string;
    isInCosmere: boolean;
    characters: string[];
}

const DATA: BrandonSandersonBook[] = [
    { name: 'The Final Empire', series: 'Mistborn', year: 2006, pages: 544, isInCosmere: true, characters: ['Vin', 'Kelsier', 'Sazed'] },
    { name: 'The Well of Ascension', series: 'Mistborn', year: 2007, pages: 592, isInCosmere: true, characters: ['Vin', 'Kelsier', 'Sazed'] },
    { name: 'The Age of Heroes', series: 'Mistborn', year: 2009, pages: 760, isInCosmere: true, characters: ['Vin', 'Kelsier', 'Sazed'] },
    { name: 'The Way of Kings', series: 'Stormlight Archives', year: 2010, pages: 1007, isInCosmere: true, characters: ['Kaladin', 'Shallan', 'Dalinar'] },
    { name: 'The Alloy of Law', series: 'Mistborn', year: 2011, pages: 332, isInCosmere: true, characters: ['Wax', 'Wayne', 'Marasi'] },
    { name: 'Steelheart', series: 'The Reckoners', year: 2013, pages: 386, isInCosmere: false, characters: ['David', 'Megan', 'Prof'] },
    { name: 'Words of Radiance', series: 'Stormlight Archives', year: 2014, pages: 1087, isInCosmere: true, characters: ['Kaladin', 'Shallan', 'Dalinar'] },
    { name: 'Firefight', series: 'The Reckoners', year: 2015, pages: 416, isInCosmere: false, characters: ['David', 'Megan', 'Prof'] },
    { name: 'Shadows of Self', series: 'Mistborn', year: 2015, pages: 383, isInCosmere: true, characters: ['Wax', 'Wayne', 'Marasi'] },
    { name: 'Calamity', series: 'Skyward', year: 2016, pages: 421, isInCosmere: false, characters: ['David', 'Megan', 'Prof'] },
    { name: 'The Bands of Mourning', series: 'Mistborn', year: 2016, pages: 447, isInCosmere: true, characters: ['Wax', 'Wayne', 'Marasi'] },
    { name: 'Oathbringer', series: 'Stormlight Archives', year: 2017, pages: 1243, isInCosmere: true, characters: ['Kaladin', 'Shallan', 'Dalinar'] },
    { name: 'Skyward', series: 'Skyward', year: 2018, pages: 510, isInCosmere: false, characters: ['Spensa', 'Jorgen', 'M-Bot'] },
    { name: 'Starsight', series: 'Skyward', year: 2019, pages: 461, isInCosmere: false, characters: ['Spensa', 'Jorgen', 'M-Bot'] },
    { name: 'Rhythm of War', series: 'Stormlight Archives', year: 2020, pages: 1232, isInCosmere: true, characters: ['Kaladin', 'Shallan', 'Dalinar']},
    { name: 'The Lost Metal', series: 'Mistborn', year: 2021, pages: 513, isInCosmere: true, characters: ['Wax', 'Wayne', 'Marasi']},
    { name: 'Defiant', series: 'Skyward', year: 2023, pages: 432, isInCosmere: false, characters: ['Spensa', 'Jorgen', 'M-Bot'] },
    { name: 'Elantris', series: 'Elantris', year: 2005, pages: 638, isInCosmere: true, characters: ['Raoden', 'Sarene', 'Hrathen'] },
    { name: 'Warbreaker', series: 'Warbreaker', year: 2009, pages: 652, isInCosmere: true, characters: ['Vivenna', 'Vasher', 'Lightsong'] }
];
