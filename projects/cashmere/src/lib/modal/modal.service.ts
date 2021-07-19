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
import {ModalOptions} from './modal-options';
import {ActiveModal} from './active-modal';

export type ModalContentType = Type<unknown> | TemplateRef<unknown>;

@Injectable()
export class ModalService {
    /** Defaults to false. Restricts multiple modals from being opened on top of each other
     * (an error will be thrown if attempted). It's generally considered bad practice to open multiple
     * models at once, so only change this with good reason.
     */
    allowMultiple = false;

    // start at 2000 (reserved range for modals, see _variables.scss)
    private _zIndexBase = 2000;
    private _zIndexCounter = this._zIndexBase;
    private _renderer: Renderer2;
    private _modalsOpen = 0;

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
        if (!this.allowMultiple && this._modalsOpen !== 0) {
            throw new Error(`Multiple modals may not be opened at the same time
                when the allowMultiple property on ModalService is set to false.`);
        }

        let container = document.querySelector('body') as HTMLElement;

        const defaultOptions = {
            container,
            data: {},
            ignoreEscapeKey: false,
            size: 'auto',
            ignoreOverlayClick: false,
            isDraggable: false,
            isResizable: false,
            disableFullScreen: false
        };
        const options = {...defaultOptions, ...modalOptions};
        if (options.container) {
            container = options.container;
        }

        if (!container) {
            throw new Error('Modal requires that a container be set in the modal options');
        }

        // TODO: HcModal and ActiveModal essentially are the same object with HcModal having refs. Might as well merge them to simplify
        const modal = new HcModal<T>();
        const activeModalRef = new ActiveModal();
        modal.data = options.data;
        activeModalRef.data = options.data;

        const modalInjector = Injector.create({
            providers: [{provide: ActiveModal, useValue: activeModalRef}],
            parent: this._injector
        });

        // disable scrolling when overlay is present
        this._renderer.addClass(container, 'hc-modal-open');
        modal._removeOpenClass = () => this._renderer.removeClass(container, 'hc-modal-open');

        // if multiple modals are allowed, make sure the newest is always on top
        if ( this.allowMultiple ) {
            this._zIndexCounter = this._zIndexBase + (this._modalsOpen * 2);
        }

        // Create, attach, and append overlay to container
        const overlay = this._componentFactory.resolveComponentFactory(ModalOverlayComponent).create(modalInjector);
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
        const window = this._componentFactory.resolveComponentFactory(ModalWindowComponent).create(modalInjector, projectableNodes);
        this._renderer.setStyle(window.location.nativeElement, 'z-index', this._zIndexCounter + 1);
        window.instance._ignoreOverlayClick = options.ignoreOverlayClick;
        window.instance._isDraggable = options.isDraggable;
        window.instance._disableFullScreen = options.disableFullScreen;

        // Gives the child hc-modal component a new class of 'hc-modal-resizable' when the isResizable property is set to true
        const hcmodal = (window.location.nativeElement as HTMLElement).getElementsByTagName('hc-modal');
        hcmodal[0].setAttribute('class', options.isResizable ? `hc-modal-resizable hc-modal-${options.size}` : `hc-modal-${options.size}`);

        this._applicationRef.attachView(window.hostView);
        container.appendChild(window.location.nativeElement);
        modal.window = window;

        activeModalRef.close = (result: unknown) => {
            modal.close(result);
        };

        activeModalRef.dismiss = () => modal.dismiss();

        this._modalsOpen++;
        modal._modalClose.subscribe(() => {
            this._modalsOpen--;
            modal._modalClose.unsubscribe();
        });

        return modal;
    }
}
