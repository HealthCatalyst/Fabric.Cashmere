import {Component, Input, ViewChild, ElementRef, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {titleCase} from 'change-case';
import stackblitz from '@stackblitz/sdk';

@Component({
    selector: 'hc-example-viewer',
    templateUrl: 'example-viewer.component.html',
    styleUrls: ['example-viewer.component.scss']
})
export class ExampleViewerComponent implements OnInit {
    @ViewChild('exampleContainer')
    exampleContainer: ElementRef;

    private isInitialized = false;
    private _example: string;

    constructor(private httpClient: HttpClient) {}

    @Input()
    get example() {
        return this._example;
    }
    set example(example: string) {
        this._example = example;
        if (example && this.isInitialized) {
            this.loadStackBlitz();
        }
    }

    get exampleTitle() {
        return titleCase(this._example);
    }

    ngOnInit() {
        if (this.example) {
            this.loadStackBlitz();
        }
        this.isInitialized = true;
    }

    async loadStackBlitz() {
        const exampleFiles = await this.httpClient.get<FileHash>(`/assets/docs/examples/${this.example}.json`).toPromise();
        const dependencies = JSON.parse(exampleFiles['package.json']).dependencies;
        await stackblitz.embedProject(
            this.exampleContainer.nativeElement,
            {
                files: exampleFiles,
                template: 'angular-cli',
                title: this.exampleTitle,
                description: this.exampleTitle,
                dependencies: dependencies
            },
            {
                openFile: `src/app/${this.example}/${this.example}-example.component.html`,
                clickToLoad: true,
                hideDevTools: true,
                forceEmbedLayout: true
            }
        );
    }
}

interface FileHash {
    [path: string]: string;
}
