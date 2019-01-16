import {Address} from '../common/Address';
import {Location} from './Location';
import {SimpleObject} from '../common/SimpleObject';
import {Principal} from './Principal';

export class NamedInsured {
    id: number;
    logCounter: number;
    primary: boolean;
    businessName: string;
    firstName: string;
    lastName: string;
    middleName: string;
    mailingAddress: Address;
    phone: string;
    taxId: string;
    naics: number;
    yearEstablished: number;
    legalEntityType: SimpleObject;
    userId: string;
    status: string;
    noPrincipalReason: string;
    deleted: boolean = false;

    locations: Array<Location> = new Array<Location>();
    principals: Array<Principal> = new Array<Principal>();
    coveredStates: Array<SimpleObject> = new Array<SimpleObject>();
    dbaNames: Array<SimpleObject> = new Array<SimpleObject>();

    constructor(
        id: number,
        logCounter: number,
        primary: boolean,
        businessName: string,
        firstName: string,
        middleName: string,
        lastName: string,
        mailingAddress: Address,
        phone: string,
        taxId: string,
        naics: number,
        yearEstablished: number,
        legalEntityType: SimpleObject,
        userId: string,
        status: string,
        noPrincipalReason: string,
        deleted: boolean,
        locations: Array<Location>,
        principals: Array<Principal>,
        coveredStates: Array<SimpleObject>,
        dbaNames: Array<SimpleObject>
    ) {
        this.id = id;
        this.logCounter = logCounter;
        this.businessName = businessName;
        this.firstName = firstName;
        this.primary = primary;
        this.lastName = lastName;
        this.middleName = middleName;
        this.mailingAddress = mailingAddress;
        this.phone = phone;
        this.taxId = taxId;
        this.naics = naics;
        this.yearEstablished = yearEstablished;
        this.legalEntityType = legalEntityType;
        this.userId = userId;
        this.status = status;
        this.noPrincipalReason = noPrincipalReason;
        this.deleted = deleted;
        this.locations = locations;
        this.principals = principals;
        this.coveredStates = coveredStates;
        this.dbaNames = dbaNames;
    }

    static createTestNamedInsured(): NamedInsured {
        let mailingAddr: Address = Address.createTestAddress();
        let legalType: SimpleObject = SimpleObject.createTestSimpleObject();
        let locations: Array<Location> = new Array<Location>();
        let principals: Array<Principal> = new Array<Principal>();
        let coveredStates: Array<SimpleObject> = new Array<SimpleObject>();
        let dbaNames: Array<SimpleObject> = new Array<SimpleObject>();
        let loc: Location = Location.createTestLocation();
        locations.push(loc);
        let principal: Principal = Principal.createTestPrincipal();
        principals.push(principal);
        let simpleObject: SimpleObject = SimpleObject.createTestSimpleObject();
        coveredStates.push(simpleObject);
        dbaNames.push(simpleObject);
        return new NamedInsured(
            345,
            1,
            false,
            'TestBizName',
            'John',
            'Awesome',
            'Doe',
            mailingAddr,
            '8019166347',
            '563-67-8695',
            45435,
            2001,
            legalType,
            'JDoe',
            'TestStatus',
            'TestNoPREason',
            false,
            locations,
            principals,
            coveredStates,
            dbaNames
        );
    }
}
