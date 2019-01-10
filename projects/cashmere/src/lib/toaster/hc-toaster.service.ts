import {Injectable, ComponentRef, Injector, TemplateRef, ApplicationRef} from '@angular/core';
import {Overlay, OverlayConfig, OverlayRef, PositionStrategy} from '@angular/cdk/overlay';
import {ComponentPortal, PortalInjector} from '@angular/cdk/portal';
import {HcToastComponent} from './hc-toast.component';
import {HcToastOptions} from './hc-toast-options';
import {HcToastRef} from './hc-toast-ref';
import {filter, take} from 'rxjs/operators';

/** Toasts provide users with instant feedback on actions they've taken. For more general information,
 * use a `hc-banner`. */
@Injectable()
export class HcToasterService {
    _toasts: HcToastRef[] = [];

    // Inject overlay service
    constructor(private injector: Injector, private _overlay: Overlay, private _applicationRef: ApplicationRef) {}

    /** Displays a new toaster message with the settings included in `toastOptions`. `toastContent` can be used to
     * create entirely custom toasts, but only if the type is set to `custom`. Be sure to set `border-radius: 5px`
     * in the style of your custom content template so it matches the toast container. */
    addToast(toastOptions?: HcToastOptions, toastContent?: TemplateRef<any>): HcToastRef {
        const defaultOptions: HcToastOptions = {
            type: 'success',
            position: 'bottom-right',
            timeout: 5000,
            clickDismiss: false
        };
        const options = {...defaultOptions, ...toastOptions};

        // Returns an OverlayRef (which is a PortalHost)
        const _overlayRef = this._createOverlay(options);

        // Instantiate remote control
        const _toastRef = new HcToastRef(_overlayRef);

        const overlayComponent = this._attachToastContainer(_overlayRef, _toastRef);

        _toastRef._componentInstance = overlayComponent;

        if (options.type === 'custom' && toastContent) {
            _toastRef._componentInstance._toastContent = toastContent;
        }

        // Listen for click events to close the toast if the option is set
        if (options.clickDismiss) {
            _toastRef._componentInstance._canDismiss = options.clickDismiss;
            _toastRef._componentInstance._closeClick.subscribe(() => {
                this._removeToastPointer(_toastRef);
                _toastRef.close();
                if (options.toastClosed) {
                    options.toastClosed();
                }
                _toastRef._componentInstance._animationStateChanged
                    .pipe(
                        filter(event => event.phaseName === 'done' && event.toState === 'leave'),
                        take(1)
                    )
                    .subscribe(() => {
                        this._updateToastPositions();
                    });
                _toastRef._componentInstance._closeClick.unsubscribe();
            });
        }

        // Set the class for the type set in options
        if (options.type) {
            if (
                options.type === 'success' ||
                options.type === 'info' ||
                options.type === 'warning' ||
                options.type === 'alert' ||
                options.type === 'custom'
            ) {
                _toastRef._componentInstance._styleType = options.type;
            } else {
                throw Error('Unsupported toaster type: ' + options.type);
            }
        }

        // Set the header text
        if (options.header) {
            _toastRef._componentInstance._headerText = options.header;
        }

        // Set the body text
        if (options.body) {
            _toastRef._componentInstance._bodyText = options.body;
        }

        // Store the positioning of the toast
        _toastRef._toastPosition = String(options.position);

        // Set the timeout interval to close the toast if non-zero
        if (options.timeout !== 0) {
            setTimeout(() => {
                if (_toastRef._componentInstance) {
                    this._removeToastPointer(_toastRef);
                    _toastRef.close();
                    if (options.toastClosed) {
                        options.toastClosed();
                    }
                    _toastRef._componentInstance._animationStateChanged
                        .pipe(
                            filter(event => event.phaseName === 'done' && event.toState === 'leave'),
                            take(1)
                        )
                        .subscribe(() => {
                            this._updateToastPositions();
                        });
                }
            }, options.timeout);
        }

        this._toasts.push(_toastRef);
        return _toastRef;
    }

    /** Closes the most recent toast displayed */
    closeLastToast() {
        if (this._toasts.length > 0) {
            const element = this._toasts.pop();
            if (element) {
                element.close();
            }
        }
    }

    /** Closes currently visible toasts */
    closeAllToasts() {
        let len = this._toasts.length;
        for (let index = 0; index < len; index++) {
            const element = this._toasts.pop();
            if (element) {
                element.close();
            }
        }
    }

    private _createOverlay(config: HcToastOptions) {
        const overlayConfig = this._getOverlayConfig(config);
        return this._overlay.create(overlayConfig);
    }

    private _attachToastContainer(overlayRef: OverlayRef, toastRef: HcToastRef) {
        const injector = this._createInjector(toastRef);

        const containerPortal = new ComponentPortal(HcToastComponent, null, injector);
        const containerRef: ComponentRef<HcToastComponent> = overlayRef.attach(containerPortal);

        return containerRef.instance;
    }

    private _createInjector(toastRef: HcToastRef): PortalInjector {
        const injectionTokens = new WeakMap();

        injectionTokens.set(HcToastRef, toastRef);

        return new PortalInjector(this.injector, injectionTokens);
    }

    private _getOverlayConfig(config: HcToastOptions): OverlayConfig {
        let overlayConfig;
        let positionStrategy = this._getPositionStrategy(String(config.position), this._toasts.length);

        if (config.position === 'top-full-width' || config.position === 'bottom-full-width') {
            overlayConfig = new OverlayConfig({positionStrategy, width: '96%', panelClass: 'toast-overlay-clicks'});
        } else {
            overlayConfig = new OverlayConfig({positionStrategy, panelClass: 'toast-overlay-clicks'});
        }

        return overlayConfig;
    }

    private _getPositionStrategy(position: string, index: number): PositionStrategy {
        let positionStrategy: PositionStrategy;
        let toastIndex: number = this._getLastToast(position, index);

        switch (position) {
            case 'top-right':
                if (toastIndex !== -1) {
                    positionStrategy = this._overlay
                        .position()
                        .flexibleConnectedTo(this._toasts[toastIndex]._componentInstance._el.nativeElement.children[0])
                        .withPositions([
                            {
                                overlayX: 'end',
                                overlayY: 'top',
                                originX: 'end',
                                originY: 'bottom'
                            }
                        ]);
                } else {
                    positionStrategy = this._overlay
                        .position()
                        .global()
                        .right('10px');
                }
                break;
            case 'top-center':
                if (toastIndex !== -1) {
                    positionStrategy = this._overlay
                        .position()
                        .flexibleConnectedTo(this._toasts[toastIndex]._componentInstance._el.nativeElement.children[0])
                        .withPositions([
                            {
                                overlayX: 'center',
                                overlayY: 'top',
                                originX: 'center',
                                originY: 'bottom'
                            }
                        ]);
                } else {
                    positionStrategy = this._overlay
                        .position()
                        .global()
                        .centerHorizontally();
                }
                break;
            case 'top-left':
                if (toastIndex !== -1) {
                    positionStrategy = this._overlay
                        .position()
                        .flexibleConnectedTo(this._toasts[toastIndex]._componentInstance._el.nativeElement.children[0])
                        .withPositions([
                            {
                                overlayX: 'start',
                                overlayY: 'top',
                                originX: 'start',
                                originY: 'bottom'
                            }
                        ]);
                } else {
                    positionStrategy = this._overlay
                        .position()
                        .global()
                        .left('10px');
                }
                break;
            case 'top-full-width':
                if (toastIndex !== -1) {
                    positionStrategy = this._overlay
                        .position()
                        .flexibleConnectedTo(this._toasts[toastIndex]._componentInstance._el.nativeElement.children[0])
                        .withFlexibleDimensions(false)
                        .withPositions([
                            {
                                overlayX: 'center',
                                overlayY: 'top',
                                originX: 'center',
                                originY: 'bottom'
                            }
                        ]);
                } else {
                    positionStrategy = this._overlay
                        .position()
                        .global()
                        .centerHorizontally();
                }
                break;
            case 'bottom-right':
                if (toastIndex !== -1) {
                    positionStrategy = this._overlay
                        .position()
                        .flexibleConnectedTo(this._toasts[toastIndex]._componentInstance._el.nativeElement.children[0])
                        .withPositions([
                            {
                                overlayX: 'end',
                                overlayY: 'bottom',
                                originX: 'end',
                                originY: 'top'
                            }
                        ]);
                } else {
                    positionStrategy = this._overlay
                        .position()
                        .global()
                        .bottom()
                        .right('10px');
                }
                break;
            case 'bottom-center':
                if (toastIndex !== -1) {
                    positionStrategy = this._overlay
                        .position()
                        .flexibleConnectedTo(this._toasts[toastIndex]._componentInstance._el.nativeElement.children[0])
                        .withPositions([
                            {
                                overlayX: 'center',
                                overlayY: 'bottom',
                                originX: 'center',
                                originY: 'top'
                            }
                        ]);
                } else {
                    positionStrategy = this._overlay
                        .position()
                        .global()
                        .bottom()
                        .centerHorizontally();
                }
                break;
            case 'bottom-left':
                if (toastIndex !== -1) {
                    positionStrategy = this._overlay
                        .position()
                        .flexibleConnectedTo(this._toasts[toastIndex]._componentInstance._el.nativeElement.children[0])
                        .withPositions([
                            {
                                overlayX: 'start',
                                overlayY: 'bottom',
                                originX: 'start',
                                originY: 'top'
                            }
                        ]);
                } else {
                    positionStrategy = this._overlay
                        .position()
                        .global()
                        .bottom()
                        .left('10px');
                }
                break;
            case 'bottom-full-width':
                if (toastIndex !== -1) {
                    positionStrategy = this._overlay
                        .position()
                        .flexibleConnectedTo(this._toasts[toastIndex]._componentInstance._el.nativeElement.children[0])
                        .withFlexibleDimensions(false)
                        .withPositions([
                            {
                                overlayX: 'center',
                                overlayY: 'bottom',
                                originX: 'center',
                                originY: 'top'
                            }
                        ]);
                } else {
                    positionStrategy = this._overlay
                        .position()
                        .global()
                        .bottom()
                        .centerHorizontally();
                }
                break;
            default:
                throw Error('Unsupported toaster message position: ' + position);
        }

        return positionStrategy;
    }

    // Removes the toast that was closed from the storage array
    private _removeToastPointer(toastRef: HcToastRef) {
        for (let index = 0; index < this._toasts.length; index++) {
            if (this._toasts[index] === toastRef) {
                this._toasts.splice(index, 1);
            }
        }
    }

    // Returns one toast back from the index provided in the position provided
    private _getLastToast(toastPos: string, startIndex: number): number {
        let toastIndex: number = -1;

        for (let index = startIndex - 1; index >= 0; index--) {
            if (this._toasts[index]._toastPosition === toastPos) {
                toastIndex = index;
                break;
            }
        }
        return toastIndex;
    }

    // Updates the position strategy for what toasts are connected after one is closed
    private _updateToastPositions() {
        for (let index = 0; index < this._toasts.length; index++) {
            this._toasts[index]._overlayRef.updatePositionStrategy(this._getPositionStrategy(this._toasts[index]._toastPosition, index));
        }
    }
}
