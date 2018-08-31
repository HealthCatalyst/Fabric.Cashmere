import {ModalWindowComponent} from './modal-window.component';
import {ModalOverlayComponent} from './modal-overlay.component';
import {HcModal} from './modal';
import {
    ApplicationRef,
    ComponentFactoryResolver,
    ComponentRef,
    Injectable,
    Injector,
    Renderer2,
    RendererFactory2,
    TemplateRef,
    Type
} from '@angular/core';
import {ModalOptions, ModalSize} from './modal-options';
import {ActiveModal} from './active-modal';

export type ModalContentType = Type<{}> | TemplateRef<any>;

@Injectable()
export class ModalService {
    // start at 2000 (reserved range for modals, see _variables.scss)
    private _zIndexCounter = 2000;
    private _renderer: Renderer2;

    constructor(
        private _componentFactory: ComponentFactoryResolver,
        private _injector: Injector,
        private _applicationRef: ApplicationRef,
        _rendererFactory: RendererFactory2
    ) {
        this._renderer = _rendererFactory.createRenderer(null, null);
    }

    /** Opens a new modal either from a Component or a TemplateRef with the options specified in ModalOptions
     * In order to use a component, it must be specified in your module's EntryComponents.
     */
    open<T>(modalContent: ModalContentType, modalOptions?: ModalOptions): HcModal<T> {
        let container = document.querySelector('body') as HTMLElement;

        const defaultOptions = {
            container,
            data: {},
            ignoreEscapeKey: false,
            size: 'md',
            ignoreOverlayClick: false
        };
        const options = {...defaultOptions, ...modalOptions};
        if (options.container) {
            container = options.container;
        }

        if (!container) {
            throw new Error('Modal requires that a container be set in the modal options');
        }

        // TODO: HcModal and ActiveModal essentially are the same object with HcModal having refs. Might as well merge them to simplify
        let modal = new HcModal<T>();
        let activeModalRef = new ActiveModal();
        modal.data = options.data;
        activeModalRef.data = options.data;

        const modalInjector = Injector.create({
            providers: [{provide: ActiveModal, useValue: activeModalRef}],
            parent: this._injector
        });

        // disable scrolling when overlay is present
        this._renderer.addClass(container, 'hc-modal-open');
        modal._removeOpenClass = () => this._renderer.removeClass(container, 'hc-modal-open');

        // Create, attach, and append overlay to container
        let overlay = this._componentFactory.resolveComponentFactory(ModalOverlayComponent).create(modalInjector);
        this._renderer.setStyle(overlay.location.nativeElement, 'z-index', this._zIndexCounter);
        overlay.instance._ignoreEscapeKey = options.ignoreEscapeKey;

        this._applicationRef.attachView(overlay.hostView);
        container.appendChild(overlay.location.nativeElement);
        modal.overlay = overlay;

        // Create and attach content views; prepare nodes to be
        // transcluded with the window ComponentRef
        let projectableNodes;
        if (modalContent instanceof TemplateRef) {
            const embeddedViewRef = modalContent.createEmbeddedView(activeModalRef);
            this._applicationRef.attachView(embeddedViewRef);
            projectableNodes = [embeddedViewRef.rootNodes];
        } else {
            const componentRef = this._componentFactory.resolveComponentFactory(modalContent).create(modalInjector);

            // Set host component style to 100% to allow collapsing of body but not header/footer
            this._renderer.addClass(componentRef.location.nativeElement, 'hc-modal-center-component');
            this._applicationRef.attachView(componentRef.hostView);
            modal.componentRef = <ComponentRef<T>>componentRef;
            projectableNodes = [[componentRef.location.nativeElement]];
        }

        // Create, attach, and append Window to container
        // Apply options
        let window = this._componentFactory.resolveComponentFactory(ModalWindowComponent).create(modalInjector, projectableNodes);
        this._renderer.setStyle(window.location.nativeElement, 'z-index', this._zIndexCounter + 1);
        window.instance._size = options.size as ModalSize;
        window.instance._ignoreOverlayClick = options.ignoreOverlayClick;

        this._applicationRef.attachView(window.hostView);
        container.appendChild(window.location.nativeElement);
        modal.window = window;

        activeModalRef.close = (result: any) => {
            modal.close(result);
        };

        activeModalRef.dismiss = () => modal.dismiss();

        this._zIndexCounter += 2;
        return modal;
    }
}
