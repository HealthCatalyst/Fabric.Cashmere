import {Component} from '@angular/core';

@Component({
    selector: 'hc-radio-button-demo',
    templateUrl: './radio-button-demo.component.html'
})
export class RadioButtonDemoComponent {
    favoriteShow: string | null = 'Silicon Valley';
    shows = ['Silicon Valley', 'Game of Thrones', 'Better Call Saul'];
    lastModified: Date = new Date(document.lastModified);

    reset(): void {
        this.favoriteShow = null;
    }
}
