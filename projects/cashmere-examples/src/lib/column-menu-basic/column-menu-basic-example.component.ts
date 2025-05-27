import {Component} from '@angular/core';
import { HcTableDataSource, HcDynamicColumn } from '@healthcatalyst/cashmere';

/**
 * @title Basic Column Menu
 */
@Component({
    selector: 'hc-column-menu-basic-example',
    templateUrl: 'column-menu-basic-example.component.html',
    styleUrls: ['column-menu-basic-example.component.scss'],
    standalone: false
})
export class ColumnMenuBasicExampleComponent {
    dataSource: HcTableDataSource<VideoGame>;
    columns: HcDynamicColumn[] = [
        {name: 'name', title: 'Name', isHidable: true, isShownByDefault: true},
        {name: 'platform', title: 'Platform', isHidable: true, isShownByDefault: true},
        {name: 'year', title: 'Released', isHidable: true, isShownByDefault: true},
        {name: 'genre', title: 'Genre', isHidable: true, isShownByDefault: true},
        {name: 'copiesSold', title: 'Copies Sold', isHidable: true, isShownByDefault: false},
        {name: 'multiplayer', title: 'Players', isHidable: true, isShownByDefault: true}
    ];

    ngOnInit(): void {
        this.dataSource = new HcTableDataSource(DATA);
    }
}

export interface VideoGame {
    name: string;
    platform: string;
    year: number;
    genre: string;
    copiesSold?: number;
    multiplayer?: boolean;
}

const DATA: VideoGame[] = [
    {name: 'The Legend of Zelda: Breath of the Wild', platform: 'Nintendo Switch', year: 2017, genre: 'Action-adventure', copiesSold: 16000000, multiplayer: false},
    {name: 'Super Mario Odyssey', platform: 'Nintendo Switch', year: 2017, genre: 'Platformer', copiesSold: 16000000, multiplayer: false},
    {name: 'Red Dead Redemption 2', platform: 'PlayStation 4', year: 2018, genre: 'Action-adventure', copiesSold: 15000000, multiplayer: true},
    {name: 'Kingdom Hearts III', platform: 'PlayStation 4', year: 2019, genre: 'Action RPG', copiesSold: 8000000, multiplayer: false},
    {name: 'Super Smash Bros. Ultimate', platform: 'Nintendo Switch', year: 2018, genre: 'Fighting', copiesSold: 7000000, multiplayer: true},
    {name: 'Pokémon Sword and Shield', platform: 'Nintendo Switch', year: 2019, genre: 'Role-playing', copiesSold: 6000000, multiplayer: true},
    {name: 'Halo Infinite', platform: 'Xbox One', year: 2020, genre: 'First-person shooter', copiesSold: 6000000, multiplayer: true},
    {name: 'The Last of Us Part II', platform: 'PlayStation 4', year: 2020, genre: 'Action-adventure', copiesSold: 4000000, multiplayer: false},
    {name: 'Cyberpunk 2077', platform: 'PlayStation 4', year: 2020, genre: 'Action role-playing', copiesSold: 4000000, multiplayer: false},
    {name: 'FIFA 20', platform: 'Xbox One', year: 2019, genre: 'Sports', copiesSold: 4000000, multiplayer: true},
];
