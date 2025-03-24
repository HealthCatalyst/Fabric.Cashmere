import {TestBed, waitForAsync} from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import {AppSwitcherService} from './app-switcher.service';
import {APP_SWITCHER_CONFIG} from './app-switcher-interfaces';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('AppSwitcherService', () => {
    describe('when initialized with a discoveryServiceUri ending in a version', () => {
        let service: AppSwitcherService;

        beforeEach(waitForAsync(() => {
            TestBed.configureTestingModule({
    imports: [],
    providers: [AppSwitcherService, { provide: APP_SWITCHER_CONFIG, useValue: { discoveryServiceUri: 'foo://bar/baz/v1' } }, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
        }));

        beforeEach(() => (service = TestBed.inject(AppSwitcherService)));

        it('should have the correct allApplicationsUri', () => {
            expect(service.allApplicationsUri).toBe('foo://bar/baz/apps');
        });
    });

    describe('when initialized with a discoveryServiceUri ending in a version and a slash', () => {
        let service: AppSwitcherService;

        beforeEach(waitForAsync(() => {
            TestBed.configureTestingModule({
    imports: [],
    providers: [AppSwitcherService, { provide: APP_SWITCHER_CONFIG, useValue: { discoveryServiceUri: 'foo://bar/baz/v1/' } }, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
        }));

        beforeEach(() => (service = TestBed.inject(AppSwitcherService)));

        it('should have the correct allApplicationsUri', () => {
            expect(service.allApplicationsUri).toBe('foo://bar/baz/apps');
        });
    });

    describe('when initialized with a discoveryServiceUri not ending in a version', () => {
        let service: AppSwitcherService;

        beforeEach(waitForAsync(() => {
            TestBed.configureTestingModule({
    imports: [],
    providers: [AppSwitcherService, { provide: APP_SWITCHER_CONFIG, useValue: { discoveryServiceUri: 'foo://bar/baz/' } }, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
        }));

        beforeEach(() => (service = TestBed.inject(AppSwitcherService)));

        it('should have the correct allApplicationsUri', () => {
            expect(service.allApplicationsUri).toBe('foo://bar/baz/apps');
        });
    });

    describe('when initialized with a discoveryServiceUri not ending in a slash', () => {
        let service: AppSwitcherService;

        beforeEach(waitForAsync(() => {
            TestBed.configureTestingModule({
    imports: [],
    providers: [AppSwitcherService, { provide: APP_SWITCHER_CONFIG, useValue: { discoveryServiceUri: 'foo://bar/baz' } }, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
        }));

        beforeEach(() => (service = TestBed.inject(AppSwitcherService)));

        it('should have the correct allApplicationsUri', () => {
            expect(service.allApplicationsUri).toBe('foo://bar/baz/apps');
        });
    });

    describe('when not provided an APP_SWITCHER_CONFIG', () => {
        beforeEach(waitForAsync(() => {
            TestBed.configureTestingModule({
    imports: [],
    providers: [AppSwitcherService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
        }));
        it('should throw an error', () => {
            expect(() => TestBed.inject(AppSwitcherService)).toThrowError();
        });
    });

    describe('when provided an APP_SWITCHER_CONFIG without a discoveryServiceUri', () => {
        beforeEach(waitForAsync(() => {
            TestBed.configureTestingModule({
    imports: [],
    providers: [AppSwitcherService, { provide: APP_SWITCHER_CONFIG, useValue: {} }, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
        }));
        it('should throw an error', () => {
            expect(() => TestBed.inject(AppSwitcherService)).toThrowError();
        });
    });
});
