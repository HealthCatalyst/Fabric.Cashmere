import {TestBed, waitForAsync} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {EnvironmentSwitcherService} from './env-switcher.service';
import {ENV_SWITCHER_CONFIG} from './env-switcher-interfaces';

describe('EnvironmentSwitcherService', () => {
    describe('when initialized with a metadataServiceUri ending in a version', () => {
        let service: EnvironmentSwitcherService;

        beforeEach(waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule],
                providers: [EnvironmentSwitcherService, {provide: ENV_SWITCHER_CONFIG, useValue: {metadataServiceUri: 'foo://bar/baz/v1'}}]
            });
        }));

        beforeEach(() => (service = TestBed.inject(EnvironmentSwitcherService)));

        it('should normalize the uri with no version number or trailing slash', () => {
            expect(service.metadataServiceUri).toBe('foo://bar/baz');
        });
    });

    describe('when initialized with a metadataServiceUri ending in a version and a slash', () => {
        let service: EnvironmentSwitcherService;

        beforeEach(waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule],
                providers: [EnvironmentSwitcherService, {provide: ENV_SWITCHER_CONFIG, useValue: {metadataServiceUri: 'foo://bar/baz/v1/'}}]
            });
        }));

        beforeEach(() => (service = TestBed.inject(EnvironmentSwitcherService)));

        it('should normalize the uri with no version number or trailing slash', () => {
            expect(service.metadataServiceUri).toBe('foo://bar/baz');
        });
    });

    describe('when initialized with a metadataServiceUri not ending in a version', () => {
        let service: EnvironmentSwitcherService;

        beforeEach(waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule],
                providers: [EnvironmentSwitcherService, {provide: ENV_SWITCHER_CONFIG, useValue: {metadataServiceUri: 'foo://bar/baz/'}}]
            });
        }));

        beforeEach(() => (service = TestBed.inject(EnvironmentSwitcherService)));

        it('should remove trailing slash', () => {
            expect(service.metadataServiceUri).toBe('foo://bar/baz');
        });
    });

    describe('when initialized with a metadataServiceUri not ending in a slash', () => {
        let service: EnvironmentSwitcherService;

        beforeEach(waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule],
                providers: [EnvironmentSwitcherService, {provide: ENV_SWITCHER_CONFIG, useValue: {metadataServiceUri: 'foo://bar/baz'}}]
            });
        }));

        beforeEach(() => (service = TestBed.inject(EnvironmentSwitcherService)));

        it('should leave uri as is', () => {
            expect(service.metadataServiceUri).toBe('foo://bar/baz');
        });
    });

    describe('when not provided an ENV_SWITCHER_CONFIG', () => {
        beforeEach(waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule],
                providers: [EnvironmentSwitcherService]
            });
        }));
        it('should throw an error', () => {
            expect(() => TestBed.inject(EnvironmentSwitcherService)).toThrowError();
        });
    });

    describe('when provided an ENV_SWITCHER_CONFIG without a metadataServiceUri', () => {
        beforeEach(waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule],
                providers: [EnvironmentSwitcherService, {provide: ENV_SWITCHER_CONFIG, useValue: {}}]
            });
        }));
        it('should throw an error', () => {
            expect(() => TestBed.inject(EnvironmentSwitcherService)).toThrowError();
        });
    });
});
