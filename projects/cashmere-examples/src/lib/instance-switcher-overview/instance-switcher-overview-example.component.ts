import {Component} from '@angular/core';
import { IInstance, IInstanceSwitcherTooltipText } from '@healthcatalyst/cashmere';

/**
 * @title Instance Switcher Overview
 */
@Component({
    selector: 'hc-instance-switcher-overview-example',
    templateUrl: 'instance-switcher-overview-example.component.html'
})
export class InstanceSwitcherOverviewExampleComponent {
    instances: IInstance[] = [
        {
            instanceKey: 'instance1',
            displayText: 'Instance 1'
        },
        {
            instanceKey: 'instance2',
            displayText: 'Instance 2'
        }
    ];

    tooltipText: IInstanceSwitcherTooltipText = {
        addText: 'Add an instance',
        instanceText: 'This is an instance!',
        closeText: 'Close the Instance Switcher'
    };

    private _currentNumber = 3;

    private _previousSelected: string[] = [];

    selectedKey: string | null = 'instance1';

    closable = true;
    isOpen = true;

    toggleClosable(): void {
        this.closable = !this.closable;
    }

    toggleOpen(): void {
        this.isOpen = !this.isOpen;
    }

    toggleTooltips(): void {
        if (this.tooltipText.addText) {
            this.tooltipText = {};
        } else {
            this.tooltipText = {
                addText: 'Add an instance',
                instanceText: 'This is an instance!',
                closeText: 'Close the Instance Switcher'
            };
        }
    }

    onSelected(key: string): void {
        if (this.selectedKey) {
            this._previousSelected.push(this.selectedKey);
        }

        this.selectedKey = key;
    }

    onAdded(): void {
        const nextNumber = this._currentNumber++;
        this.instances = [
            ...this.instances,
            {
                instanceKey: `instance${nextNumber}`,
                displayText: `Instance ${nextNumber}`
            }
        ];
    }

    onClosed(key: string): void {
        this.instances = this.instances.filter(instance => instance.instanceKey !== key);
        this._previousSelected = this._previousSelected.filter(previousKey => previousKey !== key);
        if (this.selectedKey === key) {
            if (this._previousSelected.length > 0) {
                this.selectedKey = this._previousSelected.pop() ?? null;
            } else if (this.instances.length > 0) {
                this.selectedKey = this.instances[0].instanceKey;
            }
            else {
                this.selectedKey = null;
            }
        }
    }
}
