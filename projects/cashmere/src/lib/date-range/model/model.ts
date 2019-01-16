export interface PresetItem {
  presetLabel: string;
  range: DateRange;
}

export interface DateRange {
  fromDate?: Date;
  toDate?: Date;
}

export interface DateRangeOptions {
  presets: Array<PresetItem>;
  format: string;
  range: DateRange;
  excludeWeekends?: boolean;
  locale?: string;
  fromMinMax?: DateRange;
  toMinMax?: DateRange;
  applyLabel?: string;
  cancelLabel?: string;
  placeholder?: string;
  startDatePrefix?: string;
  endDatePrefix?: string;
}
