import {Address} from "../common/Address";

export class Agency {
  number: number;
  name: string;
  address: Address;
  fax: string;
  phone: string;
  inactiveDate: Date;

  constructor(number: number, name: string, address: Address, fax: string, phone: string, inactiveDate: Date) {
    this.number = number;
    this.name = name;
    this.address = address;
    this.fax = fax;
    this.phone = phone;
    this.inactiveDate = inactiveDate;
  }

  static createTestAgency(): Agency {
    let address: Address = Address.createTestAddress();
    return new Agency(1234, "TestAgency", address, "8010987654", "8019384576", new Date());
  }
}
