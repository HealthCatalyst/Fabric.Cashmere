import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {Drawer} from './drawer.component';
import {DrawerContainer} from './drawer-container.component';
import {DrawerModule} from './drawer.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {Component, ViewChild} from '@angular/core';

@Component({
    template: `
        <hc-drawer-container #d>
            <hc-drawer align="left" #leftDrawer></hc-drawer>
            <hc-drawer align="right" #rightDrawer></hc-drawer>
        </hc-drawer-container>
    `
})
export class TestDrawerContainer {
    @ViewChild('d', {static: false})
    drawerContainer: DrawerContainer;
    @ViewChild('leftDrawer', {static: false})
    leftDrawer: Drawer;
    @ViewChild('rightDrawer', {static: false})
    rightDrawer: Drawer;
}

@Component({
    template: `
        <hc-drawer-container #d>
            <hc-drawer *ngFor="let drawer of drawers"></hc-drawer>
        </hc-drawer-container>
    `
})
export class InvalidDrawerContainer {
    @ViewChild('d', {static: false})
    drawerContainer: DrawerContainer;

    drawers = ["one"];
}

describe('DrawerContainer', () => {
    let component: TestDrawerContainer;
    let fixture: ComponentFixture<TestDrawerContainer>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TestDrawerContainer, InvalidDrawerContainer],
            imports: [DrawerModule, NoopAnimationsModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestDrawerContainer);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should open all included drawers when open is called', async () => {
        expect( component.leftDrawer.opened ).toBe(false);
        expect( component.rightDrawer.opened ).toBe(false);

        component.drawerContainer.open();
        fixture.detectChanges();

        await fixture.whenStable();
        expect( component.leftDrawer.opened ).toBe(true);
        expect( component.rightDrawer.opened ).toBe(true);
    });

    it('should close all included drawers when closed is called', async () => {
        component.leftDrawer.toggleOpen();
        component.rightDrawer.toggleOpen();
        fixture.detectChanges();

        await fixture.whenStable();
        expect( component.leftDrawer.opened ).toBe(true);
        expect( component.rightDrawer.opened ).toBe(true);

        component.drawerContainer.close();
        fixture.detectChanges();

        await fixture.whenStable();
        expect( component.leftDrawer.opened ).toBe(false);
        expect( component.rightDrawer.opened ).toBe(false);
    });

    it('should throw an error if multiple drawers are assigned to the same side', () => {
        let invalidFixture = TestBed.createComponent(InvalidDrawerContainer);
        invalidFixture.detectChanges();

        invalidFixture.componentInstance.drawers.push("two");
        expect( () => invalidFixture.componentInstance.drawerContainer._validateDrawers() ).toThrowError(/A drawer was already declared for .*/);
    });
});
