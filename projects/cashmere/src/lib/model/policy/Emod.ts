export class Emod {
    emod: number;
    stateCode: string;
    effectiveDate: Date;
    expireDate: Date;
    emodChange: number;

    constructor(emod: number, stateCode: string, effectiveDate: Date, expireDate: Date, emodChange: number) {
        this.emod = emod;
        this.stateCode = stateCode;
        this.effectiveDate = effectiveDate;
        this.expireDate = expireDate;
        this.emodChange = emodChange;
    }

    static createTestEmod(): Emod {
        return new Emod(0.7, 'UT', new Date(), new Date(), 0.2);
    }
}
