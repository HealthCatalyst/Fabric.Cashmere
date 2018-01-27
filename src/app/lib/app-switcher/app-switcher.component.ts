import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppSwitcherService, IDiscoveryApplication } from 'app/lib/app-switcher/app-switcher.service';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'hc-app-switcher',
  templateUrl: './app-switcher.component.html',
  styleUrls: ['./app-switcher.component.scss']
})
export class AppSwitcherComponent implements OnInit, OnDestroy {
  public applications: Observable<IDiscoveryApplication[]>;
  public subscription: Subscription;

  public appSwitcherUrl: string = '#';

  constructor(private appSwitcherService: AppSwitcherService) { }

  ngOnInit() {
    this.applications = this
      .appSwitcherService
      .getApplications();
    this.subscription = this.applications.subscribe();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
