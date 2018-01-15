import { PopoverDirective } from './popover.directive';
import { SimpleChange, ViewContainerRef } from '@angular/core';
import { PopoverContentComponent } from './popoverContent.component';

describe('PopoverDirective', () => {
  let directive: PopoverDirective;
  const mockPopoverComponent: PopoverContentComponent = new PopoverContentComponent(<any>undefined, <any>undefined, <any>undefined);
  const mockViewContainerRef: any = {
    createComponent : jasmine.createSpy('createComponent')
        .and.returnValue({
          'instance': mockPopoverComponent,
          'destroy': jasmine.createSpy('destroy')
      }),
    element : {nativeElement: ''}
  };

  const mockResolver: any = {
    resolveComponentFactory: jasmine.createSpy('resolveComponentFactory')
  };

  beforeEach(() => {
    directive = new PopoverDirective(mockViewContainerRef, mockResolver);
    directive.content = mockPopoverComponent;
  });

  describe('constructor', () => {
    it('should create an instance', () => {
      expect(directive).toBeTruthy();
    });
  });

  describe('showOrHideOnClick', () => {
    it('should call toggle', () => {
      const toggleSpy: jasmine.Spy = spyOn(directive, 'toggle');
      directive.showOrHideOnClick();

      expect(toggleSpy).toHaveBeenCalled();
    });

    it('should not call toggle when popoverOnHover', () => {
      const toggleSpy: jasmine.Spy = spyOn(directive, 'toggle');
      directive.popoverOnHover = true;
      directive.showOrHideOnClick();

      expect(toggleSpy).not.toHaveBeenCalled();
    });

    it('should not call toggle when popoverDisabled', () => {
      const toggleSpy: jasmine.Spy = spyOn(directive, 'toggle');
      directive.popoverDisabled = true;
      directive.showOrHideOnClick();

      expect(toggleSpy).not.toHaveBeenCalled();
    });
  });

  describe('showOnHover', () => {
    it('should call show', () => {
      const showSpy: jasmine.Spy = spyOn(directive, 'show');
      directive.popoverOnHover = true;
      directive.showOnHover();

      expect(showSpy).toHaveBeenCalled();
    });

    it('should not call show when popoverOnHover is false', () => {
      const showSpy: jasmine.Spy = spyOn(directive, 'show');
      directive.popoverOnHover = false;
      directive.showOnHover();

      expect(showSpy).not.toHaveBeenCalled();
    });

    it('should not call show when popoverDisabled', () => {
      const showSpy: jasmine.Spy = spyOn(directive, 'show');
      directive.popoverDisabled = true;
      directive.showOnHover();

      expect(showSpy).not.toHaveBeenCalled();
    });
  });

  describe('hideOnHover', () => {
    it('should call hide', () => {
      const hideSpy: jasmine.Spy = spyOn(directive, 'hide');
      directive.popoverOnHover = true;
      directive.hideOnHover();

      expect(hideSpy).toHaveBeenCalled();
    });

    it('should not call hide when popoverOnHover', () => {
      const hideSpy: jasmine.Spy = spyOn(directive, 'hide');
      directive.popoverOnHover = false;
      directive.hideOnHover();

      expect(hideSpy).not.toHaveBeenCalled();
    });

    it('should not call hide when popoverDisabled', () => {
      const hideSpy: jasmine.Spy = spyOn(directive, 'hide');
      directive.popoverDisabled = true;
      directive.hideOnHover();

      expect(hideSpy).not.toHaveBeenCalled();
    });

    it('should not call hide when popoverCloseOnMouseOutside', () => {
      const hideSpy: jasmine.Spy = spyOn(directive, 'hide');
      directive.popoverCloseOnMouseOutside = true;
      directive.hideOnHover();

      expect(hideSpy).not.toHaveBeenCalled();
    });
  });

  describe('ngOnChanges', () => {
    it('should call hide', () => {
      const hideSpy: jasmine.Spy = spyOn(directive, 'hide');
      directive.ngOnChanges({'popoverDisabled': new SimpleChange(true, true, true)});
      expect(hideSpy).toHaveBeenCalled();
    });
  });

  describe('toggle', () => {
    it('to hide and show', () => {
      const showSpy: jasmine.Spy = spyOn(directive, 'show').and.callThrough();
      const hideSpy: jasmine.Spy = spyOn(directive, 'hide').and.callThrough();
      directive.toggle();

      expect(showSpy).toHaveBeenCalled();

      directive.toggle();

      expect(hideSpy).toHaveBeenCalled();
    });

    it('to hide and show with string content', () => {
      const showSpy: jasmine.Spy = spyOn(directive, 'show').and.callThrough();
      const hideSpy: jasmine.Spy = spyOn(directive, 'hide').and.callThrough();
      directive.content = 'string content';
      directive.toggle();

      expect(showSpy).toHaveBeenCalled();

      directive.toggle();

      expect(hideSpy).toHaveBeenCalled();
    });
  });
});
