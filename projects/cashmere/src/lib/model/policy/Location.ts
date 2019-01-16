import {Address} from '../common/Address';

export class Location {
    id: number;
    masterLocationId: number;
    namedInsuredId: number;
    dbaName: string;
    nickName: string;
    noLocationState: string;
    mailingAddress: Address;
    physicalAddress: Address;
    partTimeEmployees: number;
    fullTimeEmployees: number;
    userId: string;
    status: string;
    deleted: boolean = false;

    constructor(
        id: number,
        masterLocationId: number,
        namedInsuredId: number,
        dbaName: string,
        nickName: string,
        noLocationState: string,
        mailingAddress: Address,
        physicalAddress: Address,
        partTimeEmployees: number,
        fullTimeEmployees: number,
        userId: string,
        status: string,
        deleted: boolean
    ) {
        this.id = id;
        this.masterLocationId = masterLocationId;
        this.namedInsuredId = namedInsuredId;
        this.dbaName = dbaName;
        this.nickName = nickName;
        this.noLocationState = noLocationState;
        this.mailingAddress = mailingAddress;
        this.physicalAddress = physicalAddress;
        this.partTimeEmployees = partTimeEmployees;
        this.fullTimeEmployees = fullTimeEmployees;
        this.userId = userId;
        this.status = status;
        this.deleted = deleted;
    }

    static createTestLocation(): Location {
        let address: Address = Address.createTestAddress();
        return new Location(
            23434,
            54656,
            545465,
            'TestDBAName',
            'TestNickName',
            'testNoLoc',
            address,
            address,
            4,
            3,
            'JDoe',
            'TestStatus',
            false
        );
    }
}
