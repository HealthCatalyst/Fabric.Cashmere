import {ComponentFixture, TestBed, fakeAsync} from '@angular/core/testing';

import {EnvSwitcherComponent} from './env-switcher.component';
import {PopModule} from '../pop/popover.module';
import {PipesModule} from '../pipes/pipes.module';
import {ProgressIndicatorsModule} from '../progress-indicators';
import {CheckboxModule} from '../checkbox/checkbox.module';
import {ButtonModule} from '../button/button.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('EnvSwitcherComponent', () => {
    let component: EnvSwitcherComponent;
    let fixture: ComponentFixture<EnvSwitcherComponent>;

    beforeEach(
        fakeAsync(() => {
            TestBed.configureTestingModule({
                imports: [PopModule, PipesModule, ProgressIndicatorsModule, CheckboxModule, ButtonModule, NoopAnimationsModule],
                declarations: [EnvSwitcherComponent]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(EnvSwitcherComponent);
        component = fixture.componentInstance;
        component.environmentOptions = [
            {
                id: 1234,
                tenantCode: 'HCAT',
                name: 'Production',
                shortName: 'PROD',
                description: 'Live customer environment.',
                color: '#FFFFFF'
            },
            {
                id: 5678,
                tenantCode: 'HCAT',
                name: 'Development',
                shortName: 'DEV',
                description: 'Environment for building and testing new features.',
                color: '#E7C447'
            },
            {
                id: 9012,
                tenantCode: 'HCAT',
                name: 'Test',
                shortName: 'TEST',
                description: 'Environment for integration testing.',
                color: 'garbagio'
            }
        ];
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('openMenu', () => {
        it('if canSelectMultiple is true, should add selected env to staging model', () => {
            component.canSelectMultiple = true;
            component._activeEnvIds = component._environmentOptionVMs.map(e => e.id);
            component._stagedActiveEnvIds = [];
            component.openMenu();
            expect(component._stagedActiveEnvIds.length).toBe(3);
            expect(component._stagedActiveEnvIds[0]).toBe(component._environmentOptionVMs[0].id);
            expect(component._stagedActiveEnvIds[1]).toBe(component._environmentOptionVMs[1].id);
            expect(component._stagedActiveEnvIds[2]).toBe(component._environmentOptionVMs[2].id);
        });
        it('if canSelectMultiple is false, should empty the staging model', () => {
            component.canSelectMultiple = false;
            component._activeEnvIds = component._environmentOptionVMs.map(e => e.id);
            component._stagedActiveEnvIds = component._environmentOptionVMs.map(e => e.id);
            component.openMenu();
            expect(component._stagedActiveEnvIds.length).toBe(0);
        });
    });

    describe('_envClicked when canSelectMultiple is true', () => {
        it('should add selected env to staging model if not already selected', () => {
            component.canSelectMultiple = true;
            const env0 = component._environmentOptionVMs[0];
            const env1 = component._environmentOptionVMs[1];
            component.setActiveEnvironments([env0.id]);
            component._envClicked(env1);
            expect(component._stagedActiveEnvIds.length).toBe(2);
            expect(component._stagedActiveEnvIds[0]).toBe(env0.id);
            expect(component._stagedActiveEnvIds[1]).toBe(env1.id);
        });
        it('should remove selected env from staging model if already selected', () => {
            component.canSelectMultiple = true;
            const env0 = component._environmentOptionVMs[0];
            const env1 = component._environmentOptionVMs[1];
            component.setActiveEnvironments([env0.id, env1.id]);
            component._envClicked(env1);
            expect(component._stagedActiveEnvIds.length).toBe(1);
            expect(component._stagedActiveEnvIds[0]).toBe(env0.id);
        });
    });

    describe('_applyEnvs', () => {
        it('should move staging model over to active model', () => {
            component.canSelectMultiple = true;
            component._activeEnvIds = [];
            component._stagedActiveEnvIds = component._environmentOptionVMs.map(e => e.id);
            component._applyEnvs();
            expect(component._activeEnvIds.length).toBe(3);
        });

        it('updates badge text and color for a single environment', () => {
            component.canSelectMultiple = true;
            component._stagedActiveEnvIds = [1234];
            component._applyEnvs();
            const env = component._environmentOptionVMs[0];
            expect(component._badgeText).toBe(env.shortName);
            expect(component._badgeColor).toBe(env.badgeColorClass);
        });

        it('updates badge text and color for multiple environments', () => {
            component.canSelectMultiple = true;
            component._stagedActiveEnvIds = [1234, 5678];
            component._applyEnvs();
            expect(component._badgeText).toBe('2 Selected');
            expect(component._badgeColor).toBe('hc-badge-color-white');
        });

        it('updates badge text and color for all environments', () => {
            component.canSelectMultiple = true;
            component._stagedActiveEnvIds = [1234, 5678, 9012];
            component._applyEnvs();
            expect(component._badgeColor).toBe('hc-badge-color-white');
        });

        it('updates badge text and color for no environments', () => {
            component.canSelectMultiple = true;
            component._stagedActiveEnvIds = [];
            component._applyEnvs();
            expect(component._badgeColor).toBe('hc-badge-color-white');
        });
    });

    describe('_envClicked when canSelectMultiple is true', () => {
        it('should apply selected environment to active model, wiping out previous value', () => {
            const env0 = component._environmentOptionVMs[0];
            const env1 = component._environmentOptionVMs[1];
            component.canSelectMultiple = false;
            component._activeEnvIds = [env0.id];
            component._envClicked(env1);
            expect(component._activeEnvIds.length).toBe(1);
            expect(component._activeEnvIds[0]).toBe(env1.id);
        });
    });

    describe('setActiveEnvironments', () => {
        it('should apply environment to active model, wiping out previous value', () => {
            component.canSelectMultiple = false;
            const env0 = component._environmentOptionVMs[0];
            const env1 = component._environmentOptionVMs[1];
            component._activeEnvIds = [env0.id];
            component.setActiveEnvironments([env1.id]);
            expect(component._activeEnvIds.length).toBe(1);
            expect(component._activeEnvIds[0]).toBe(env1.id);
        });
        it('if canSelectMultiple is true, should apply environment to active model and staging model', () => {
            component.canSelectMultiple = true;
            const env0 = component._environmentOptionVMs[0];
            const env1 = component._environmentOptionVMs[1];
            component._activeEnvIds = [env0.id];
            component.setActiveEnvironments([env1.id]);
            expect(component._activeEnvIds.length).toBe(1);
            expect(component._activeEnvIds[0]).toBe(env1.id);
            expect(component._stagedActiveEnvIds.length).toBe(1);
            expect(component._stagedActiveEnvIds[0]).toBe(env1.id);
        });
    });

    describe('_isEnvSelected if canSelectMultiple is true', () => {
        it('should return true if given environment is in staging model', () => {
            component.canSelectMultiple = true;
            component._activeEnvIds = [];
            component._stagedActiveEnvIds = [1234];
            expect(component._isEnvSelected(1234)).toBeTrue();
        });

        it('should return false if given environment is NOT in staging model', () => {
            component.canSelectMultiple = true;
            component._activeEnvIds = [];
            component._stagedActiveEnvIds = [];
            expect(component._isEnvSelected(1234)).toBeFalse();
        });

        it('should return false if given environment is NOT in staging model, even if in activeEnvIds', () => {
            component.canSelectMultiple = true;
            component._activeEnvIds = [1234];
            component._stagedActiveEnvIds = [];
            expect(component._isEnvSelected(1234)).toBeFalse();
        });
    });

    describe('_isEnvSelected if canSelectMultiple is false', () => {
        it('should return true if given environment is in model', () => {
            component.canSelectMultiple = false;
            component._activeEnvIds = [1234];
            expect(component._isEnvSelected(1234)).toBeTrue();
        });

        it('should return false if given environment is NOT in model', () => {
            component.canSelectMultiple = false;
            component._activeEnvIds = [];
            expect(component._isEnvSelected(1234)).toBeFalse();
        });
    });

    describe('_generateShortName', () => {
        it('generates initials for a name with multiple words', () => {
            expect(component._generateShortName('my test today 2')).toBe('MTT2');
        });
        it('generates initials for a name with one word', () => {
            expect(component._generateShortName('test')).toBe('TEST');
        });
        it('generates initials for an empty string', () => {
            expect(component._generateShortName('')).toBe('ENV');
        });
    });
});
