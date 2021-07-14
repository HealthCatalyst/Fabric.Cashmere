import { Pipe, PipeTransform } from "@angular/core";

/** Creates an abbreviated number for display. 1,234,234 => 1.23M */
@Pipe({ name: "abbreviateNumber" })
export class NumberAbbreviatorPipe implements PipeTransform {
    public static powers = [
        { key: "Q", value: Math.pow(10, 15) },
        { key: "T", value: Math.pow(10, 12) },
        { key: "B", value: Math.pow(10, 9) },
        { key: "M", value: Math.pow(10, 6) },
        { key: "K", value: 1000 }
    ];

    /**
     * @param value the value to be abbreviated
     * @param decimalPoints how many decimal points to round to
     * @param threshold represents the number at which we should start abbreviating;
     * if the threshold is 1 million, we'll leave number less than 1 million as is (aside from adding commas or decimal points)
     */
    public transform(value: number, decimalPoints = 2, threshold = 1000000): string {
        if (value === null) { return value; }

        // use defaults if given funky parameters
        if (decimalPoints < 0 || !Number.isInteger(decimalPoints)) { decimalPoints = 2; }
        if (threshold < 1000 || !Number.isInteger(threshold)) { threshold = 1000; }

        const abs = Math.abs(value);
        let key = "";
        let roundedStringVal = "";
        const isNegative = value < 0;

        if (abs >= threshold) {
            // Abbreviate, adding unit if greater than specified limit
            for (const power of NumberAbbreviatorPipe.powers) {
                let reduced = abs / power.value;
                reduced = this.roundValue(reduced, decimalPoints);

                if (reduced >= 1) {
                    roundedStringVal = reduced.toString();
                    key = power.key;
                    break;
                }
            }
        } else {
            // Just round decimals and add commas if less than specified limit
            roundedStringVal = this.roundValue(abs, decimalPoints).toLocaleString();
        }

        return (isNegative ? "-" : "") + roundedStringVal + key;
    }

    private roundValue(value: number, decimalPoints = 2): number {
        const rounder = Math.pow(10, decimalPoints);
        return Math.round(value * rounder) / rounder;
    }
}