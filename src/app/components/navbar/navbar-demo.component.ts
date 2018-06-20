import {Component} from '@angular/core';

@Component({
    selector: 'hc-navbar-demo',
    templateUrl: './navbar-demo.component.html'
})
export class NavbarDemoComponent {
    lastModified: Date = new Date(document.lastModified);

    aboutClick($event) {
        alert('about us!');
    }
}
