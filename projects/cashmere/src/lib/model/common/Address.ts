export class Address {
    addressLine1: string;
    addressLine2: string;
    addressLine3: string;
    city: string;
    state: string;
    zip: string;
    postalCode: string;
    countryCode: string;
    province: string;
    attentionTo: string;

    constructor(addressLine1: string, addressLine2: string, city: string, state: string, zip: string) {
        this.addressLine1 = addressLine1;
        this.addressLine2 = addressLine2;
        this.city = city;
        this.state = state;
        this.zip = zip;
    }

    static createTestAddress(): Address {
        return new Address('1414 Lovers Lane', 'Apt. B', 'Sandy', 'Ut', '84094');
    }

    getCityStateZip() {
        if (this.province.length > 0) {
            return this.city + ', ' + this.province + ' ' + this.postalCode;
        }
        return this.city + ', ' + this.state + ' ' + this.zip;
    }
}
