import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'hc-popover-demo',
  templateUrl: './popover-demo.component.html',
  styleUrls: ['./popover-demo.component.scss']
})
export class PopoverDemoComponent implements OnInit {
  public body: string = 'dynamic content';
  constructor() { }

  ngOnInit() {
  }

}
