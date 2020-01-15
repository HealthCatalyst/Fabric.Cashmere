import {Component, Input, ViewChild, OnInit, ViewContainerRef, ComponentFactoryResolver} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {titleCase} from 'change-case';
import {EXAMPLE_COMPONENTS} from '@healthcatalyst/cashmere-examples';
import {ApplicationInsightsService} from '../../../../shared/application-insights/application-insights.service';

@Component({
    selector: 'hc-usage-example-viewer',
    templateUrl: 'usage-example-viewer.component.html',
    styleUrls: ['usage-example-viewer.component.scss']
})
export class UsageExampleViewerComponent implements OnInit {
    @ViewChild('exampleContainer', {read: ViewContainerRef})
    exampleContainer: ViewContainerRef;

    isInitialized = false;
    private _example: string;
    private allExampleFiles: FileHash = {};
    private appInsights;
    exampleFiles: Array<{name: string; contents: string}> = [];

    constructor(private httpClient: HttpClient, private componentFactoryResolver: ComponentFactoryResolver) {
        this.appInsights = new ApplicationInsightsService();
    }

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

    logClick(tab: string) {
        this.appInsights.logEvent(this._example, tab);
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

    getHtmlFile() {
        if (!this.exampleFiles || !this.exampleFiles.length) {
            return {};
        }

        return this.exampleFiles.find(f => f.name.endsWith('.html'));
    }
}

interface FileHash {
    [path: string]: string;
}
