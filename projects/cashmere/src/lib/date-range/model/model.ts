// ** Preset date range to be bound as a selectable option */
export interface PresetItem {
    presetLabel: string;
    range: DateRange;
}

// ** Range of dates with beginning and end */
export interface DateRange {
    fromDate?: Date;
    toDate?: Date;
}

// ** Behavioral Options of the date range component */
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
