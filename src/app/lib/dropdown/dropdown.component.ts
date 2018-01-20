import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'hc-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {

  @Input() placeholder: string;
  @Input() options = [];
  @Input() width: string;

  selectWidth = '350px';

  constructor() { }

  ngOnInit() {
    if (this.width) {
      this.selectWidth = this.width;
    }
  }

}
