import {Component} from '@angular/core';
import {IUser} from '@wcf-insurance/cashmere';
import {CheckboxChangeEvent} from '@wcf-insurance/cashmere';

enum DEVICE_VIEW_MODE {
    LAPTOP = "LAPTOP",
    TABLET = 'TABLET',
    MOBILE = 'MOBILE',
    NONE = 'NONE'
}

@Component({
    selector: 'hc-sidenav-overview-example',
    templateUrl: 'sidenav-overview-example.component.html',
    styleUrls: ['sidenav-overview-example.component.scss']
})
export class SidenavOverviewExampleComponent {
    emulatorView: DEVICE_VIEW_MODE = DEVICE_VIEW_MODE.NONE;
    emulatorViewOptionMap = {
        [DEVICE_VIEW_MODE.LAPTOP]: {
            key: DEVICE_VIEW_MODE.LAPTOP,
            displayString: 'Laptop',
            class: 'laptop-emulator'
        },
        [DEVICE_VIEW_MODE.MOBILE]: {
            key: DEVICE_VIEW_MODE.MOBILE,
            displayString: 'Mobile',
            class: 'smartphone-emulator'
        },
        [DEVICE_VIEW_MODE.TABLET]: {
            key: DEVICE_VIEW_MODE.TABLET,
            displayString: 'Tablet',
            class: 'tablet-emulator'
        },
        [DEVICE_VIEW_MODE.NONE]: {
            key: DEVICE_VIEW_MODE.NONE,
            displayString: 'None',
            class: 'no-emulation'
        }
    };
    emulatorViewOptions = [
        this.emulatorViewOptionMap[DEVICE_VIEW_MODE.LAPTOP],
        this.emulatorViewOptionMap[DEVICE_VIEW_MODE.TABLET],
        this.emulatorViewOptionMap[DEVICE_VIEW_MODE.MOBILE],
        {...this.emulatorViewOptionMap[DEVICE_VIEW_MODE.NONE], checked: true}
    ];
    user: IUser = {
        name: 'John Doe',
        avatar: '/src/assets/avatar.jpg'
    };

    mobileViewChanged(event: CheckboxChangeEvent) {
        // this.mobileView = event.checked;
    }

    emulatorOptionChanged(event) {
        this.emulatorView = event.value;
    }

    get _emulatorViewClass() {
        return this.emulatorViewOptionMap[this.emulatorView].class;
    }

    get _mobileViewMode() {
        return this.emulatorView === DEVICE_VIEW_MODE.TABLET || this.emulatorView === DEVICE_VIEW_MODE.MOBILE;
    }
}
