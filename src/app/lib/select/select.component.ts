import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'hc-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {

  @Input() placeholder: string;
  @Input() options = [];
  @Input() disabled: boolean = false;
  alpha = 1.0;

  constructor() { }

  ngOnInit() {
    if (this.disabled) {
      this.alpha = 0.4;
    }
  }

}
