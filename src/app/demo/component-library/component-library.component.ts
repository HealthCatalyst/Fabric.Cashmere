import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'hc-component-library',
  templateUrl: './component-library.component.html',
  styleUrls: ['./component-library.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ComponentLibraryComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
