import {Component, ComponentFactoryResolver, Input, ViewChild, ViewContainerRef} from '@angular/core';
import {EXAMPLE_COMPONENTS, LiveExample} from '@healthcatalyst/cashmere-examples';
import {HttpClient} from '@angular/common/http';

@Component({
    selector: 'hc-example-viewer',
    templateUrl: 'example-viewer.component.html',
    styleUrls: ['example-viewer.component.scss']
})
export class ExampleViewerComponent {
    private _exampleData: LiveExample;

    @ViewChild('vc', {read: ViewContainerRef})
    _demoContainer: ViewContainerRef;

    @Input()
    set example(example: string) {
        this._example = example;
        this._exampleData = EXAMPLE_COMPONENTS[example];
        setTimeout(() => this._attachComponentToOutlet());
    }

    get example() {
        return this._example;
    }

    private _example: string;

    constructor(private _componentFactoryResolver: ComponentFactoryResolver, private httpClient: HttpClient) {}

    private _attachComponentToOutlet() {
        if (this._demoContainer.length > 0) {
            this._demoContainer.clear();
        }

        const resolvedFactory = this._componentFactoryResolver.resolveComponentFactory(this._exampleData.component);
        this._demoContainer.createComponent(resolvedFactory, 0, this._demoContainer.parentInjector);
    }

    exampleFileUrl(ext: string): string {
        if (ext === 'Typescript') {
            ext = 'ts';
        }
        return `/assets/docs/examples/${this.example}-example-${ext.toLowerCase()}.html`;
    }
}
