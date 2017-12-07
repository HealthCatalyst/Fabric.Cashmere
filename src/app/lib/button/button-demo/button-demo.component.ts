import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ButtonOptions } from 'app/lib/cashmere';

@Component({
  selector: 'hc-button-demo',
  templateUrl: './button-demo.component.html',
  styleUrls: ['./button-demo.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ButtonDemoComponent implements OnInit {

  public showTemplate: boolean = true;

  public primaryButton1Options: ButtonOptions = {
    buttonName: 'Primary Button',
    buttonIcon: '',
    buttonType: 'primary',
    buttonDisabled: false,
    buttonDisplayed: true,
    tooltip: 'Primary Button'
  };

  public primaryButton2Options: ButtonOptions = {
    buttonName: 'Primary Button',
    buttonIcon: '',
    buttonType: 'primary-alt1',
    buttonDisabled: false,
    buttonDisplayed: true,
    tooltip: 'Primary Button'
  };

  public primaryButton3Options: ButtonOptions = {
    buttonName: 'Primary Button',
    buttonIcon: '',
    buttonType: 'primary-alt2',
    buttonDisabled: false,
    buttonDisplayed: true,
    tooltip: 'Primary Button'
  };

  public primaryButton4Options: ButtonOptions = {
    buttonName: 'Primary Button',
    buttonIcon: '',
    buttonType: 'primary-alt3',
    buttonDisabled: false,
    buttonDisplayed: true,
    tooltip: 'Primary Button'
  };

  public secondaryButtonOptions: ButtonOptions = {
    buttonName: 'Secondary Button',
    buttonIcon: '',
    buttonType: 'secondary',
    buttonDisabled: false,
    buttonDisplayed: true,
    tooltip: 'Secondary Button'
  };

  public disabledButtonOptions: ButtonOptions = {
    buttonName: 'Disabled Button',
    buttonIcon: '',
    buttonType: 'primary',
    buttonDisabled: true,
    buttonDisplayed: true,
    tooltip: 'Disabled Button'
  }

  public tertiaryButtonOptions: ButtonOptions = {
    buttonName: 'Tertiary Button/Link',
    buttonIcon: '',
    buttonType: 'tertiary',
    buttonDisabled: false,
    buttonDisplayed: true,
    tooltip: 'Tertiary Button/Link'
  };

  constructor() { }

  ngOnInit() {
  }

  viewToggle(show: 'ts' | 'html') {
    if (show === 'html') {
      this.showTemplate = true;
    } else {
      this.showTemplate = false;
    }
  }

}
