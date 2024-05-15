/* eslint-disable @typescript-eslint/no-loss-of-precision */
import {NumberAbbreviatorPipe} from "./number-abbreviator.pipe";

describe("NumberAbbreviatorPipe - ",
    () => {
        // This pipe is a pure, stateless function so no need for BeforeEach
        const pipe = new NumberAbbreviatorPipe();

        it("abbreviates numbers",
            () => {
                expect(pipe.transform(1234000)).toBe("1.23M");
                expect(pipe.transform(1234000000)).toBe("1.23B");
                expect(pipe.transform(1234000000000)).toBe("1.23T");
                expect(pipe.transform(1234000000000000)).toBe("1.23Q");
                expect(pipe.transform(1234000000000000000)).toBe("1234Q");
            });

        it("rounds numbers appropriately",
            () => {
                expect(pipe.transform(1236000)).toBe("1.24M");
                expect(pipe.transform(1234000)).toBe("1.23M");
                expect(pipe.transform(1999000)).toBe("2M");
                expect(pipe.transform(1009000)).toBe("1.01M");
                expect(pipe.transform(1000235000000000000)).toBe("1000.24Q");
            });

        it("handles negative numbers",
            () => {
                expect(pipe.transform(-100)).toBe("-100");
                expect(pipe.transform(-1345450)).toBe("-1.35M");
                expect(pipe.transform(-1)).toBe("-1");
                expect(pipe.transform(-0)).toBe("0");
            });

        it("digits after decimal point can be configured",
            () => {
                expect(pipe.transform(1345000, 1)).toBe("1.3M");
                expect(pipe.transform(1345000, 0)).toBe("1M");
                expect(pipe.transform(1345000, 3)).toBe("1.345M");
            });

        it("digits after decimal point can be configured, but no superfluous zeros will be added to the end",
            () => {
                expect(pipe.transform(1340000, 3)).toBe("1.34M");
            });

        it("if given a garbage, non-integer or negative value for the decimal point configuration, gives you two decimal points",
            () => {
                expect(pipe.transform(1340000, NaN)).toBe("1.34M");
                expect(pipe.transform(1340000, 4.123)).toBe("1.34M");
                expect(pipe.transform(1340000, -54)).toBe("1.34M");
            });

        describe("accepts parameter designating point at which to abbreviate", () => {
            it("accepts values over 999 for this parameter", () => {
                expect(pipe.transform(1000, undefined, 1000)).toBe("1K");
                expect(pipe.transform(1230, undefined, 1000)).toBe("1.23K");
                expect(pipe.transform(1234, undefined, 1000)).toBe("1.23K");
                expect(pipe.transform(12340, undefined, 1000)).toBe("12.34K");
            });

            it("ignores weird threshold arguments", () => {
                expect(pipe.transform(11, undefined, 10)).toBe("11");
                expect(pipe.transform(1000000, undefined, 10)).toBe("1M");
            });
        });

        describe("handle numbers between below the threshold for abbreviating", () => {
            it("won't try to abbreviate or give them a unit",
                () => {
                    expect(pipe.transform(999)).toBe("999");
                    expect(pipe.transform(995)).toBe("995");
                    expect(pipe.transform(100)).toBe("100");
                    expect(pipe.transform(10)).toBe("10");
                    expect(pipe.transform(1)).toBe("1");
                    expect(pipe.transform(0)).toBe("0");
                });

            it("rounds them to correct number of decimal points",
                () => {
                    expect(pipe.transform(1.1111111111111111111)).toBe("1.11");
                    expect(pipe.transform(999.1439, 3)).toBe("999.144");
                    expect(pipe.transform(-3.345)).toBe("-3.35");
                });

            it("handles zero",
                () => {
                    expect(pipe.transform(0)).toBe("0");
                });
        });
    });
