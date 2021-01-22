import { Injectable } from "@angular/core";

import { IUsage } from './usage';


@Injectable({
    providedIn: 'root'
})
export class UsageService {

    getUsageList(): IUsage[] {
        return [
            {
                "TermID": "1",
                "TermName": "ACA",
                "TermUsage": "Affordable Care Act",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "2",
                "TermName": "ABC ",
                "TermUsage": "activity-based costing (industry term); Activity-Based Costing (Health Catalyst product)",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "3",
                "TermName": "ACO*",
                "TermUsage": "accountable care organization",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "4",
                "TermName": "ATNA",
                "TermUsage": "Audit Trail and Node Authentication",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "5",
                "TermName": "AD&D",
                "TermUsage": "accidental death and dismemberment insurance",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "6",
                "TermName": "AR",
                "TermUsage": "accounts receivable",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "7",
                "TermName": "AAA",
                "TermUsage": "abdominal aortic aneurysm",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "8",
                "TermName": "AABB",
                "TermUsage": "American Association of Blood Banks",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "9",
                "TermName": "AAD",
                "TermUsage": "antibiotic-associated diarrhea",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "10",
                "TermName": "AADE",
                "TermUsage": "American Association of Diabetes Educators",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "11",
                "TermName": "AAMC",
                "TermUsage": "Association of American Medical Colleges",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "12",
                "TermName": "ACC",
                "TermUsage": "American College of Cardiology",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "13",
                "TermName": "ACE",
                "TermUsage": "Acute Care for Elders",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "14",
                "TermName": "ACR",
                "TermUsage": "American College of Radiology",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "15",
                "TermName": "ACS",
                "TermUsage": "acute coronary syndrome",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "16",
                "TermName": "ADA",
                "TermUsage": "American Diabetes Association",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "17",
                "TermName": "ADT",
                "TermUsage": "admission, discharge, and transfer",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "18",
                "TermName": "A-fib*",
                "TermUsage": "atrial fibrillation",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "19",
                "TermName": "AHRQ",
                "TermUsage": "Agency for Healthcare Research and Quality",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "20",
                "TermName": "AKI",
                "TermUsage": "acute kidney injury",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "21",
                "TermName": "ALOS",
                "TermUsage": "average length of stay",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "22",
                "TermName": "AMI",
                "TermUsage": "acute myocardial infarction",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "23",
                "TermName": "anti-Xa",
                "TermUsage": "antifactor Xa assay",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "24",
                "TermName": "APGL",
                "TermUsage": "accounts payable generation ledger",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "25",
                "TermName": "aPTT",
                "TermUsage": "activated partial thromboplastic time",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "26",
                "TermName": "ARNP",
                "TermUsage": "advanced registered nurse practitioner",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "27",
                "TermName": "AUC",
                "TermUsage": "area under the curve",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "28",
                "TermName": "AUROC",
                "TermUsage": "area under the curve of the receiver operating characteristic",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "29",
                "TermName": "BAS",
                "TermUsage": "bleeding avoidance strategies",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "30",
                "TermName": "BI",
                "TermUsage": "business intelligence",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "31",
                "TermName": "BMI",
                "TermUsage": "body mass index",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "32",
                "TermName": "BPA",
                "TermUsage": "best-practice alert",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "33",
                "TermName": "CAD",
                "TermUsage": "coronary artery disease",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "34",
                "TermName": "CABG",
                "TermUsage": "coronary artery bypass grafting",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "35",
                "TermName": "CAHPS®",
                "TermUsage": "Consumer Assessment of Healthcare Providers and Systems",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "36",
                "TermName": "cath lab",
                "TermUsage": "catheterization laboratory",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "37",
                "TermName": "CAUTI",
                "TermUsage": "catheter-associated urinary tract infection",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "38",
                "TermName": "CC",
                "TermUsage": "complications or comorbidities",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "39",
                "TermName": "C-CDA",
                "TermUsage": "consolidated clinical document architecture ",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "40",
                "TermName": "CCI",
                "TermUsage": "Charlson comorbidity index",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "41",
                "TermName": "CDC",
                "TermUsage": "Centers for Disease Control",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "42",
                "TermName": "CDE",
                "TermUsage": "certified diabetic educator",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "43",
                "TermName": "CDI",
                "TermUsage": "clinical documentation improvement",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "44",
                "TermName": "CDIP",
                "TermUsage": "clinical documentation improvement program",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "45",
                "TermName": "CEA",
                "TermUsage": "carotid endarterectomy",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "46",
                "TermName": "CFI",
                "TermUsage": "comparative fit index",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "47",
                "TermName": "CHIP",
                "TermUsage": "Children’s Health Insurance Program",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "48",
                "TermName": "CHM",
                "TermUsage": "confidently held misinformation               ",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "49",
                "TermName": "CHNA",
                "TermUsage": "community health needs assessment",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "50",
                "TermName": "CHR",
                "TermUsage": "community health record (industry term); Community Health Record (Health Catalyst Interop product)",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "51",
                "TermName": "CHW",
                "TermUsage": "community health worker",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "52",
                "TermName": "CIN",
                "TermUsage": "clinically integrated network",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "53",
                "TermName": "CJR",
                "TermUsage": "Comprehensive Care for Joint Replacement",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "54",
                "TermName": "CKD",
                "TermUsage": "chronic kidney disease",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "55",
                "TermName": "CK-MB",
                "TermUsage": "creatine kinase-myocardial band",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "56",
                "TermName": "CLABSI",
                "TermUsage": "central line-associated bloodstream infection",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "57",
                "TermName": "C. diff",
                "TermUsage": "Clostridioides difficile",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "58",
                "TermName": "CHR",
                "TermUsage": "community health record (industry term); Community Health Record (Health Catalyst Interop product)",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "59",
                "TermName": "CM",
                "TermUsage": "care management (industry term); do not use the acronym for the Health Catalyst Care Management offering",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "60",
                "TermName": "CMI",
                "TermUsage": "case-mix index",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "61",
                "TermName": "CMMI",
                "TermUsage": "Centers for Medicare and Medicaid Innovation",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "62",
                "TermName": "CMPI",
                "TermUsage": "community master patient index",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "63",
                "TermName": "CMS",
                "TermUsage": "Center for Medicare and Medicaid Services",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "64",
                "TermName": "COPD",
                "TermUsage": "chronic obstructive pulmonary disease",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "65",
                "TermName": "CPC+",
                "TermUsage": "Comprehensive Primary Care Plus",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "66",
                "TermName": "CPM",
                "TermUsage": "care process model",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "67",
                "TermName": "CPT*",
                "TermUsage": "current procedural terminology",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "68",
                "TermName": "CPGs",
                "TermUsage": "clinical practice guidelines",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "69",
                "TermName": "CRC",
                "TermUsage": "colorectal cancer",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "70",
                "TermName": "C-section*",
                "TermUsage": "cesarean section",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "71",
                "TermName": "CSN",
                "TermUsage": "community staff nurse",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "72",
                "TermName": "CSME",
                "TermUsage": "cost-standardized medical expenses",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "73",
                "TermName": "CV",
                "TermUsage": "Cardiovascular",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "74",
                "TermName": "CVD",
                "TermUsage": "cardiovascular disease",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "75",
                "TermName": "CVP",
                "TermUsage": "central venous pressure",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "76",
                "TermName": "DKA",
                "TermUsage": "diabetic ketoacidosis",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "77",
                "TermName": "DO ",
                "TermUsage": "doctor of osteopathic medicine",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "78",
                "TermName": "DM",
                "TermUsage": "diabetes mellitus",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "79",
                "TermName": "DME",
                "TermUsage": "durable medical equipment",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "80",
                "TermName": "DNFB",
                "TermUsage": "discharged not final billed",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "81",
                "TermName": "DRG",
                "TermUsage": "diagnosis-related group",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "82",
                "TermName": "DSME",
                "TermUsage": "diabetes self-management education",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "83",
                "TermName": "DSRIP",
                "TermUsage": "Delivery System Reform Incentive Payment",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "84",
                "TermName": "DTN",
                "TermUsage": "door-to-needle time",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "85",
                "TermName": "EBDM",
                "TermUsage": "evidence-based decision making",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "86",
                "TermName": "ECF",
                "TermUsage": "extended care facility",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "87",
                "TermName": "eCQMs",
                "TermUsage": "electronic clinical quality measures",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "88",
                "TermName": "ED/ER*",
                "TermUsage": "emergency department (preferred) / emergency room",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "89",
                "TermName": "EHR*",
                "TermUsage": "electronic health record",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "90",
                "TermName": "EMR*",
                "TermUsage": "electronic medical record",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "91",
                "TermName": "EMS",
                "TermUsage": "emergency medical services",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "92",
                "TermName": "EMPI",
                "TermUsage": "enterprise master patient index",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "93",
                "TermName": "ERAS",
                "TermUsage": "enhanced recovery after surgery",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "94",
                "TermName": "ERP",
                "TermUsage": "enhanced recovery program",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "95",
                "TermName": "ESI®",
                "TermUsage": "Emergency Severity Index",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "96",
                "TermName": "ESRD",
                "TermUsage": "end-stage renal disease",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "97",
                "TermName": "EVN (HL7 Segment)",
                "TermUsage": "event type segment",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "98",
                "TermName": "EVS",
                "TermUsage": "environmental services",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "99",
                "TermName": "FCOTS",
                "TermUsage": "first case on-time starts",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "100",
                "TermName": "FFS",
                "TermUsage": "fee-for-service",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "101",
                "TermName": "FHIR®*",
                "TermUsage": "Fast Health Interoperable Resources",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "102",
                "TermName": "FTE",
                "TermUsage": "full-time equivalent",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "103",
                "TermName": "GDP",
                "TermUsage": "gross domestic product",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "104",
                "TermName": "GI",
                "TermUsage": "Gastrointestinal",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "105",
                "TermName": "GL",
                "TermUsage": "general ledger",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "106",
                "TermName": "GMLOS",
                "TermUsage": "geometric mean length of stay",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "107",
                "TermName": "GPRO",
                "TermUsage": "group practice reporting option",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "108",
                "TermName": "HA-CDI",
                "TermUsage": "hospital-acquired Clostridioides difficile infection",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "109",
                "TermName": "HAC",
                "TermUsage": "hospital-acquired condition",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "110",
                "TermName": "HAI",
                "TermUsage": "hospital-acquired infection",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "111",
                "TermName": "HbA1c*",
                "TermUsage": "hemoglobin A1C",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "112",
                "TermName": "HCAI",
                "TermUsage": "healthcare-associated infection",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "113",
                "TermName": "HAPI",
                "TermUsage": "hospital-acquired pressure injury",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "114",
                "TermName": "HAR",
                "TermUsage": "hospital account record",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "115",
                "TermName": "HCC*",
                "TermUsage": "Hierarchical Condition Category",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "116",
                "TermName": "HDHP",
                "TermUsage": "high deductible health plan",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "117",
                "TermName": "HEDIS*",
                "TermUsage": "Healthcare Effectiveness Data and Information Set",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "118",
                "TermName": "HF",
                "TermUsage": "Heart failure",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "119",
                "TermName": "Hgb",
                "TermUsage": "Hemoglobin",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "121",
                "TermName": "HHS",
                "TermUsage": "Department of Health and Human Services",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "122",
                "TermName": "HIE",
                "TermUsage": "health information exchange",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "123",
                "TermName": "HIMSS*",
                "TermUsage": "Healthcare Information and Management Systems Society",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "124",
                "TermName": "HIPPA*",
                "TermUsage": "Health Insurance Portability and Accountability Act",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "125",
                "TermName": "HISP",
                "TermUsage": "Health Information Service Provider",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "126",
                "TermName": "HITECH*",
                "TermUsage": "Health Information Technology for Economic and Clinical Health (HITECH) Act",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "127",
                "TermName": "HL7®*",
                "TermUsage": "Health Level 7",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "128",
                "TermName": "HMO*",
                "TermUsage": "health maintenance organization",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "129",
                "TermName": "HOOS JR",
                "TermUsage": "Hip Disability and Osteoarthritis Outcome Score for Joint Replacement",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "130",
                "TermName": "HQA",
                "TermUsage": "Hospital Quality Alliance",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "131",
                "TermName": "HRRP",
                "TermUsage": "Hospital Readmissions Reduction Program",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "132",
                "TermName": "HAS",
                "TermUsage": "health savings account",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "133",
                "TermName": "HT",
                "TermUsage": "Hypertension",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "134",
                "TermName": "ICD*",
                "TermUsage": "International Classification of Diseases",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "135",
                "TermName": "ICSI",
                "TermUsage": "Institute for Clinical Systems Improvements",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "136",
                "TermName": "ICU*",
                "TermUsage": "intensive care unit",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "137",
                "TermName": "I-CVI",
                "TermUsage": "item-level content validity index",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "138",
                "TermName": "ID",
                "TermUsage": "infectious disease",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "139",
                "TermName": "IDSA",
                "TermUsage": "Infectious Diseases Society of America",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "140",
                "TermName": "INR",
                "TermUsage": "international normalized ratio",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "141",
                "TermName": "IHE",
                "TermUsage": "Integrating the Healthcare Enterprise",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "142",
                "TermName": "IHI*",
                "TermUsage": "Institute for Healthcare Improvement",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "143",
                "TermName": "IP",
                "TermUsage": "infection prevention",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "144",
                "TermName": "IS*",
                "TermUsage": "information systems",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "145",
                "TermName": "IT*",
                "TermUsage": "information technology",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "146",
                "TermName": "IV",
                "TermUsage": "Intravenous",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "147",
                "TermName": "KOOS JR",
                "TermUsage": "Knee Injury and Osteoarthritis Outcome Score for Joint Replacement",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "148",
                "TermName": "KPI",
                "TermUsage": "key performance indicator",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "149",
                "TermName": "L&D*",
                "TermUsage": "labor and delivery",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "150",
                "TermName": "LACE index",
                "TermUsage": "length of stay, acuity of admission, Charlson comorbidity index, and number of emergency department visits in the preceding six months",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "151",
                "TermName": "LBP",
                "TermUsage": "low back pain",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "152",
                "TermName": "LDCT",
                "TermUsage": "low-dose computed tomography",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "153",
                "TermName": "LOINC*",
                "TermUsage": "logical observation identifiers names and codes",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "154",
                "TermName": "LOS",
                "TermUsage": "length of stay",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "155",
                "TermName": "LWBS",
                "TermUsage": "left without being seen",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "156",
                "TermName": "MA",
                "TermUsage": "medical assistant",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "157",
                "TermName": "MACRA*",
                "TermUsage": "Medicare Access and CHIP Reauthorization Act",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "158",
                "TermName": "MAP",
                "TermUsage": "mean arterial pressure",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "159",
                "TermName": "MAT",
                "TermUsage": "medication-assisted treatment",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "160",
                "TermName": "MCC",
                "TermUsage": "major complications or comorbidities",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "161",
                "TermName": "MDM",
                "TermUsage": "medical document management",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "162",
                "TermName": "MD",
                "TermUsage": "doctor of medicine",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "163",
                "TermName": "MedPAC*",
                "TermUsage": "Medicare Payment Advisory Commission",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "164",
                "TermName": "MFM",
                "TermUsage": "maternal fetal medicine",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "165",
                "TermName": "MI",
                "TermUsage": "myocardial infarction",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "166",
                "TermName": "MIPS",
                "TermUsage": "Merit-based Incentive Payment System",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "167",
                "TermName": "MLR",
                "TermUsage": "medical loss ratio",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "168",
                "TermName": "MME",
                "TermUsage": "morphine milligram equivalents",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "169",
                "TermName": "MPAI",
                "TermUsage": "Mayo-Portland Adaptability Inventory",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "170",
                "TermName": "MS",
                "TermUsage": "multiple sclerosis",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "171",
                "TermName": "MS-DRG*",
                "TermUsage": "Medicare severity-diagnosis related group",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "172",
                "TermName": "MSSP*",
                "TermUsage": "Medicare Shared Savings Program",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "173",
                "TermName": "MTM",
                "TermUsage": "medication therapy management",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "174",
                "TermName": "MU",
                "TermUsage": "meaningful use",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "175",
                "TermName": "NAS",
                "TermUsage": "neonatal abstinence syndrome",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "176",
                "TermName": "NCDR",
                "TermUsage": "National Cardiovascular Data Registry",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "177",
                "TermName": "NCQA",
                "TermUsage": "National Committee for Quality Assurance",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "178",
                "TermName": "NHSN",
                "TermUsage": "National Healthcare Safety Network",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "179",
                "TermName": "NICHE",
                "TermUsage": "Nurses Improving Care for Healthsystem Elders",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "180",
                "TermName": "NLP",
                "TermUsage": "natural language processing",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "181",
                "TermName": "NNFI",
                "TermUsage": "non-normed fit index",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "182",
                "TermName": "NP",
                "TermUsage": "nurse practitioner",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "183",
                "TermName": "NPI",
                "TermUsage": "National Provider Identifier (industry term); New Product Introduction (Health Catalyst term)",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "184",
                "TermName": "NPOA",
                "TermUsage": "not present on admission",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "185",
                "TermName": "NPV",
                "TermUsage": "net present value",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "186",
                "TermName": "NTSV",
                "TermUsage": "nulliparous, term, singleton, vertex",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "187",
                "TermName": "OB/GYN*",
                "TermUsage": "obstetrics and gynecology",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "188",
                "TermName": "OIRA",
                "TermUsage": "Outcomes Improvement Readiness Assessment",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "189",
                "TermName": "OR",
                "TermUsage": "operating room",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "190",
                "TermName": "ONC",
                "TermUsage": "Office of National Coordinator for Health Information Technology",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "191",
                "TermName": "PCA",
                "TermUsage": "patient controlled analgesia",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "192",
                "TermName": "PCI",
                "TermUsage": "percutaneous coronary intervention",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "193",
                "TermName": "PCP",
                "TermUsage": "primary care physician",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "194",
                "TermName": "PDCA",
                "TermUsage": "Plan-Do-Check-Act",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "195",
                "TermName": "PDMP",
                "TermUsage": "prescription drug monitoring program",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "196",
                "TermName": "PDSA",
                "TermUsage": "Plan-Do-Study-Act",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "197",
                "TermName": "PHC",
                "TermUsage": "population health coordinator",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "198",
                "TermName": "PHM",
                "TermUsage": "population health management—lowercase when used as a noun; Population Health Management—title case when used to describe the HC offering",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "199",
                "TermName": "PI",
                "TermUsage": "performance improvement",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "200",
                "TermName": "PICU",
                "TermUsage": "pediatric intensive care unit",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "201",
                "TermName": "PIVIEs",
                "TermUsage": "peripheral intravenous infiltrations and extravasations",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "202",
                "TermName": "PKPY",
                "TermUsage": "per thousand members per year",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "203",
                "TermName": "PMP",
                "TermUsage": "prescription monitoring program",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "204",
                "TermName": "PMPM",
                "TermUsage": "per member per month",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "205",
                "TermName": "POA",
                "TermUsage": "present on admission",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "206",
                "TermName": "POAF",
                "TermUsage": "post-operative atrial fibrillation",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "207",
                "TermName": "Pop Health",
                "TermUsage": "population health",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "208",
                "TermName": "PPO*",
                "TermUsage": "preferred provider organization",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "209",
                "TermName": "PPRs",
                "TermUsage": "potentially preventable readmissions",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "210",
                "TermName": "PQRS",
                "TermUsage": "Physician Quality Reporting System",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "211",
                "TermName": "PROMIS",
                "TermUsage": "participant-reported outcomes measurement information systems",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "212",
                "TermName": "PROMs",
                "TermUsage": "patient-reported outcome measures",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "213",
                "TermName": "PSI",
                "TermUsage": "patient safety indicator",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "214",
                "TermName": "PTT",
                "TermUsage": "partial thromboplastin time",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "215",
                "TermName": "QI",
                "TermUsage": "quality improvement",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "216",
                "TermName": "QOL",
                "TermUsage": "quality of life",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "217",
                "TermName": "qSOFA",
                "TermUsage": "quick sequential organ failure assessment",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "218",
                "TermName": "RAF",
                "TermUsage": "risk adjustment factor",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "219",
                "TermName": "RBC",
                "TermUsage": "red blood cell",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "220",
                "TermName": "RCC",
                "TermUsage": "ratio of costs-to-charge",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "221",
                "TermName": "REAL",
                "TermUsage": "race, ethnicity, and language",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "222",
                "TermName": "RFP",
                "TermUsage": "request for proposal",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "223",
                "TermName": "RMSEA",
                "TermUsage": "root mean square error of approximation",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "224",
                "TermName": "RN*",
                "TermUsage": "registered nurse",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "225",
                "TermName": "ROI*",
                "TermUsage": "return on investment",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "226",
                "TermName": "RVUs",
                "TermUsage": "relative value units",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "227",
                "TermName": "SCIM",
                "TermUsage": " Spinal Cord Independence Measure",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "228",
                "TermName": "S-CVI",
                "TermUsage": "scale content validity index",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "229",
                "TermName": "ScVO2",
                "TermUsage": "central venous oxygen saturation",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "230",
                "TermName": "SDoH",
                "TermUsage": "social determinants of health",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "231",
                "TermName": "SIR",
                "TermUsage": "standardized infection ratio",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "232",
                "TermName": "SIRS",
                "TermUsage": "systemic inflammatory response syndrome",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "233",
                "TermName": "SNF*",
                "TermUsage": "skilled nursing facility",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "234",
                "TermName": "SNOMED",
                "TermUsage": "Systematized Nomenclature of Medicine",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "235",
                "TermName": "SOFA",
                "TermUsage": "sequential organ failure assessment",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "236",
                "TermName": "SSE",
                "TermUsage": "serious safety event",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "237",
                "TermName": "SSI",
                "TermUsage": "surgical site infection",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "238",
                "TermName": "STD",
                "TermUsage": "short-term disability",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "239",
                "TermName": "STEMI",
                "TermUsage": "ST-elevation myocardial infarction",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "240",
                "TermName": "SubQ",
                "TermUsage": "Subcutaneous",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "241",
                "TermName": "TAVR",
                "TermUsage": "transcatheter aortic valve replacement",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "242",
                "TermName": "TBI",
                "TermUsage": "traumatic brain injury",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "243",
                "TermName": "TF",
                "TermUsage": "Transfemoral",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "244",
                "TermName": "THA",
                "TermUsage": "total hip arthroplasty",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "245",
                "TermName": "TJC",
                "TermUsage": "The Joint Commission",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "246",
                "TermName": "TKA",
                "TermUsage": "total knee arthroplasty",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "247",
                "TermName": "TME",
                "TermUsage": "total medical expense",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "248",
                "TermName": "tPA",
                "TermUsage": "tissue plasminogen activator",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "249",
                "TermName": "TSH",
                "TermUsage": "thyroid-stimulating hormone",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "250",
                "TermName": "UA",
                "TermUsage": "Urinalysis",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "251",
                "TermName": "UM",
                "TermUsage": "utilization management",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "252",
                "TermName": "UTI",
                "TermUsage": "urinary tract infection",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "253",
                "TermName": "VAP",
                "TermUsage": "ventilator associated pneumonia",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "254",
                "TermName": "VBP",
                "TermUsage": "value-based purchasing or value-based payment",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "255",
                "TermName": "VTE",
                "TermUsage": "venous thromboembolism",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "256",
                "TermName": "WHPUOS",
                "TermUsage": "work hours per units of service",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "257",
                "TermName": "wRVUs",
                "TermUsage": "work relative value units",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "258",
                "TermName": "XCA",
                "TermUsage": "cross-community access",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "259",
                "TermName": "XCPD",
                "TermUsage": "cross-community patient discovery",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "260",
                "TermName": "XDS",
                "TermUsage": "cross-enterprise document sharing",
                "TermType": "Abbreviation",
                "TermCategories": "Industry; Clinical",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "261",
                "TermName": "ABC ",
                "TermUsage": "activity-based costing (industry term); Activity-Based Costing (Health Catalyst product)",
                "TermType": "Abbreviation",
                "TermCategories": "Health Catalyst",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "262",
                "TermName": "AD ",
                "TermUsage": "analytics director",
                "TermType": "Abbreviation",
                "TermCategories": "Health Catalyst",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "263",
                "TermName": "AE        ",
                "TermUsage": "analytics engineer",
                "TermType": "Abbreviation",
                "TermCategories": "Health Catalyst",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "264",
                "TermName": "ASB",
                "TermUsage": "applications suite business",
                "TermType": "Abbreviation",
                "TermCategories": "Health Catalyst",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "265",
                "TermName": "ASO",
                "TermUsage": "analytics services organization",
                "TermType": "Abbreviation",
                "TermCategories": "Health Catalyst",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "266",
                "TermName": "ATM",
                "TermUsage": "all team meeting",
                "TermType": "Abbreviation",
                "TermCategories": "Health Catalyst",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "267",
                "TermName": "CAP",
                "TermUsage": "Catalyst Analytics Platform; precursor to DOS; no longer in use",
                "TermType": "Abbreviation",
                "TermCategories": "Health Catalyst",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "268",
                "TermName": "CIS",
                "TermUsage": "clinical implementation specialist",
                "TermType": "Abbreviation",
                "TermCategories": "Health Catalyst",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "269",
                "TermName": "CORUS™",
                "TermUsage": "Clinical Operations Resources Utilization System (a Health Catalyst product suite); do not spell out; use trademarked acronym on first or most prominent mention. ",
                "TermType": "Abbreviation",
                "TermCategories": "Health Catalyst",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "270",
                "TermName": "CSL",
                "TermUsage": "client success leader",
                "TermType": "Abbreviation",
                "TermCategories": "Health Catalyst",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "271",
                "TermName": "DA",
                "TermUsage": "data architect",
                "TermType": "Abbreviation",
                "TermCategories": "Health Catalyst",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "272",
                "TermName": "DGX",
                "TermUsage": "data governance and exploration team",
                "TermType": "Abbreviation",
                "TermCategories": "Health Catalyst",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "273",
                "TermName": "DOS™",
                "TermUsage": "Data Operating System (a Health Catalyst product); spell out with trademarked acronym in parentheses on first use, i.e., Data Operating System (DOS™); use DOS platform on subsequent uses",
                "TermType": "Abbreviation",
                "TermCategories": "Health Catalyst",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "274",
                "TermName": "EAG",
                "TermUsage": "executive advisory group",
                "TermType": "Abbreviation",
                "TermCategories": "Health Catalyst",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "275",
                "TermName": "EL",
                "TermUsage": "engagement lead, in professional services (no longer in use, now CSL); engineering lead, in technology ",
                "TermType": "Abbreviation",
                "TermCategories": "Health Catalyst",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "276",
                "TermName": "ELT           ",
                "TermUsage": "extended leadership team",
                "TermType": "Abbreviation",
                "TermCategories": "Health Catalyst",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "277",
                "TermName": "ESPP",
                "TermUsage": "employee stock purchase plan",
                "TermType": "Abbreviation",
                "TermCategories": "Health Catalyst",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "278",
                "TermName": "HAS®",
                "TermUsage": "Healthcare Analytics Summit™; leave a space between “HAS” and the year and don’t use an apostrophe, e.g., “HAS 20”",
                "TermType": "Abbreviation",
                "TermCategories": "Health Catalyst",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "279",
                "TermName": "HCAT",
                "TermUsage": "Health Catalyst stock symbol",
                "TermType": "Abbreviation",
                "TermCategories": "Health Catalyst",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "280",
                "TermName": "HCU",
                "TermUsage": "Health Catalyst University           ",
                "TermType": "Abbreviation",
                "TermCategories": "Health Catalyst",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "281",
                "TermName": "IDEA",
                "TermUsage": "Instant Data Entry Application",
                "TermType": "Abbreviation",
                "TermCategories": "Health Catalyst",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "282",
                "TermName": "KPA",
                "TermUsage": "Key Process Analysis",
                "TermType": "Abbreviation",
                "TermCategories": "Health Catalyst",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "283",
                "TermName": "LT",
                "TermUsage": "leadership team/executive team",
                "TermType": "Abbreviation",
                "TermCategories": "Health Catalyst",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "284",
                "TermName": "MQL",
                "TermUsage": "marketing qualified lead",
                "TermType": "Abbreviation",
                "TermCategories": "Health Catalyst",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "285",
                "TermName": "MVP",
                "TermUsage": "minimum viable product",
                "TermType": "Abbreviation",
                "TermCategories": "Health Catalyst",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "286",
                "TermName": "NPI",
                "TermUsage": "National Provider Identifier (industry term); New Product Introduction (Health Catalyst term)",
                "TermType": "Abbreviation",
                "TermCategories": "Health Catalyst",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "287",
                "TermName": "OPM",
                "TermUsage": "operations and performance management",
                "TermType": "Abbreviation",
                "TermCategories": "Health Catalyst",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "288",
                "TermName": "PDLC",
                "TermUsage": "product development lifecycle",
                "TermType": "Abbreviation",
                "TermCategories": "Health Catalyst",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "289",
                "TermName": "PM",
                "TermUsage": "product/program/project manager",
                "TermType": "Abbreviation",
                "TermCategories": "Health Catalyst",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "290",
                "TermName": "POPS",
                "TermUsage": "people operations/human resources",
                "TermType": "Abbreviation",
                "TermCategories": "Health Catalyst",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "291",
                "TermName": "POPSBP/HRBP",
                "TermUsage": "people operations/human resources business partner",
                "TermType": "Abbreviation",
                "TermCategories": "Health Catalyst",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "292",
                "TermName": "PS",
                "TermUsage": "professional services",
                "TermType": "Abbreviation",
                "TermCategories": "Health Catalyst",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "293",
                "TermName": "PSQM",
                "TermUsage": "professional services quarterly meeting ",
                "TermType": "Abbreviation",
                "TermCategories": "Health Catalyst",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "294",
                "TermName": "Q&A",
                "TermUsage": "Queers and Allies Affinity Group",
                "TermType": "Abbreviation",
                "TermCategories": "Health Catalyst",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "295",
                "TermName": "RSAE",
                "TermUsage": "regional sr. account executive",
                "TermType": "Abbreviation",
                "TermCategories": "Health Catalyst",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "296",
                "TermName": "RWI",
                "TermUsage": "result with improvement",
                "TermType": "Abbreviation",
                "TermCategories": "Health Catalyst",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "297",
                "TermName": "SAE",
                "TermUsage": "sr. account executive",
                "TermType": "Abbreviation",
                "TermCategories": "Health Catalyst",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "298",
                "TermName": "SAM",
                "TermUsage": "subject area mart",
                "TermType": "Abbreviation",
                "TermCategories": "Health Catalyst",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "299",
                "TermName": "SAMD",
                "TermUsage": "Subject Area Mart Designer/SAM Designer",
                "TermType": "Abbreviation",
                "TermCategories": "Health Catalyst",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "300",
                "TermName": "SCSL",
                "TermUsage": "senior client success leader",
                "TermType": "Abbreviation",
                "TermCategories": "Health Catalyst",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "301",
                "TermName": "SM",
                "TermUsage": "source mart",
                "TermType": "Abbreviation",
                "TermCategories": "Health Catalyst",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "302",
                "TermName": "SMD",
                "TermUsage": "Source Mart Designer",
                "TermType": "Abbreviation",
                "TermCategories": "Health Catalyst",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "303",
                "TermName": "SME",
                "TermUsage": "subject matter expert",
                "TermType": "Abbreviation",
                "TermCategories": "Health Catalyst",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "304",
                "TermName": "SQL",
                "TermUsage": "sales qualified lead (Health Catalyst term); structured query language (technical term)",
                "TermType": "Abbreviation",
                "TermCategories": "Health Catalyst",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "305",
                "TermName": "TD",
                "TermUsage": "technical director",
                "TermType": "Abbreviation",
                "TermCategories": "Health Catalyst",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "306",
                "TermName": "TM",
                "TermUsage": "team member",
                "TermType": "Abbreviation",
                "TermCategories": "Health Catalyst",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "307",
                "TermName": "TMUT",
                "TermUsage": "telemetry server, based in UT",
                "TermType": "Abbreviation",
                "TermCategories": "Health Catalyst",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "308",
                "TermName": "WE",
                "TermUsage": "Women Empowered Affinity Group",
                "TermType": "Abbreviation",
                "TermCategories": "Health Catalyst",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "309",
                "TermName": "ADO ",
                "TermUsage": "Azure DevOps",
                "TermType": "Abbreviation",
                "TermCategories": "Technical ",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "310",
                "TermName": "AI ",
                "TermUsage": "artificial intelligence",
                "TermType": "Abbreviation",
                "TermCategories": "Technical ",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "311",
                "TermName": "API ",
                "TermUsage": "application programming interface",
                "TermType": "Abbreviation",
                "TermCategories": "Technical ",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "312",
                "TermName": "CCB",
                "TermUsage": "change control board",
                "TermType": "Abbreviation",
                "TermCategories": "Technical ",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "313",
                "TermName": "CCF",
                "TermUsage": "change control form",
                "TermType": "Abbreviation",
                "TermCategories": "Technical ",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "314",
                "TermName": "CDP",
                "TermUsage": "continuous delivery process ",
                "TermType": "Abbreviation",
                "TermCategories": "Technical ",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "315",
                "TermName": "CLU",
                "TermUsage": "competency learning unit           ",
                "TermType": "Abbreviation",
                "TermCategories": "Technical ",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "316",
                "TermName": "DEE",
                "TermUsage": "data-entry entity",
                "TermType": "Abbreviation",
                "TermCategories": "Technical ",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "317",
                "TermName": "DCO",
                "TermUsage": "data center operations",
                "TermType": "Abbreviation",
                "TermCategories": "Technical ",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "318",
                "TermName": "DIL",
                "TermUsage": "developers integration lab",
                "TermType": "Abbreviation",
                "TermCategories": "Technical ",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "319",
                "TermName": "DMCM/DCM",
                "TermUsage": "data mart configuration manager",
                "TermType": "Abbreviation",
                "TermCategories": "Technical ",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "320",
                "TermName": "DMD",
                "TermUsage": "data mart designer",
                "TermType": "Abbreviation",
                "TermCategories": "Technical ",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "321",
                "TermName": "DSS",
                "TermUsage": "diagnostic service section ",
                "TermType": "Abbreviation",
                "TermCategories": "Technical ",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "322",
                "TermName": "DTS",
                "TermUsage": "date time stamp",
                "TermType": "Abbreviation",
                "TermCategories": "Technical ",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "323",
                "TermName": "DPE",
                "TermUsage": "data processing engine",
                "TermType": "Abbreviation",
                "TermCategories": "Technical ",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "324",
                "TermName": "DPR",
                "TermUsage": "delivery preference router",
                "TermType": "Abbreviation",
                "TermCategories": "Technical ",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "325",
                "TermName": "DPS",
                "TermUsage": "data processing service",
                "TermType": "Abbreviation",
                "TermCategories": "Technical ",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "326",
                "TermName": "EDI",
                "TermUsage": "electronic data interface ",
                "TermType": "Abbreviation",
                "TermCategories": "Technical ",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "327",
                "TermName": "EDW",
                "TermUsage": "enterprise data warehouse",
                "TermType": "Abbreviation",
                "TermCategories": "Technical ",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "328",
                "TermName": "EDX",
                "TermUsage": "event driven execution",
                "TermType": "Abbreviation",
                "TermCategories": "Technical ",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "329",
                "TermName": "ETL",
                "TermUsage": "extract, transform, and load",
                "TermType": "Abbreviation",
                "TermCategories": "Technical ",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "330",
                "TermName": "IA",
                "TermUsage": "Integration Analysis",
                "TermType": "Abbreviation",
                "TermCategories": "Technical ",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "331",
                "TermName": "ICOF",
                "TermUsage": "interface order form",
                "TermType": "Abbreviation",
                "TermCategories": "Technical ",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "332",
                "TermName": "IIS",
                "TermUsage": "Internet Information Services",
                "TermType": "Abbreviation",
                "TermCategories": "Technical ",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "333",
                "TermName": "JSON",
                "TermUsage": "JavaScript Object Notation",
                "TermType": "Abbreviation",
                "TermCategories": "Technical ",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "334",
                "TermName": "LE",
                "TermUsage": "learning engineer            ",
                "TermType": "Abbreviation",
                "TermCategories": "Technical ",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "335",
                "TermName": "LMS",
                "TermUsage": "learning management system    ",
                "TermType": "Abbreviation",
                "TermCategories": "Technical ",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "336",
                "TermName": "MDN",
                "TermUsage": "message disposition notifications",
                "TermType": "Abbreviation",
                "TermCategories": "Technical ",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "337",
                "TermName": "MDS",
                "TermUsage": "metadata service",
                "TermType": "Abbreviation",
                "TermCategories": "Technical ",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "338",
                "TermName": "NPE",
                "TermUsage": "non-persisted entity",
                "TermType": "Abbreviation",
                "TermCategories": "Technical ",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "339",
                "TermName": "OEV",
                "TermUsage": "overriding extension view",
                "TermType": "Abbreviation",
                "TermCategories": "Technical ",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "340",
                "TermName": "OPM",
                "TermUsage": "operations and performance management",
                "TermType": "Abbreviation",
                "TermCategories": "Technical ",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "341",
                "TermName": "ORU",
                "TermUsage": "observation result",
                "TermType": "Abbreviation",
                "TermCategories": "Technical ",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "342",
                "TermName": "P&R",
                "TermUsage": "provide and register",
                "TermType": "Abbreviation",
                "TermCategories": "Technical ",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "343",
                "TermName": "PARMS",
                "TermUsage": "Performance, Availability, Reliability, Maintainability, and Scalability",
                "TermType": "Abbreviation",
                "TermCategories": "Technical ",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "344",
                "TermName": "PBI",
                "TermUsage": "Product Backlog Item",
                "TermType": "Abbreviation",
                "TermCategories": "Technical ",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "345",
                "TermName": "Prod Environment",
                "TermUsage": "production environment",
                "TermType": "Abbreviation",
                "TermCategories": "Technical ",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "346",
                "TermName": "Q&R",
                "TermUsage": "query and retrieve",
                "TermType": "Abbreviation",
                "TermCategories": "Technical ",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "347",
                "TermName": "QA Environment",
                "TermUsage": "quality assurance environment",
                "TermType": "Abbreviation",
                "TermCategories": "Technical ",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "348",
                "TermName": "RCA",
                "TermUsage": "root cause analysis",
                "TermType": "Abbreviation",
                "TermCategories": "Technical ",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "349",
                "TermName": "REPO",
                "TermUsage": "Repository",
                "TermType": "Abbreviation",
                "TermCategories": "Technical ",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "350",
                "TermName": "RIM",
                "TermUsage": "reference information model",
                "TermType": "Abbreviation",
                "TermCategories": "Technical ",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "351",
                "TermName": "RLS",
                "TermUsage": "Record Locator Service",
                "TermType": "Abbreviation",
                "TermCategories": "Technical ",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "352",
                "TermName": "RLS",
                "TermUsage": "Row-Level Security ",
                "TermType": "Abbreviation",
                "TermCategories": "Technical ",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "353",
                "TermName": "RN",
                "TermUsage": "release notes ",
                "TermType": "Abbreviation",
                "TermCategories": "Technical ",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "354",
                "TermName": "RMI",
                "TermUsage": "record management index",
                "TermType": "Abbreviation",
                "TermCategories": "Technical ",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "355",
                "TermName": "RTO",
                "TermUsage": "recovery time objective or release to operations",
                "TermType": "Abbreviation",
                "TermCategories": "Technical ",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "356",
                "TermName": "SAS",
                "TermUsage": "shared access signature",
                "TermType": "Abbreviation",
                "TermCategories": "Technical ",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "357",
                "TermName": "SQL",
                "TermUsage": "sales qualified lead (Health Catalyst term); structured query language (technical term)",
                "TermType": "Abbreviation",
                "TermCategories": "Technical ",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "358",
                "TermName": "SSIS",
                "TermUsage": "SQL server integration services",
                "TermType": "Abbreviation",
                "TermCategories": "Technical ",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "359",
                "TermName": "UE",
                "TermUsage": "universal entity",
                "TermType": "Abbreviation",
                "TermCategories": "Technical ",
                "TermDateAdded": "1/12/21"
            },
            {
                "TermID": "360",
                "TermName": "UML",
                "TermUsage": "unified modeling language",
                "TermType": "Abbreviation",
                "TermCategories": "Technical ",
                "TermDateAdded": "1/12/21"
            }
        ];
    }
}