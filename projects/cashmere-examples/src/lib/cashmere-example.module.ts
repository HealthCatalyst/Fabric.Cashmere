
/* tslint:disable */
/** DO NOT MANUALLY EDIT THIS FILE, IT IS GENERATED VIA GULP 'build-examples-module' */
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {CashmereModule} from './cashmere.module';
import {AccordionOverviewExample} from './accordion-overview/accordion-overview-example';
import {BannerOverviewExample} from './banner-overview/banner-overview-example';
import {ButtonAnchorExample} from './button-anchor/button-anchor-example';
import {ButtonIconExample} from './button-icon/button-icon-example';
import {ButtonLinkExample} from './button-link/button-link-example';
import {ButtonSizeExample} from './button-size/button-size-example';
import {ButtonSplitExample} from './button-split/button-split-example';
import {ButtonTypeExample} from './button-type/button-type-example';
import {CheckboxDisabledExample} from './checkbox-disabled/checkbox-disabled-example';
import {CheckboxFormsExample} from './checkbox-forms/checkbox-forms-example';
import {CheckboxStandardExample} from './checkbox-standard/checkbox-standard-example';
import {ChipActionExample} from './chip-action/chip-action-example';
import {ChipBasicExample} from './chip-basic/chip-basic-example';
import {ChipRowExample} from './chip-row/chip-row-example';
import {ChipSinglerowExample} from './chip-singlerow/chip-singlerow-example';
import {DrawerBasicExample} from './drawer-basic/drawer-basic-example';
import {DrawerMenu} from './drawer-menu/drawer-menu-example';
import {DrawerOverlayExample} from './drawer-overlay/drawer-overlay-example';
import {DrawerSideExample} from './drawer-side/drawer-side-example';
import {FormFieldOverviewExample} from './form-field-overview/form-field-overview-example';
import {IconOverviewExample} from './icon-overview/icon-overview-example';
import {InputPrefixExample} from './input-prefix/input-prefix-example';
import {InputRequiredExample} from './input-required/input-required-example';
import {InputSuffixExample} from './input-suffix/input-suffix-example';
import {ListOverviewExample} from './list-overview/list-overview-example';
import {DialogOverviewExampleDialog,ModalOverviewExample} from './modal-overview/modal-overview-example';
import {NavbarAppSwitcherExample} from './navbar-app-switcher/navbar-app-switcher-example';
import {NavbarOverviewExample} from './navbar-overview/navbar-overview-example';
import {PaginationLoadMoreExample} from './pagination-load-more/pagination-load-more-example';
import {PaginationSimpleExample} from './pagination-simple/pagination-simple-example';
import {PaginationStandardExample} from './pagination-standard/pagination-standard-example';
import {PicklistSimpleExample} from './picklist-simple/picklist-simple-example';
import {PicklistValuesetExample} from './picklist-valueset/picklist-valueset-example';
import {PopoverDynamicExample} from './popover-dynamic/popover-dynamic-example';
import {PopoverOverviewExample} from './popover-overview/popover-overview-example';
import {PopoverPlacementExample} from './popover-placement/popover-placement-example';
import {ProgressDotsExample} from './progress-dots/progress-dots-example';
import {ProgressSpinnerExample} from './progress-spinner/progress-spinner-example';
import {RadioButtonDisabledExample} from './radio-button-disabled/radio-button-disabled-example';
import {RadioButtonFormsExample} from './radio-button-forms/radio-button-forms-example';
import {RadioButtonStandardExample} from './radio-button-standard/radio-button-standard-example';
import {SelectDisabledExample} from './select-disabled/select-disabled-example';
import {SelectFormsExample} from './select-forms/select-forms-example';
import {SelectStandardExample} from './select-standard/select-standard-example';
import {SelectValidationExample} from './select-validation/select-validation-example';
import {SubnavOverviewExample} from './subnav-overview/subnav-overview-example';
import {TableFilterExample} from './table-filter/table-filter-example';
import {TableOverviewExample} from './table-overview/table-overview-example';
import {TableSortExample} from './table-sort/table-sort-example';
import {TabsHorizontalExample} from './tabs-horizontal/tabs-horizontal-example';
import {TabsVerticalExample} from './tabs-vertical/tabs-vertical-example';
import {TileOverviewExample} from './tile-overview/tile-overview-example';
import {ToasterOverviewExample} from './toaster-overview/toaster-overview-example';
import {TypeformSurveyOverviewExample} from './typeform-survey-overview/typeform-survey-overview-example';

export interface LiveExample {
  title: string;
  component: any;
  additionalFiles?: string[];
  selectorName?: string;
}

export const EXAMPLE_COMPONENTS: {[key: string]: LiveExample} = {
  'accordion-overview': {
    title: 'Accordion overview',
    component: AccordionOverviewExample
  },
  'banner-overview': {
    title: 'Banner overview',
    component: BannerOverviewExample
  },
  'button-anchor': {
    title: 'Anchor Tag Buttons',
    component: ButtonAnchorExample
  },
  'button-icon': {
    title: 'Buttons and icons',
    component: ButtonIconExample
  },
  'button-link': {
    title: 'Buttons styled as links',
    component: ButtonLinkExample
  },
  'button-size': {
    title: 'Button Sizes',
    component: ButtonSizeExample
  },
  'button-split': {
    title: 'Split Buttons',
    component: ButtonSplitExample
  },
  'button-type': {
    title: 'Button Types',
    component: ButtonTypeExample
  },
  'checkbox-disabled': {
    title: 'Disabled Checkbox',
    component: CheckboxDisabledExample
  },
  'checkbox-forms': {
    title: 'Forms Support',
    component: CheckboxFormsExample
  },
  'checkbox-standard': {
    title: 'Standard Checkbox',
    component: CheckboxStandardExample
  },
  'chip-action': {
    title: 'Action Chips',
    component: ChipActionExample
  },
  'chip-basic': {
    title: 'Basic Chips',
    component: ChipBasicExample
  },
  'chip-row': {
    title: 'Chip Rows',
    component: ChipRowExample
  },
  'chip-singlerow': {
    title: 'Chip Rows (Single Row)',
    component: ChipSinglerowExample
  },
  'drawer-basic': {
    title: 'Left and Right Drawers',
    component: DrawerBasicExample
  },
  'drawer-menu': {
    title: 'Filter menu',
    component: DrawerMenu
  },
  'drawer-overlay': {
    title: 'Overlay or Push Content',
    component: DrawerOverlayExample
  },
  'drawer-side': {
    title: 'Side-by-Side Drawers',
    component: DrawerSideExample
  },
  'form-field-overview': {
    title: 'Multiple Form Field Elements',
    component: FormFieldOverviewExample
  },
  'icon-overview': {
    title: 'Icon overview',
    component: IconOverviewExample
  },
  'input-prefix': {
    title: 'Disabled Inputs with Prefix and Suffix',
    component: InputPrefixExample
  },
  'input-required': {
    title: 'Required Input',
    component: InputRequiredExample
  },
  'input-suffix': {
    title: 'Inline Inputs with Suffix',
    component: InputSuffixExample
  },
  'list-overview': {
    title: 'List overview',
    component: ListOverviewExample
  },
  'modal-overview': {
    title: 'Modal overview',
    component: ModalOverviewExample,
    additionalFiles: ["modal-overview-example-dialog.html"],
    selectorName: 'ModalOverviewExample, DialogOverviewExampleDialog'
  },
  'navbar-app-switcher': {
    title: 'Navbar app switcher with mobile menu example',
    component: NavbarAppSwitcherExample
  },
  'navbar-overview': {
    title: 'Navbar overview',
    component: NavbarOverviewExample
  },
  'pagination-load-more': {
    title: 'Simple button pagination',
    component: PaginationLoadMoreExample
  },
  'pagination-simple': {
    title: 'Simple pagination',
    component: PaginationSimpleExample
  },
  'pagination-standard': {
    title: 'Standard pagination',
    component: PaginationStandardExample
  },
  'picklist-simple': {
    title: 'Picklist simple',
    component: PicklistSimpleExample
  },
  'picklist-valueset': {
    title: 'Picklist valueset',
    component: PicklistValuesetExample
  },
  'popover-dynamic': {
    title: 'Dynamic Content',
    component: PopoverDynamicExample
  },
  'popover-overview': {
    title: 'Popover Overview',
    component: PopoverOverviewExample
  },
  'popover-placement': {
    title: 'Popover Placement',
    component: PopoverPlacementExample
  },
  'progress-dots': {
    title: 'Progress dots',
    component: ProgressDotsExample
  },
  'progress-spinner': {
    title: 'Progress spinner',
    component: ProgressSpinnerExample
  },
  'radio-button-disabled': {
    title: 'Disabled Radio Buttons',
    component: RadioButtonDisabledExample
  },
  'radio-button-forms': {
    title: 'Inline Radio Buttons using Form Controls',
    component: RadioButtonFormsExample
  },
  'radio-button-standard': {
    title: 'Standard Radio Buttons',
    component: RadioButtonStandardExample
  },
  'select-disabled': {
    title: 'Disabled Inline Select Component',
    component: SelectDisabledExample
  },
  'select-forms': {
    title: 'Select using Angular forms',
    component: SelectFormsExample
  },
  'select-standard': {
    title: 'Standard Select Component',
    component: SelectStandardExample
  },
  'select-validation': {
    title: 'Component Validation',
    component: SelectValidationExample
  },
  'subnav-overview': {
    title: 'Subnav overview',
    component: SubnavOverviewExample
  },
  'table-filter': {
    title: 'Filtered Table without Borders',
    component: TableFilterExample
  },
  'table-overview': {
    title: 'Table overview',
    component: TableOverviewExample
  },
  'table-sort': {
    title: 'Table sorting',
    component: TableSortExample
  },
  'tabs-horizontal': {
    title: 'Horizontal Tabs with Event Handling',
    component: TabsHorizontalExample
  },
  'tabs-vertical': {
    title: 'Vertical and Horizontal Tabs',
    component: TabsVerticalExample
  },
  'tile-overview': {
    title: 'Tile overview',
    component: TileOverviewExample
  },
  'toaster-overview': {
    title: 'Toaster Messages overview',
    component: ToasterOverviewExample
  },
  'typeform-survey-overview': {
    title: 'Typeform survey overview',
    component: TypeformSurveyOverviewExample
  },
};

export const EXAMPLE_LIST = [
  AccordionOverviewExample,
  BannerOverviewExample,
  ButtonAnchorExample,
  ButtonIconExample,
  ButtonLinkExample,
  ButtonSizeExample,
  ButtonSplitExample,
  ButtonTypeExample,
  CheckboxDisabledExample,
  CheckboxFormsExample,
  CheckboxStandardExample,
  ChipActionExample,
  ChipBasicExample,
  ChipRowExample,
  ChipSinglerowExample,
  DrawerBasicExample,
  DrawerMenu,
  DrawerOverlayExample,
  DrawerSideExample,
  FormFieldOverviewExample,
  IconOverviewExample,
  InputPrefixExample,
  InputRequiredExample,
  InputSuffixExample,
  ListOverviewExample,
  DialogOverviewExampleDialog,ModalOverviewExample,
  NavbarAppSwitcherExample,
  NavbarOverviewExample,
  PaginationLoadMoreExample,
  PaginationSimpleExample,
  PaginationStandardExample,
  PicklistSimpleExample,
  PicklistValuesetExample,
  PopoverDynamicExample,
  PopoverOverviewExample,
  PopoverPlacementExample,
  ProgressDotsExample,
  ProgressSpinnerExample,
  RadioButtonDisabledExample,
  RadioButtonFormsExample,
  RadioButtonStandardExample,
  SelectDisabledExample,
  SelectFormsExample,
  SelectStandardExample,
  SelectValidationExample,
  SubnavOverviewExample,
  TableFilterExample,
  TableOverviewExample,
  TableSortExample,
  TabsHorizontalExample,
  TabsVerticalExample,
  TileOverviewExample,
  ToasterOverviewExample,
  TypeformSurveyOverviewExample,
];

@NgModule({
  declarations: EXAMPLE_LIST,
  entryComponents: EXAMPLE_LIST,
  imports: [
    CashmereModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ]
})
export class CashmereExampleModule { }
