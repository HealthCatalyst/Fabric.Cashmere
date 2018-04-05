:::
##### Creating a modal using a component
Using the `open` function on `ModalService` you can pass in a component type. This component must be specified in your module's EntryComponents.
``` typescript
import { ModalService, ModalOptions, HcModal } from '@healthcatalyst/cashmere';
@Component({
    selector: 'hc-modal-demo',
    templateUrl: './modal-demo.component.html',
})
export class ModalDemoComponent {
    result: any;
    ...
    constructor(private modalService: ModalService) { }
    ...
    public open() {
        let options: ModalOptions = {
            data: 'I got this data from the class that opened me',
            ignoreEscapeKey: true,
            ignoreOverlayClick: true,
            size: 'lg'
        };
        let modal: HcModal<ExampleComponent>
            = this.modalService.open(ExampleComponent, options);
        modal.result.subscribe(res => this.result = res);
    }
    ...
}
```
:::

:::
##### Creating a modal using a template
Using the `open` function on `ModalService` you can pass in a template reference.

#### Template
``` html
<ng-template #content let-close="close" let-dismiss="dismiss" let-data="data">
    <hc-modal>
        <hc-modal-header>Modal Title</hc-modal-header>
        <hc-modal-body> body content </hc-modal-body>
        <hc-modal-footer>
        <button hc-button color="tertiary" (click)="dismiss()"> Cancel </button>
        <button hc-button color="primary" (click)="close()"> OK </button>
        </hc-modal-footer>
    </hc-modal>
</ng-template>
<button hc-button color="primary" (click)="openContent(content)"></button>
```
#### Component
``` typescript
public openContent(content: TemplateRef<any>) {
    let options: ModalOptions = { size: 'lg' };
    this.modalService.open(content, options)
}
```
:::

:::
##### ModalOptions Properties
| Name | Type | Description |
| - | - | - |
|size|string|`sm|md|lg|xl` Allows user to configure the modal size (Default=`'md'`) |
|ignoreEscapeKey|boolean|Defaults to false. Set to true to disable the closure of a modal by pressing the escape key.|
|ignoreOverlayClick|boolean|Defaults to false. Set to true to disable the closure of a modal by clicking on the overlay.|
|container|HTMLElement|Optional. Specify a different HTML element to append the modal overlay and modal window. If not specified the modal elements will be added to the body|
|data|any|Optional. Specify data that will be available on the active modal context.|
:::

:::
##### ModalService Properties
| Function | Description |
| - | - |
|open(content: Type | TemplateRef, options: ModalOptions)|Opens a modal and returns an `HcModal`|
:::

:::
##### HCModal Properties
| Name | Type | Description |
| - | - | - |
|componentRef|ComponentRef<T>|Allows direct access to the component used to create the modal. Null when `TemplateRef` is used|
|result|BehaviorSubject<any>|Subscribe to result in order to get access to modal result values passed in `ActiveModal.close()`|
|window|ComponentRef<T>|Allows direct access to window component which holds the component/template|
|overlay|ComponentRef<T>|Allows direct access to overlay component which holds the component/template|
|data|any|Data that was passed in through `ModalOptions`|
:::

:::
##### ActiveModal Properties
| Name | Description |
| - | - |
|close(result?: any)|When opening a modal using a component, `ActiveModal` must be injected in order to get access to the close method|
|dismiss()|When opening a modal using a component, `ActiveModal` must be injected in order to get access to the dismiss method|
|data|Data that was passed in through `ModalOptions`|
:::
