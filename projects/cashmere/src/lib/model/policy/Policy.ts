import {Address} from "../common/Address";
import {Agency} from "../agency/Agency";
import {Contact} from "../common/Contact";
import {ClassCode} from "./ClassCode";
import {Emod} from "./Emod";
import {NamedInsured} from "./NamedInsured";

export class Policy {
  policyName: string;
  policyNumber: string;
  renewalSeq: string;
  status: string;
  agency: Agency;
  agencyContact: Contact;
  accountNumber: number;
  insurerNAIC: number;
  managingIsp: string;
  insuringIsp: string;
  insurerName: string;
  producerName: string;
  accountEmail: string;
  effectiveDate: Date;
  expireDate: Date;
  cancelDate: Date;
  mailingAddress: Address;
  billingAddress: Address;
  producerAddress: Address;
  billingAddressOverride: boolean;
  bodilyInjuryEachAccident: number;
  bodilyInjuryPolicyLimit: number;
  bodilyInjuryEachEmployee: number;
  waiverOfSubrogation: boolean;

  contacts: Array<Contact> = new Array<Contact>();
  emodHistory: Array<Emod> = new Array<Emod>();
  namedInsureds: Array<NamedInsured> = new Array<NamedInsured>();
  classCodes: Array<ClassCode> = new Array<ClassCode>();

  constructor(policyName: string, policyNumber: string, renewalSeq: string, status: string, agency: Agency,
              agencyContact: Contact, accountNumber: number, insurerNAIC: number, managingIsp: string,
              insuringIsp: string, insurerName: string, producerName: string, accountEmail: string,
              effectiveDate: Date, expireDate: Date, cancelDate: Date, mailingAddress: Address,
              billingAddress: Address, producerAddress: Address, billingAddressOverride: boolean,
              bodilyInjuryEachAccident: number, bodilyInjuryPolicyLimit: number, bodilyInjuryEachEmployee: number,
              waiverOfSubrogation: boolean, contacts: Array<Contact>, emodHistory: Array<Emod>,
              namedInsureds: Array<NamedInsured>, classCodes: Array<ClassCode>) {
    this.policyName = policyName;
    this.policyNumber = policyNumber;
    this.renewalSeq = renewalSeq;
    this.status = status;
    this.agency = agency;
    this.agencyContact = agencyContact;
    this.accountNumber = accountNumber;
    this.insurerNAIC = insurerNAIC;
    this.managingIsp = managingIsp;
    this.insuringIsp = insuringIsp;
    this.insurerName = insurerName;
    this.producerName = producerName;
    this.accountEmail = accountEmail;
    this.effectiveDate = effectiveDate;
    this.expireDate = expireDate;
    this.cancelDate = cancelDate;
    this.mailingAddress = mailingAddress;
    this.billingAddress = billingAddress;
    this.producerAddress = producerAddress;
    this.billingAddressOverride = billingAddressOverride;
    this.bodilyInjuryEachAccident = bodilyInjuryEachAccident;
    this.bodilyInjuryPolicyLimit = bodilyInjuryPolicyLimit;
    this.bodilyInjuryEachEmployee = bodilyInjuryEachEmployee;
    this.waiverOfSubrogation = waiverOfSubrogation;
    this.contacts = contacts;
    this.emodHistory = emodHistory;
    this.namedInsureds = namedInsureds;
    this.classCodes = classCodes;
  }

  static createTestPolicy(): Policy {
    let address: Address = Address.createTestAddress();
    let agency: Agency = Agency.createTestAgency();
    let contacts: Array<Contact> = new Array<Contact>();
    let contact: Contact = Contact.createTestContact();
    contacts.push(contact);
    let emodHistory: Array<Emod> = new Array<Emod>();
    let emod: Emod = Emod.createTestEmod();
    emodHistory.push(emod);
    let namedInsureds: Array<NamedInsured> = new Array<NamedInsured>();
    let namedInsured: NamedInsured = NamedInsured.createTestNamedInsured();
    namedInsureds.push(namedInsured);
    let classCodes: Array<ClassCode> = new Array<ClassCode>();
    let classCode: ClassCode = ClassCode.createTestClassCode();
    classCodes.push(classCode);

    return new Policy("TestPolicy", "12345", "345", "Pending", agency, contact, 2345, 5497,
      "WCF", "WCF", "Workers Comp", "TestProducer", "account@emial.com", new Date(), new Date(),
    new Date(), address, address, address, false, 3, 4, 3, false,
      contacts, emodHistory, namedInsureds, classCodes);
  }
}
