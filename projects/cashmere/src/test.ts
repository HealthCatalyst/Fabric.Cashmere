// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'core-js/es/reflect';
import 'zone.js';
import 'zone.js/testing';
import {ComponentFixture, getTestBed} from '@angular/core/testing';
import {BrowserDynamicTestingModule, platformBrowserDynamicTesting} from '@angular/platform-browser-dynamic/testing';

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting(), {
    teardown: { destroyAfterEach: false }
});

// Angular 21 no longer auto-marks views dirty when test code mutates the
// component instance directly (e.g. `component.foo = 'bar'`); a subsequent
// `fixture.detectChanges()` then runs against a "clean" view and the
// post-CD check-no-changes pass observes a binding diff, throwing NG0100.
// Mark the root view for check before every detectChanges so tests that
// follow the v20-era pattern of "assign property, call detectChanges"
// continue to work without rewriting hundreds of specs.
const originalDetectChanges = ComponentFixture.prototype.detectChanges;
ComponentFixture.prototype.detectChanges = function (checkNoChanges?: boolean) {
    this.changeDetectorRef.markForCheck();
    return originalDetectChanges.call(this, checkNoChanges);
};
