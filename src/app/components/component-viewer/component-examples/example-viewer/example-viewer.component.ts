import {Component, Input, ViewChild, ElementRef, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {titleCase} from 'change-case';
import stackblitz from '@stackblitz/sdk';
import {expand} from 'rxjs/operators';

@Component({
    selector: 'hc-example-viewer',
    templateUrl: 'example-viewer.component.html',
    styleUrls: ['example-viewer.component.scss']
})
export class ExampleViewerComponent implements OnInit {
    @ViewChild('exampleContainer')
    exampleContainer: ElementRef;

    isInitialized = false;
    private _example: string;
    private allExampleFiles: FileHash = {};
    exampleFiles: Array<{name: string; contents: string}> = [];

    constructor(private httpClient: HttpClient) {}

    @Input()
    get example() {
        return this._example;
    }
    set example(example: string) {
        this._example = example;
        if (example && this.isInitialized) {
            this.loadExampleFiles();
        }
    }

    get exampleTitle() {
        return titleCase(this._example);
    }

    async ngOnInit() {
        if (this.example) {
            await this.loadExampleFiles();
            this.isInitialized = true;
        }
    }

    async loadExampleFiles() {
        this.allExampleFiles = await this.httpClient.get<FileHash>(`/assets/docs/examples/${this.example}.json`).toPromise();
        const exampleRoot = `src/app/${this.example}/`;
        this.exampleFiles = Object.keys(this.allExampleFiles)
            .filter(path => path.startsWith(exampleRoot))
            .map(path => ({
                name: path.substr(exampleRoot.length + this.example.length + 1),
                contents: this.allExampleFiles[path]
            }));
    }

    async launchStackBlitz() {
        const exampleFiles = this.allExampleFiles;
        const containerPath = `src/app/example-container.component.ts`;
        exampleFiles[containerPath] = exampleFiles[containerPath].replace(/hc-example/g, `hc-${this.example}-example`);
        const dependencies = JSON.parse(exampleFiles['package.json']).dependencies;
        await stackblitz.openProject(
            {
                files: exampleFiles,
                template: 'angular-cli',
                title: this.exampleTitle,
                description: this.exampleTitle,
                dependencies: dependencies
            },
            {
                openFile: `src/app/${this.example}/${this.example}-example.component.html`,
                hideDevTools: true
            }
        );
    }
}

interface FileHash {
    [path: string]: string;
}
