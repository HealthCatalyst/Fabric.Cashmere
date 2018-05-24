import {
    IPagedCollection,
    IPageSettings,
    IPicklistRemoteQueryResponse,
    IValueOption,
    IValueSetOption,
    PicklistRemoteQueryOptions
} from '@healthcatalyst/cashmere';
import {Observable} from 'rxjs/Observable';

export class FakeRemoteOptionsService {
    /**
     * This code assumes that paging will always be used.
     * Simulates latency by using the Observables delay() function.
     */
    public getOptions(params: PicklistRemoteQueryOptions): Observable<IPicklistRemoteQueryResponse> {
        const response: IPicklistRemoteQueryResponse = {};
        if (params.valueTypeToQuery === 'values' || (params.valueTypeToQuery === 'both' && params.valuePageSettings)) {
            const vals = getFakeValues(params.searchTerm);
            const alreadySelectedCodes = params.picklist.selected ? params.picklist.selected.values.map(e => e.code) : [];
            // tslint:disable-next-line:no-non-null-assertion
            response.pagedValues = this.buildResponse<IValueOption>(params.valuePageSettings!, vals, alreadySelectedCodes);
        }
        if (params.valueTypeToQuery === 'valuesets' || (params.valueTypeToQuery === 'both' && params.valueSetPageSettings)) {
            const valSets = getFakeValueSets(params.searchTerm, false);
            const alreadySelectedCodes = params.picklist.selected ? params.picklist.selected.valueSets.map(e => e.code) : [];
            // tslint:disable-next-line:no-non-null-assertion
            response.pagedValueSets = this.buildResponse<IValueSetOption>(params.valueSetPageSettings!, valSets, alreadySelectedCodes);
        }

        return Observable.of(response).delay(1000);
    }

    public getValuesForValueset(code: string): Observable<IValueOption[]> {
        return Observable.of(getFakeValues('', 10)).delay(1000);
    }

    private buildResponse<T extends IValueOption>(pgSettings: IPageSettings, vals: T[], selected: string[]): IPagedCollection<T> {
        const page = pgSettings.currentPage;
        const start = (page - 1) * pgSettings.itemsPerPage;
        const valsToReturn = vals.filter(e => (selected ? !selected.some(s => s === e.code) : true));

        return {
            pagerSettings: {currentPage: pgSettings.currentPage, itemsPerPage: pgSettings.itemsPerPage},
            totalItems: valsToReturn.length,
            totalPages: valsToReturn.length / pgSettings.itemsPerPage,
            values: valsToReturn.slice(start, start + pgSettings.itemsPerPage)
        };
    }
}

export function getFakeValues(search: string = '', count: number = 100): IValueOption[] {
    return getValues()
        .filter(e => (search ? e.title.toLocaleLowerCase().indexOf(search) > -1 : true))
        .slice(0, count);
}

export function getFakeValueSets(search: string = '', preloadValues: boolean = true): IValueSetOption[] {
    const subValues = preloadValues ? getFakeValues('', 10) : [];
    const valuesets = getValueSets().filter(e => (search ? e.title.toLocaleLowerCase().indexOf(search) > -1 : true));
    valuesets.forEach(e => (e.subValues = subValues));
    return valuesets;
}

/* tslint:disable:max-line-length */
function getValues(): IValueOption[] {
    return [
        {code: '001', title: 'Cholera'},
        {code: '001.0', title: 'Cholera due to vibrio cholerae'},
        {code: '001.1', title: 'Cholera due to vibrio cholerae el tor'},
        {code: '001.9', title: 'Cholera, unspecified'},
        {code: '002', title: 'Typhoid and paratyphoid fevers'},
        {code: '002.0', title: 'Typhoid fever'},
        {code: '002.1', title: 'Paratyphoid fever A'},
        {code: '002.2', title: 'Paratyphoid fever B'},
        {code: '002.3', title: 'Paratyphoid fever C'},
        {code: '002.9', title: 'Paratyphoid fever, unspecified'},
        {code: '003', title: 'Other salmonella infections'},
        {code: '003.0', title: 'Salmonella gastroenteritis'},
        {code: '003.1', title: 'Salmonella septicemia'},
        {code: '003.2', title: 'Localized salmonella infections'},
        {code: '003.20', title: 'Localized salmonella infection, unspecified'},
        {code: '003.21', title: 'Salmonella meningitis'},
        {code: '003.22', title: 'Salmonella pneumonia'},
        {code: '003.23', title: 'Salmonella arthritis'},
        {code: '003.24', title: 'Salmonella osteomyelitis'},
        {code: '003.29', title: 'Other localized salmonella infections'},
        {code: '003.8', title: 'Other specified salmonella infections'},
        {code: '003.9', title: 'Salmonella infection, unspecified'},
        {code: '004', title: 'Shigellosis'},
        {code: '004.0', title: 'Shigella dysenteriae'},
        {code: '004.1', title: 'Shigella flexneri'},
        {code: '004.2', title: 'Shigella boydii'},
        {code: '004.3', title: 'Shigella sonnei'},
        {code: '004.8', title: 'Other specified shigella infections'},
        {code: '004.9', title: 'Shigellosis, unspecified'},
        {code: '005', title: 'Other food poisoning (bacterial)'},
        {code: '005.0', title: 'Staphylococcal food poisoning'},
        {code: '005.1', title: 'Botulism food poisoning'},
        {code: '005.2', title: 'Food poisoning due to Clostridium perfringens (C. welchii)'},
        {code: '005.3', title: 'Food poisoning due to other Clostridia'},
        {code: '005.4', title: 'Food poisoning due to Vibrio parahaemolyticus'},
        {code: '005.8', title: 'Other bacterial food poisoning'},
        {code: '005.81', title: 'Food poisoning due to Vibrio vulnificus'},
        {code: '005.89', title: 'Other bacterial food poisoning'},
        {code: '005.9', title: 'Food poisoning, unspecified'},
        {code: '006', title: 'Amebiasis'},
        {code: '006.0', title: 'Acute amebic dysentery without mention of abscess'},
        {code: '006.1', title: 'Chronic intestinal amebiasis without mention of abscess'},
        {code: '006.2', title: 'Amebic nondysenteric colitis'},
        {code: '006.3', title: 'Amebic liver abscess'},
        {code: '006.4', title: 'Amebic lung abscess'},
        {code: '006.5', title: 'Amebic brain abscess'},
        {code: '006.6', title: 'Amebic skin ulceration'},
        {code: '006.8', title: 'Amebic infection of other sites'},
        {code: '006.9', title: 'Amebiasis, unspecified'},
        {code: '007', title: 'Other protozoal intestinal diseases'},
        {code: '007.0', title: 'Balantidiasis'},
        {code: '007.1', title: 'Giardiasis'},
        {code: '007.2', title: 'Coccidiosis'},
        {code: '007.3', title: 'Intestinal trichomoniasis'},
        {code: '007.4', title: 'Cryptosporidiosis'},
        {code: '007.5', title: 'Cyclosporiasis'},
        {code: '007.8', title: 'Other specified protozoal intestinal diseases'},
        {code: '007.9', title: 'Unspecified protozoal intestinal disease'},
        {code: '008', title: 'Intestinal infections due to other organisms'},
        {code: '008.0', title: 'Intestinal infection due to escherichia coli [E. coli]'},
        {code: '008.00', title: 'Intestinal infection due to E. coli, unspecified'},
        {code: '008.01', title: 'Intestinal infection due to enteropathogenic E. coli'},
        {code: '008.02', title: 'Intestinal infection due to enterotoxigenic E. coli'},
        {code: '008.03', title: 'Intestinal infection due to enteroinvasive E. coli'},
        {code: '008.04', title: 'Intestinal infection due to enterohemorrhagic E. coli'},
        {code: '008.09', title: 'Intestinal infection due to other intestinal E. coli infections'},
        {code: '008.1', title: 'Intestinal infection due to arizona group of paracolon bacilli'},
        {code: '008.2', title: 'Intestinal infection due to aerobacter aerogenes'},
        {code: '008.3', title: 'Intestinal infection due to proteus (mirabilis) (morganii)'},
        {code: '008.4', title: 'Intestinal infection due to other specified bacteria'},
        {code: '008.41', title: 'Intestinal infection due to staphylococcus'},
        {code: '008.42', title: 'Intestinal infection due to pseudomonas'},
        {code: '008.43', title: 'Intestinal infection due to campylobacter'},
        {code: '008.44', title: 'Intestinal infection due to yersinia enterocolitica'},
        {code: '008.45', title: 'Intestinal infection due to Clostridium difficile'},
        {code: '008.46', title: 'Intestinal infection due to other anaerobes'},
        {code: '008.47', title: 'Intestinal infection due to other gram-negative bacteria'},
        {code: '008.49', title: 'Intestinal infection due to other organisms'},
        {code: '008.5', title: 'Bacterial enteritis, unspecified'},
        {code: '008.6', title: 'Enteritis due to specified virus'},
        {code: '008.61', title: 'Enteritis due to rotavirus'},
        {code: '008.62', title: 'Enteritis due to adenovirus'},
        {code: '008.63', title: 'Enteritis due to norwalk virus'},
        {code: '008.64', title: "Enteritis due to other small round viruses [SRV's]"},
        {code: '008.65', title: 'Enteritis due to calicivirus'},
        {code: '008.66', title: 'Enteritis due to astrovirus'},
        {code: '008.67', title: 'Enteritis due to enterovirus nec'},
        {code: '008.69', title: 'Enteritis due to other viral enteritis'},
        {code: '008.8', title: 'Intestinal infection due to other organism, not elsewhere classified'},
        {code: '009', title: 'Ill-defined intestinal infections'},
        {code: '009.0', title: 'Infectious colitis, enteritis, and gastroenteritis'},
        {code: '009.1', title: 'Colitis, enteritis, and gastroenteritis of presumed infectious origin'},
        {code: '009.2', title: 'Infectious diarrhea'},
        {code: '009.3', title: 'Diarrhea of presumed infectious origin'},
        {code: '010', title: 'Primary tuberculous infection'},
        {code: '010.0', title: 'Primary tuberculous infection'},
        {code: '010.00', title: 'Primary tuberculous infection, unspecified'},
        {code: '010.01', title: 'Primary tuberculous infection, bacteriological or histological examination not done'},
        {code: '010.02', title: 'Primary tuberculous infection, bacteriological or histological examination unknown (at present)'},
        {code: '010.03', title: 'Primary tuberculous infection, tubercle bacilli found (in sputum) by microscopy'}
    ];
}

function getValueSets(): IValueSetOption[] {
    return [
        {code: 'bebbf8d1-b4ca-495e-96dd-ed4e2dc32d69', subValueCount: 10, subValues: [], title: 'Abdominal Aortic Aneurysm'},
        {code: '95af1a63-6787-443d-a73a-28b8ba15c8db', subValueCount: 10, subValues: [], title: 'Abdominal Hysterectomy'},
        {code: '6622e589-ec0f-4255-b8ae-c177977d3c4c', subValueCount: 10, subValues: [], title: 'Above Normal Follow-up'},
        {
            code: 'e176d119-77ca-4ceb-8427-b6589decf324',
            subValueCount: 10,
            subValues: [],
            title: 'Activation of Emergency Medical System Education'
        },
        {code: '44e54882-0491-456d-a79b-ea751feff704', subValueCount: 10, subValues: [], title: 'Acute and Subacute Iridocyclitis'},
        {code: '356af6d0-fc78-4cb1-83ef-b90745fcff2d', subValueCount: 10, subValues: [], title: 'Acute care hospital'},
        {code: 'df265ebf-da52-420b-b5e4-7a1ed9f613fe', subValueCount: 10, subValues: [], title: 'Acute care hospital Inpatient Encounter'},
        {code: '9da22dd3-b3c6-4097-a2e0-10f8376b9199', subValueCount: 10, subValues: [], title: 'Acute Myocardial Infarction'},
        {code: '2a4506a0-3676-4b79-b986-20529e63193d', subValueCount: 10, subValues: [], title: 'Acute Myocardial Infarction (AMI)'},
        {code: '8a112e04-5d83-4ef3-bbc0-011a7da4aa8c', subValueCount: 10, subValues: [], title: 'Acute or Evolving MI'},
        {code: 'd3a6517a-0443-4c78-b986-7e1140e5ff0c', subValueCount: 10, subValues: [], title: 'Acute Pharyngitis'},
        {code: 'd121cea8-f5fc-4ac8-98a5-b36fd66300fa', subValueCount: 10, subValues: [], title: 'Acute Respiratory Failure'},
        {code: '4eb457fb-5777-4620-a5f2-c5dfc78347d2', subValueCount: 10, subValues: [], title: 'Acute Tonsillitis'},
        {
            code: '489ac30a-3881-472e-9c6b-38728375a00d',
            subValueCount: 10,
            subValues: [],
            title: 'Additional evaluation for depression - adolescent'
        },
        {
            code: '2b3261f3-a26d-407d-98b5-0604e5e422d5',
            subValueCount: 10,
            subValues: [],
            title: 'Additional evaluation for depression - adult'
        },
        {
            code: '73dd818b-4372-4d81-9680-927ace969f6b',
            subValueCount: 10,
            subValues: [],
            title: 'Adhesions and Disruptions of Iris and Ciliary Body'
        },
        {code: '952520a1-e635-4c8f-b517-d6e882b00621', subValueCount: 10, subValues: [], title: 'Adult Outpatient Visit'},
        {code: '1b13ab35-c467-463f-9c7f-fd72846657e8', subValueCount: 10, subValues: [], title: 'Adverse Drug Reactions Education'},
        {code: '989da48c-0794-41e7-aae7-61f1c490655d', subValueCount: 10, subValues: [], title: 'Alcohol and Drug Dependence'},
        {code: '9221380c-7c3a-4c27-bb28-9c953425dfd3', subValueCount: 10, subValues: [], title: 'Alcohol and Drug Dependence Treatment'},
        {code: '413b430e-42ec-41b2-939a-4a4e757124dd', subValueCount: 10, subValues: [], title: 'All Cancer'},
        {code: '1a005eab-b90d-446f-b6ed-7d7fb69d7873', subValueCount: 10, subValues: [], title: 'Allergy to ACE Inhibitor or ARB'},
        {code: '8d4c396c-627d-4ffe-8c4e-7ac7f043ec4d', subValueCount: 10, subValues: [], title: 'Allergy to Antineoplastic Therapy'},
        {code: 'e9c3775b-1557-4a21-a135-dbbeb791f48c', subValueCount: 10, subValues: [], title: 'Allergy to Beta Blocker Therapy'},
        {code: 'abbaaa84-af77-48b8-93e7-ec68fd06afb3', subValueCount: 10, subValues: [], title: 'Allergy to Eggs'},
        {code: '184e3d3d-0b30-4838-8530-d3f78efb70eb', subValueCount: 10, subValues: [], title: 'Allergy to Influenza Vaccine'},
        {
            code: 'deb44506-f9a2-4a02-86cd-9ebcafeb5b46',
            subValueCount: 10,
            subValues: [],
            title: 'Allergy to Tamoxifen or Aromatase Inhibitor Therapy'
        },
        {code: 'f02d0a4b-9144-4348-940d-5444bab7c6f7', subValueCount: 10, subValues: [], title: 'Amblyopia'},
        {code: '2b7be42c-e257-4fb1-8d9a-2a72c7289ee9', subValueCount: 10, subValues: [], title: 'Ambulatory'},
        {code: '06354330-0a58-4a81-89e9-f59141cc713e', subValueCount: 10, subValues: [], title: 'Ambulatory surgical center'},
        {code: 'c92e6a29-b37c-4291-90c4-d4de34b86ebd', subValueCount: 10, subValues: [], title: 'Ambulatory/ED Visit'},
        {
            code: '41d48943-84d0-4446-a7ae-c9aa9ba21093',
            subValueCount: 10,
            subValues: [],
            title: "Anaphylactic Reaction to Common Baker's Yeast"
        },
        {code: 'd4128c75-657d-4225-851a-9b26ae03cd49', subValueCount: 10, subValues: [], title: 'Anaphylactic Reaction to DTaP Vaccine'},
        {
            code: '769f7108-f6d5-4e5a-9de5-cc4f8d9aa4e5',
            subValueCount: 10,
            subValues: [],
            title: 'Anaphylactic Reaction to Hemophilus Influenza B (HiB) Vaccine'
        },
        {
            code: '1348e6b3-ecc7-4a6c-9f4d-3f8c86396ba2',
            subValueCount: 10,
            subValues: [],
            title: 'Anaphylactic Reaction to Hepatitis A Vaccine'
        },
        {
            code: 'a90bd50c-af79-41a7-9c45-5f9b693abdaa',
            subValueCount: 10,
            subValues: [],
            title: 'Anaphylactic Reaction to Hepatitis B Vaccine'
        },
        {
            code: '40e8fd42-b4dd-4ad2-bc5e-790131fe2bdb',
            subValueCount: 10,
            subValues: [],
            title: 'Anaphylactic Reaction to Inactivated Polio Vaccine (IPV)'
        },
        {
            code: '80ae94ea-2b28-40a8-847f-e2c1fb4a81e7',
            subValueCount: 10,
            subValues: [],
            title: 'Anaphylactic Reaction to Influenza Vaccine'
        },
        {code: 'f8b95842-007f-4821-b563-34191a21b4e9', subValueCount: 10, subValues: [], title: 'Anaphylactic Reaction to Neomycin'},
        {
            code: '684d691c-c1f7-4bd7-8e34-b874af8e99c0',
            subValueCount: 10,
            subValues: [],
            title: 'Anaphylactic Reaction to Pneumococcal Conjugate Vaccine'
        },
        {code: 'd30a1b85-02eb-407f-b069-9b3fb50256ad', subValueCount: 10, subValues: [], title: 'Anaphylactic Reaction to Polymyxin'},
        {
            code: '1f0fbf75-ccab-49ac-8815-aa2111d70907',
            subValueCount: 10,
            subValues: [],
            title: 'Anaphylactic Reaction to Rotavirus Vaccine'
        },
        {code: '999c16b0-d1b8-4f82-b45b-331e4a734624', subValueCount: 10, subValues: [], title: 'Anaphylactic Reaction to Streptomycin'},
        {code: '6ee22c84-4fcc-42f9-a3f5-df626e6eb83a', subValueCount: 10, subValues: [], title: 'Anomalies of Pupillary Function'},
        {code: '74395b29-6b93-440c-9def-05e1be84d882', subValueCount: 10, subValues: [], title: 'Another Source of Infection'},
        {code: 'ecf1c5a8-f890-4fb0-84be-d39f63e0ead6', subValueCount: 10, subValues: [], title: 'Any infection'},
        {
            code: '1e962c2f-e5c3-4be8-b0c9-ae48ecbc221d',
            subValueCount: 10,
            subValues: [],
            title: 'Any Infection Prior to Anesthesia Concepts'
        },
        {code: 'f93fef01-266e-472e-be34-6ae6cb1e2ce4', subValueCount: 10, subValues: [], title: 'Aortic balloon pump insertion'},
        {code: '0abe68fc-fb1e-484c-a027-20279288a211', subValueCount: 10, subValues: [], title: 'Aphakia and Other Disorders of Lens'},
        {code: 'f0cecde4-d503-40a7-b33b-be1359d954e3', subValueCount: 10, subValues: [], title: 'Arrhythmia'},
        {code: '15b9c90b-14ce-4edb-b934-97b089ee8545', subValueCount: 10, subValues: [], title: 'Arterial or Umbilical Venous Cath Group'},
        {code: 'ca5067be-3b28-458c-a45c-33fff71e5b2e', subValueCount: 10, subValues: [], title: 'Artificial Rupture of Membranes'},
        {code: '7424c3b7-d834-4cc9-95b7-23ae18a4b88f', subValueCount: 10, subValues: [], title: 'Aspiration and Injection Procedures'},
        {code: '149e7dcb-30ec-4659-9a35-7e09e235a269', subValueCount: 10, subValues: [], title: 'Asthma'},
        {code: 'b2898a11-a233-4c10-b253-7e7d5c3ff5bb', subValueCount: 10, subValues: [], title: 'Asthma'},
        {
            code: 'dbb720c2-e047-4377-bc63-d8b259078a56',
            subValueCount: 10,
            subValues: [],
            title: 'Atherosclerosis and Peripheral Arterial Disease'
        },
        {code: '2d6b35fe-00e6-4365-ad3e-9491c743fd6c', subValueCount: 10, subValues: [], title: 'Atrial Ablation'},
        {code: '4f5bedfc-7f34-40e3-843d-8584995e40f3', subValueCount: 10, subValues: [], title: 'Atrial Fibrillation/Flutter'},
        {code: '065e26b2-faa3-4b81-aa64-da031bf3700d', subValueCount: 10, subValues: [], title: 'Atrioventricular Block'},
        {code: '14f6ebfa-df35-4730-a248-f0a93fef122e', subValueCount: 10, subValues: [], title: 'Baseline State'},
        {code: '69d02c68-e44c-4f95-bb8c-d59ac27a1df8', subValueCount: 10, subValues: [], title: 'Below Normal Follow up'},
        {code: 'dacbf73c-e491-4925-aaff-36a3fb214cec', subValueCount: 10, subValues: [], title: 'Best Corrected Visual Acuity'},
        {code: 'e9afb280-4f2c-4140-a933-3c59cc9ad6cb', subValueCount: 10, subValues: [], title: 'BH Assessment for Alcohol or Other Drugs'},
        {code: 'ab9beab1-ae60-4bd8-8db6-3c4c61cef8b2', subValueCount: 10, subValues: [], title: 'BH Condition Involving Bipolar Disorder'},
        {
            code: '21c03775-b91d-41ea-a032-cf7e3a9d709c',
            subValueCount: 10,
            subValues: [],
            title: 'BH Condition Involving Unipolar Depression'
        },
        {code: 'a6b3e3bd-d55f-420a-bf98-237a44a0f607', subValueCount: 10, subValues: [], title: 'BH Counseling for Depression'},
        {code: '41a27896-7194-4fda-849e-89e47cc34bad', subValueCount: 10, subValues: [], title: 'BH Electroconvulsive Therapy'},
        {code: '5b96018d-0ad1-4503-bb85-30e6aa916b8c', subValueCount: 10, subValues: [], title: 'BH Medical or psychiatric consultation'},
        {code: 'ede2ffe7-ff69-4807-b64e-7d697397c250', subValueCount: 10, subValues: [], title: 'BH Outpatient encounter'},
        {code: '1229a308-6f60-4a18-9519-a3325ca5e90c', subValueCount: 10, subValues: [], title: 'BH Outpatient Psychotherapy'},
        {
            code: '91724ce7-30b0-4a5a-96a1-ba374226dbe9',
            subValueCount: 10,
            subValues: [],
            title: 'Bilateral amputation of leg below or above knee'
        },
        {code: '3d23335b-347c-4465-8f39-1a9ec2e8a47e', subValueCount: 10, subValues: [], title: 'Bilateral Mastectomy'},
        {code: '80dc1ff5-6154-4c33-905d-9873c316a151', subValueCount: 10, subValues: [], title: 'Bilateral Oophorectomy'},
        {code: '907db77f-d34f-4746-a25f-1ac4217889d6', subValueCount: 10, subValues: [], title: 'Bipolar Diagnosis'},
        {code: '97a3bd52-fb7f-46d3-9c25-b3678e19f6b8', subValueCount: 10, subValues: [], title: 'Bipolar Disorder'},
        {code: '0c2a202a-6f07-42de-9c00-20787827acb1', subValueCount: 10, subValues: [], title: 'Birth'},
        {code: '91f8f69e-f27a-4857-b431-a8e45704d4c7', subValueCount: 10, subValues: [], title: 'Birth Trauma or Injuries Group'},
        {code: '33962ac9-b2f2-4283-a2cc-eafea828dc38', subValueCount: 10, subValues: [], title: 'Blood Pressure Visit'},
        {code: '340bb277-dc68-45e7-b762-61a06ed6255e', subValueCount: 10, subValues: [], title: 'BMI Encounter Code Set'},
        {code: '8f617332-84d4-41c5-9e21-71863ed23fd4', subValueCount: 10, subValues: [], title: 'BP Screening Encounter Codes'},
        {code: '2d1969af-3168-4584-8e8b-4846528c28e7', subValueCount: 10, subValues: [], title: 'Bradycardia'},
        {code: '56ce0645-b45e-4c3e-8ee0-2168d82685c2', subValueCount: 10, subValues: [], title: 'Breast Cancer'},
        {code: '575cf5c2-ff4a-410c-91ee-e05ffde6a911', subValueCount: 10, subValues: [], title: 'Breast Cancer ER or PR Positive'},
        {code: '755de1f6-192b-460b-b259-fd1124c3e733', subValueCount: 10, subValues: [], title: 'Breast Cancer Primary Tumor Size T0'},
        {code: '094231df-8811-4101-bd0a-9b5ace5ed2ac', subValueCount: 10, subValues: [], title: 'Breast Cancer Primary Tumor Size T1'},
        {code: '9f5beae3-4ee1-40e0-b7d9-cde76bd0a561', subValueCount: 10, subValues: [], title: 'Breast Cancer Primary Tumor Size T1a'},
        {code: 'd31cd809-c0ab-4900-94b3-9c8cf3b636aa', subValueCount: 10, subValues: [], title: 'Breast Cancer Primary Tumor Size T1b'},
        {code: 'b2b910db-2461-4bf0-aa20-1611af8ddd9d', subValueCount: 10, subValues: [], title: 'Breast Cancer Primary Tumor Size T1c'},
        {code: '7d76c8bb-5017-4eee-9c17-9bac9fcce52a', subValueCount: 10, subValues: [], title: 'Breast Cancer Primary Tumor Size T1mi'},
        {code: 'ae17b37e-bd26-4748-9299-94cfa6bc5dfa', subValueCount: 10, subValues: [], title: 'Breast Cancer Primary Tumor Size T2'},
        {code: '8fe9d342-ed30-4c9a-9386-f88df1b4d352', subValueCount: 10, subValues: [], title: 'Breast Cancer Primary Tumor Size T3'},
        {code: '85512602-a58d-45aa-9346-7339cc32a8ed', subValueCount: 10, subValues: [], title: 'Breast Cancer Primary Tumor Size T4'},
        {
            code: 'b0cd865e-7999-493d-a3eb-917343c8f24c',
            subValueCount: 10,
            subValues: [],
            title: 'Breast Cancer Regional Lymph Node Status N0'
        },
        {
            code: '7a8402b3-24c4-4ded-b942-12beaee0cfc8',
            subValueCount: 10,
            subValues: [],
            title: 'Breast Cancer Regional Lymph Node Status N1'
        },
        {
            code: '3c5d6d6f-3b31-4e21-a12d-42df344f3653',
            subValueCount: 10,
            subValues: [],
            title: 'Breast Cancer Regional Lymph Node Status N2'
        },
        {
            code: '1df422d1-bcdf-44a9-bb12-5e2422a36924',
            subValueCount: 10,
            subValues: [],
            title: 'Breast Cancer Regional Lymph Node Status N3'
        },
        {
            code: '8753a7f4-7886-42f1-9876-8d5b4b5cacdc',
            subValueCount: 10,
            subValues: [],
            title: 'Breast Cancer Regional Lymph Node Status pN1a'
        },
        {
            code: '177fce27-b328-41bc-a988-e8c8c0b52dc1',
            subValueCount: 10,
            subValues: [],
            title: 'Breast Cancer Regional Lymph Node Status pN1b'
        },
        {
            code: 'a3395e5b-27dd-479f-bcfd-5501e577099d',
            subValueCount: 10,
            subValues: [],
            title: 'Breast Cancer Regional Lymph Node Status pN1c'
        },
        {
            code: '3d7d33f3-7e8d-49b2-8cb8-442a7ee5dead',
            subValueCount: 10,
            subValues: [],
            title: 'Breast Cancer Regional Lymph Node Status pN1mi'
        }
    ];
}
