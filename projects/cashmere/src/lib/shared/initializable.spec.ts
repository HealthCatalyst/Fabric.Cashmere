import {Initializable} from './initializable';
import {Observable, Subscriber} from 'rxjs';

class MockInitializable extends Initializable {}

let testInitializable: Initializable;
describe('Initializable', () => {
    beforeEach(() => {
        testInitializable = new MockInitializable();
    });
    describe('when first created', () => {
        it('should not be initialized', () => {
            expect(testInitializable._isInitialized).toBe(false);
        });
        it('should not have subscribers', () => {
            const pendingSubscribers = testInitializable._pendingSubscribers;
            expect(pendingSubscribers?.length).toBe(0);
        });
        it('should have created an Observable', () => {
            const initialized = testInitializable.initialized;
            expect(initialized instanceof Observable).toBe(true);
        });
    });
    describe('when _markInitialized is called and it is already initialized', () => {
        it('should throw an error', () => {
            testInitializable._isInitialized = true;
            const wrap = () => testInitializable._markInitialized();
            expect(wrap).toThrowError('This directive has already been marked as initialized and should not be called twice.');
        });
    });
    describe('when _markInitialized is called and it is not already initialized', () => {
        it('should set initalized to true and pendingSubscribers to null', () => {
            testInitializable._markInitialized();
            expect(testInitializable._isInitialized).toBe(true);
            expect(testInitializable._pendingSubscribers).toBeNull();
        });
    });
    describe('when _markInitialized is called and it is not already initialized and there are subscribers', () => {
        it('should set initalized to true and pendingSubscribers to null', () => {
            spyOn(testInitializable, '_notifySubscriber');
            const subscriber1 = new Subscriber();
            testInitializable._pendingSubscribers?.push(subscriber1);
            testInitializable._markInitialized();
            expect(testInitializable._isInitialized).toBe(true);
            expect(testInitializable._pendingSubscribers).toBeNull();
            expect(testInitializable._notifySubscriber).toHaveBeenCalledTimes(1);
        });
    });
});
