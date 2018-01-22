import { Component, OnInit, ViewEncapsulation, Input, QueryList, ContentChildren } from '@angular/core';
import { NavbarLinkComponent } from 'app/lib/navbar/navbar-link/navbar-link.component';

@Component({
  selector: 'hc-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NavbarComponent implements OnInit {

  @Input() user: string;

  @Input() appIcon: string;

  @Input() homeUri: string;

  constructor() { }

  ngOnInit() {
  }

}
