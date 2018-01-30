import { Component, OnInit, Input, QueryList, ContentChildren } from '@angular/core';
import { NavbarLinkComponent } from 'app/lib/navbar/navbar-link/navbar-link.component';

@Component({
  selector: 'hc-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() user: string;

  @Input() appIcon: string;

  @Input() homeUri: string;

  @Input() fixedTop: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
