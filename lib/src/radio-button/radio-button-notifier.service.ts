import { Injectable, OnDestroy } from '@angular/core';

type listener = (id: string, name: string) => {};

@Injectable()
export class RadioButtonNotifierService implements OnDestroy {
    private _listeners: listener[] = [];

    constructor() {
    }

    ngOnDestroy() {
        this._listeners = [];
    }

    notify(id: string, name: string) {
        this._listeners.forEach(subscribedListeners => subscribedListeners(id, name));
    }

    listen(activeListener): () => void {
        return () => {
            this._listeners = this._listeners.filter(registeredListener => activeListener !== registeredListener);
        }
    }
}
