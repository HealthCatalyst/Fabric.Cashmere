import {Component, OnInit} from '@angular/core';
import {CheckboxChangeEvent, IUser} from '@wcf-insurance/cashmere';
import {BreakpointObserver, BreakpointState} from '@angular/cdk/layout';
import {forEach} from '@angular/router/src/utils/collection';

@Component({
    selector: 'hc-sidenav-demo',
    templateUrl: 'sidenav-demo.component.html',
    styleUrls: ['sidenav-demo.component.scss']
})
export class SidenavDemoComponent implements OnInit {
    mobileView = false;
    user: IUser = {
        name: 'John Doe',
        avatar: '/src/assets/avatar.jpg'
    };

    dummyContent: string[] = [];

    constructor(public breakpointObserver: BreakpointObserver) {}

    ngOnInit() {
        this.breakpointObserver
            .observe(['(max-width: 768px)'])
            .subscribe((state: BreakpointState) => {
                if (state.matches) {
                    this.mobileView = true;
                    console.log('Viewport is 768px or under!');
                } else {
                    this.mobileView = false;
                    console.log('Viewport is getting bigger!');
                }
            });

        for (let i = 0; i < 100; i++) {
            this.dummyContent.push(`Content ${i + 1}`);
        }
    }

    mobileViewChanged(event: CheckboxChangeEvent) {
        this.mobileView = event.checked;
    }
}
