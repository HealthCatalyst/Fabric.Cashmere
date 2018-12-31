import {Component, Input, ViewChild, ElementRef, OnInit, ViewContainerRef, ComponentFactoryResolver} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {titleCase} from 'change-case';
import stackblitz from '@stackblitz/sdk';
import {EXAMPLE_COMPONENTS} from '@healthcatalyst/cashmere-examples';
import {expand} from 'rxjs/operators';

@Component({
    selector: 'hc-example-viewer',
    templateUrl: 'example-viewer.component.html',
    styleUrls: ['example-viewer.component.scss']
})
export class ExampleViewerComponent implements OnInit {
    @ViewChild('exampleContainer', {read: ViewContainerRef})
    exampleContainer: ViewContainerRef;

    isInitialized = false;
    private _example: string;
    private allExampleFiles: FileHash = {};
    exampleFiles: Array<{name: string; contents: string}> = [];

    constructor(private httpClient: HttpClient, private componentFactoryResolver: ComponentFactoryResolver) {}

    @Input()
    get example() {
        return this._example;
    }
    set example(example: string) {
        this._example = example;
        if (example && this.isInitialized) {
            this.loadExample();
        }
    }

    get exampleTitle() {
        return titleCase(this._example);
    }

    async ngOnInit() {
        if (this.example) {
            await this.loadExample();
            this.isInitialized = true;
        }
    }

    getTabTitle(fileName: string) {
        switch (fileName) {
            case 'example.component.ts':
                return 'TS';
            case 'example.component.html':
                return 'HTML';
            case 'example.component.scss':
                return 'SCSS';
        }
        if (fileName.includes('.module.ts')) {
            return 'Module';
        }
        if (fileName.includes('.component.')) {
            const parts = fileName.split('.component.');
            return `${parts[0]} (${parts[1].toUpperCase()})`;
        }
        return fileName;
    }

    async loadExample() {
        if (this.exampleContainer.length) {
            this.exampleContainer.clear();
        }

        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(EXAMPLE_COMPONENTS[this.example]);
        this.exampleContainer.createComponent(componentFactory, 0, this.exampleContainer.parentInjector);

        await this.loadExampleFiles();
    }

    async loadExampleFiles() {
        this.allExampleFiles = await this.httpClient.get<FileHash>(`/assets/docs/examples/${this.example}.json`).toPromise();
        const exampleRoot = `src/app/${this.example}/`;
        this.exampleFiles = Object.keys(this.allExampleFiles)
            .filter(path => path.startsWith(exampleRoot))
            .map(path => ({
                name: path.substr(exampleRoot.length + this.example.length + 1),
                contents: this.allExampleFiles[path]
            }))
            .sort((a, b) => b.name.localeCompare(a.name));
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
