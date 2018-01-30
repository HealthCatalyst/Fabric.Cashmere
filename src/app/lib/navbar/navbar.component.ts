import { Component, OnInit, Input, QueryList, ContentChildren } from '@angular/core';

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
