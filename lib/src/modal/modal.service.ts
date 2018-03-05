import { ModalWindowComponent } from './modal-window.component';
import { ModalOverlayComponent } from './modal-overlay.component';
import { HcModal } from './modal';
import {
    Injectable,
    ComponentFactoryResolver,
    ComponentRef,
    Injector,
    TemplateRef,
    Type,
    ApplicationRef,
    ViewContainerRef,
    ReflectiveInjector,
    EmbeddedViewRef,
    ViewRef,
    Renderer2,
    RendererFactory2
} from '@angular/core';
import { ModalOptions } from './modal-options';
import { ActiveModal } from './active-modal';

export type ModalContentType = Type<{}> | TemplateRef<any>;

@Injectable()
export class ModalService {
    // start at 1040 because navbar is at 1030
    public zIndexCounter = 1040;
    private renderer: Renderer2;

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private injector: Injector,
        private applicationRef: ApplicationRef,
        rendererFactory: RendererFactory2
    ) {
        this.renderer = rendererFactory.createRenderer(null, null);
    }

    public open<T>(
        modalContent: ModalContentType,
        modalOptions?: ModalOptions,
    ): HcModal<T> {
        let container: HTMLElement | null = document.querySelector('body');
        if (modalOptions) {
            if (modalOptions.container) {
                container = modalOptions.container;
            }
        }

        let hcModal = new HcModal<T>();
        let activeModalContext = new ActiveModal();
        const modalContextInjector = ReflectiveInjector.resolveAndCreate(
            [{ provide: ActiveModal, useValue: activeModalContext }],
            this.injector
        );
        if (container) {
            // disable scrolling when overlay is present
            this.renderer.addClass(container, 'hc-modal-open');
            hcModal.removeOpenClass = () => this.renderer.removeClass(container, 'hc-modal-open');

            // Create, attach, and append overlay to container
            let overlay = this.componentFactoryResolver
                .resolveComponentFactory(ModalOverlayComponent)
                .create(modalContextInjector);
            this.renderer.setStyle(overlay.location.nativeElement, 'z-index', this.zIndexCounter);
            if (modalOptions) {
                overlay.instance.ignoreEscapeKey = modalOptions.ignoreEscapeKey || false;
            }
            this.applicationRef.attachView(overlay.hostView);
            container.appendChild(overlay.location.nativeElement);
            hcModal.overlay = overlay;

            // Create and attach content views; prepare nodes to be
            // transcluded with the window ComponentRef
            let projectableNodes;
            if (modalContent instanceof TemplateRef) {
                const embeddedViewRef = modalContent.createEmbeddedView(activeModalContext);
                this.applicationRef.attachView(embeddedViewRef);
                projectableNodes = [embeddedViewRef.rootNodes];
            } else {
                const componentRef = this.componentFactoryResolver
                    .resolveComponentFactory(modalContent)
                    .create(modalContextInjector);

                // Set host component style to 100% to allow collapsing of body but not header/footer
                this.renderer.addClass(componentRef.location.nativeElement, 'hc-modal-center-component');
                this.applicationRef.attachView(componentRef.hostView);
                hcModal.componentRef = <ComponentRef<T>>componentRef;
                projectableNodes = [[componentRef.location.nativeElement]];
            }

            // Create, attach, and append Window to container
            // Apply options
            let window = this.componentFactoryResolver
                .resolveComponentFactory(ModalWindowComponent)
                .create(modalContextInjector, projectableNodes);
            this.renderer.setStyle(window.location.nativeElement, 'z-index', this.zIndexCounter + 1);
            if (modalOptions) {
                window.instance.size = modalOptions.size;
                window.instance.ignoreOverlayClick = modalOptions.ignoreOverlayClick || false;
                if (modalOptions.data) {
                    hcModal.data = modalOptions.data;
                    activeModalContext.data = modalOptions.data;
                }
            }

            this.applicationRef.attachView(window.hostView);
            container.appendChild(window.location.nativeElement);
            hcModal.window = window;
        }
        activeModalContext.close = (result: any) => {
            hcModal.close(result);
        };

        activeModalContext.dismiss = () => hcModal.dismiss();

        this.zIndexCounter += 2;
        return hcModal;
    }
}
