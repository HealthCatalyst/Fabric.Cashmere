import { Subscriber, Observable } from 'rxjs';

/** Abstract class for common initialization functionality */
export abstract class Initailizable {
    /** Whether this directive has been marked as initialized. */
    _isInitialized = false;

    /**
     * List of subscribers that subscribed before the directive was initialized. Should be notified
     * during _markInitialized. Set to null after pending subscribers are notified, and should
     * not expect to be populated after.
     */
    _pendingSubscribers: Subscriber<never>[] | null = [];

    /**
     * Observable stream that emits when the directive initializes. If already initialized, the
     * subscriber is stored to be notified once _markInitialized is called.
     * @docs-private
     */
    initialized = new Observable<never>(subscriber => {
        // If initialized, immediately notify the subscriber. Otherwise store the subscriber to notify
        // when _markInitialized is called.
        if (this._isInitialized) {
            this._notifySubscriber(subscriber);
        } else {
            this._pendingSubscribers!.push(subscriber);
        }
    });

    /**
     * Marks the state as initialized and notifies pending subscribers. Should be called at the end
     * of ngOnInit.
     * @docs-private
     */
    _markInitialized(): void {
        if (this._isInitialized) {
            throw Error('This directive has already been marked as initialized and should not be called twice.');
        }

        this._isInitialized = true;

        this._pendingSubscribers!.forEach(this._notifySubscriber);
        this._pendingSubscribers = null;
    }

    /** Emits and completes the subscriber stream (should only emit once). */
    _notifySubscriber(subscriber: Subscriber<never>): void {
        subscriber.next();
        subscriber.complete();
    }
}
