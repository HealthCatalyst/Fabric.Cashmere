import {Component, OnInit} from '@angular/core';
import {HcTableDataSource} from '@healthcatalyst/cashmere';

/**
 * @title Table sticky header
 */
@Component({
    selector: 'hc-table-sticky-example',
    templateUrl: 'table-sticky-example.component.html',
    styleUrls: ['table-sticky-example.component.scss'],
    standalone: false
})
export class TableStickyExampleComponent implements OnInit {
    cols = ['name', 'state', 'population', 'founded', 'size', 'notes'];
    allCols = ['rank', ...this.cols];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dataSource: HcTableDataSource<any>;
    hasBorders = false;
    stickyHead = true;
    stickyCol = true;
    hasGrayBg = false;

    ngOnInit(): void {
      this.dataSource = new HcTableDataSource(CITY_DATA);
    }
  }

  const CITY_DATA = [
    {
      rank: 1,
      name: 'New York City',
      state: 'New York',
      population: 7888121,
      founded: 1624,
      size: 302.6,
      notes: 'Known for the Statue of Liberty, Empire State Building, Central Park, Times Square, Museums, and the Met'
    },
    {
      rank: 2,
      name: 'Los Angeles',
      state: 'California',
      population: 3792621,
      founded: 1781,
      size: 468.7,
      notes: 'Known for Hollywood, Entertainment, Celebrities, and the Beach'
    },
    {
      rank: 3,
      name: 'Chicago',
      state: 'Illinois',
      population: 2695598,
      founded: 1837,
      size: 227.6,
      notes: 'Known for the Sears (Willis) Tower, the Magnificent Mile, Deep Dish Pizza, and the Cubs'
    },
    {
      rank: 4,
      name: 'Houston',
      state: 'Texas',
      population: 2100263,
      founded: 1837,
      size: 599.6,
      notes: 'Known for NASA, the Astros, and the Rockets'
    },
    {
      rank: 5,
      name: 'Philadelphia',
      state: 'Pennsylvania',
      population: 1526006,
      founded: 1682,
      size: 134.1,
      notes: 'Known for the Liberty Bell, Independence Hall, and the Philly Cheesesteak'
    },
    {
      rank: 6,
      name: 'Phoenix',
      state: 'Arizona',
      population: 1445632,
      founded: 1881,
      size: 516.7,
      notes: 'Known for the Heat, the Suns, and the Grand Canyon'
    },
    {
      rank: 7,
      name: 'San Antonio',
      state: 'Texas',
      population: 1327407,
      founded: 1718,
      size: 460.9,
      notes: 'Known for the Alamo, the River Walk, and the Spurs'
    },
    {
      rank: 8,
      name: 'San Diego',
      state: 'California',
      population: 1307402,
      founded: 1769,
      size: 325.2,
      notes: 'Known for the Zoo, Sea World, and the Beach'
    },
    {
      rank: 9,
      name: 'Dallas',
      state: 'Texas',
      population: 1197816,
      founded: 1841,
      size: 340.9,
      notes: 'Known for the Cowboys, the Mavericks, and the Rangers'
    },
    {
      rank: 10,
      name: 'San Jose',
      state: 'California',
      population: 945942,
      founded: 1777,
      size: 176.5,
      notes: 'Known for Silicon Valley, Tech Companies, and the Sharks'
    },
    {
      rank: 11,
      name: 'Austin',
      state: 'Texas',
      population: 790390,
      founded: 1839,
      size: 322.48,
      notes: 'Known for the Longhorns, the State Capital, and the Music Scene'
    },
    {
      rank: 12,
      name: 'Indianapolis',
      state: 'Indiana',
      population: 843393,
      founded: 1821,
      size: 361.5,
      notes: 'Known for the Indy 500, the Colts, and the Pacers'
    },
    {
      rank: 13,
      name: 'Jacksonville',
      state: 'Florida',
      population: 842583,
      founded: 1822,
      size: 747.0,
      notes: 'Known for the Jaguars, the Beaches, and the Navy'
    },
    {
      rank: 14,
      name: 'San Francisco',
      state: 'California',
      population: 837442,
      founded: 1776,
      size: 231.9,
      notes: 'Known for the Golden Gate Bridge, Alcatraz, and the Cable Cars'
    },
    {
      rank: 15,
      name: 'Columbus',
      state: 'Ohio',
      population: 822553,
      founded: 1812,
      size: 210.3,
      notes: 'Has the largest university in the United States'
    },
    {
      rank: 16,
      name: 'Charlotte',
      state: 'North Carolina',
      population: 792862,
      founded: 1768,
      size: 297.7,
      notes: 'Known for NASCAR, the Hornets, and the Panthers'
    },
    {
      rank: 17,
      name: 'Fort Worth',
      state: 'Texas',
      population: 792727,
      founded: 1849,
      size: 339.8,
      notes: 'Known for the Stockyards, the Cowboys, and the Rangers'
    },
    {
      rank: 18,
      name: 'Detroit',
      state: 'Michigan',
      population: 688701,
      founded: 1701,
      size: 138.8,
      notes: 'Home of the Big Three Automakers'
    },
    {
      rank: 19,
      name: 'El Paso',
      state: 'Texas',
      population: 674433,
      founded: 1850,
      size: 256.8,
      notes: 'Home to the University of Texas at El Paso'
    },
    {
      rank: 20,
      name: 'Memphis',
      state: 'Tennessee',
      population: 653450,
      founded: 1819,
      size: 315.1,
      notes: 'Famous for Elvis Presley, Graceland, and the Blues'
    },
  ];
