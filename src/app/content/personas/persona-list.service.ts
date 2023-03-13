import {Injectable} from '@angular/core';
export interface PersonaFile {
    title: string;
    route: string;
    // types are: 'interal' and 'external'
    type: string;
    document: string;
}

@Injectable()
export class PersonaService {
    public personas: PersonaFile[] = [
        {
            title: 'Active Care Management Patient',
            route: 'active-care-management-patient',
            type: 'external',
            document: require('../../../../guides/content/personas/active-care-management-patient.md')
        },
        {
            title: 'Ambulatory Clinician',
            route: 'ambulatory-clinician',
            type: 'external',
            document: require('../../../../guides/content/personas/ambulatory-clinician.md')
        },
        {
            title: 'Ambulatory Nurse',
            route: 'ambulatory-nurse',
            type: 'external',
            document: require('../../../../guides/content/personas/ambulatory-nurse.md')
        },
        {
            title: 'BI Developer',
            route: 'bi-developer',
            type: 'external',
            document: require('../../../../guides/content/personas/bi-developer.md')
        },
        {
            title: 'Biller/Auditor',
            route: 'biller-auditor',
            type: 'external',
            document: require('../../../../guides/content/personas/biller-auditor.md')
        },
        {
            title: 'Care Management Admin',
            route: 'care-management-admin',
            type: 'external',
            document: require('../../../../guides/content/personas/care-management-admin.md')
        },
        {
            title: 'Care Management Director',
            route: 'care-management-director',
            type: 'external',
            document: require('../../../../guides/content/personas/care-management-director.md')
        },
        {
            title: 'Care Team Lead',
            route: 'care-team-lead',
            type: 'external',
            document: require('../../../../guides/content/personas/care-team-lead.md')
        },
        {
            title: 'CDM Workflow User',
            route: 'cdm-workflow-user',
            type: 'external',
            document: require('../../../../guides/content/personas/cdm-workflow-user.md')
        },
        {
            title: 'Chief Population Health Officer',
            route: 'chief-population-health-officer',
            type: 'external',
            document: require('../../../../guides/content/personas/chief-population-health-officer.md')
        },
        {
            title: 'Chief Quality Officer',
            route: 'chief-quality-officer',
            type: 'external',
            document: require('../../../../guides/content/personas/chief-quality-officer.md')
        },
        {
            title: 'Clinical/Quality Data Analyst',
            route: 'clinical-quality-data-analyst',
            type: 'external',
            document: require('../../../../guides/content/personas/clinical-quality-data-analyst.md')
        },
        {
            title: 'Clinical/Quality Researcher',
            route: 'clinical-quality-researcher',
            type: 'external',
            document: require('../../../../guides/content/personas/clinical-quality-researcher.md')
        },
        {
            title: 'Cost Analyst/Accountant',
            route: 'cost-analyst-accountant',
            type: 'external',
            document: require('../../../../guides/content/personas/cost-analyst-accountant.md')
        },
        {
            title: 'Cost Center Manager',
            route: 'cost-center-manager',
            type: 'external',
            document: require('../../../../guides/content/personas/cost-center-manager.md')
        },
        {
            title: 'Cost Management Director',
            route: 'cost-management-director',
            type: 'external',
            document: require('../../../../guides/content/personas/cost-management-director.md')
        },
        {
            title: 'Data Engineer',
            route: 'data-engineer',
            type: 'external',
            document: require('../../../../guides/content/personas/data-engineer.md')
        },
        {
            title: 'Data Steward',
            route: 'data-steward',
            type: 'external',
            document: require('../../../../guides/content/personas/data-steward.md')
        },
        {
            title: 'Health Catalyst Developer',
            route: 'health-catalyst-developer',
            type: 'internal',
            document: require('../../../../guides/content/personas/health-catalyst-developer.md')
        },
        {
            title: 'EDW Manager',
            route: 'edw-manager',
            type: 'external',
            document: require('../../../../guides/content/personas/edw-manager.md')
        },
        {
            title: 'VP, Revenue Cycle',
            route: 'vp-revenue-cycle',
            type: 'external',
            document: require('../../../../guides/content/personas/vp-revenue-cycle.md')
        },
        {
            title: 'Health Catalyst Analytics Director',
            route: 'health-catalyst-analytics-director',
            type: 'internal',
            document: require('../../../../guides/content/personas/health-catalyst-analytics-director.md')
        },
        {
            title: 'Health Catalyst Analytics Engineer',
            route: 'health-catalyst-analytics-engineer',
            type: 'internal',
            document: require('../../../../guides/content/personas/health-catalyst-analytics-engineer.md')
        },
        {
            title: 'Health Catalyst Data Engineer',
            route: 'health-catalyst-data-engineer',
            type: 'internal',
            document: require('../../../../guides/content/personas/health-catalyst-data-engineer.md')
        },
        {
            title: 'Health Catalyst Domain SME',
            route: 'health-catalyst-domain-sme',
            type: 'internal',
            document: require('../../../../guides/content/personas/health-catalyst-domain-sme.md')
        },
        {
            title: 'Health Catalyst Engagement Lead',
            route: 'health-catalyst-engagement-lead',
            type: 'internal',
            document: require('../../../../guides/content/personas/health-catalyst-engagement-lead.md')
        },
        {
            title: 'Health Catalyst Software Engineer',
            route: 'health-catalyst-software-engineer',
            type: 'internal',
            document: require('../../../../guides/content/personas/health-catalyst-software-engineer.md')
        },
        {
            title: 'Health Catalyst Technical Director',
            route: 'health-catalyst-technical-director',
            type: 'internal',
            document: require('../../../../guides/content/personas/health-catalyst-technical-director.md')
        },
        {
            title: 'Healthcare Executive',
            route: 'healthcare-executive',
            type: 'external',
            document: require('../../../../guides/content/personas/healthcare-executive.md')
        },
        {
            title: 'Hospitalist',
            route: 'hospitalist',
            type: 'external',
            document: require('../../../../guides/content/personas/hospitalist.md')
        },
        {
            title: 'Hospital Nurse',
            route: 'hospital-nurse',
            type: 'external',
            document: require('../../../../guides/content/personas/hospital-nurse.md')
        },
        {
            title: 'Inpatient Clinician',
            route: 'inpatient-clinician',
            type: 'external',
            document: require('../../../../guides/content/personas/inpatient-clinician.md')
        },
        {
            title: 'Lead Physician',
            route: 'lead-physician',
            type: 'external',
            document: require('../../../../guides/content/personas/lead-physician.md')
        },
        {
            title: 'Director, Revenue Cycle',
            route: 'director-revenue-cycle',
            type: 'external',
            document: require('../../../../guides/content/personas/director-revenue-cycle.md')
        },
        {
            title: 'Network Administrator',
            route: 'network-administrator',
            type: 'external',
            document: require('../../../../guides/content/personas/network-administrator.md')
        },
        {
            title: 'Nursing Lead',
            route: 'nursing-lead',
            type: 'external',
            document: require('../../../../guides/content/personas/nursing-lead.md')
        },
        {
            title: 'Patient Safety Clinical Investigator',
            route: 'patient-safety-clinical-investigator',
            type: 'external',
            document: require('../../../../guides/content/personas/patient-safety-clinical-investigator.md')
        },
        {
            title: 'Pharmacy CDM Manager',
            route: 'pharmacy-cdm-manager',
            type: 'external',
            document: require('../../../../guides/content/personas/pharmacy-cdm-manager.md')
        },
        {
            title: 'Population Health Analyst',
            route: 'population-health-analyst',
            type: 'external',
            document: require('../../../../guides/content/personas/population-health-analyst.md')
        },
        {
            title: 'Program Director',
            route: 'program-director',
            type: 'external',
            document: require('../../../../guides/content/personas/program-director.md')
        },
        {
            title: 'Revenue Integrity Analyst',
            route: 'revenue-integrity-analyst',
            type: 'external',
            document: require('../../../../guides/content/personas/revenue-integrity-analyst.md')
        },
        {
            title: 'Self-Enrolled Patient',
            route: 'self-enrolled-patient',
            type: 'external',
            document: require('../../../../guides/content/personas/self-enrolled-patient.md')
        },
        {
            title: 'System Administrator',
            route: 'system-administrator',
            type: 'external',
            document: require('../../../../guides/content/personas/system-administrator.md')
        },
        {
            title: 'Vitalware Director of Revenue Integrity',
            route: 'vitalware-director-of-revenue-integrity',
            type: 'internal',
            document: require('../../../../guides/content/personas/vitalware-director-of-revenue-integrity.md')
        },
        {
            title: 'Health Catalyst Vitalware User',
            route: 'health-catalyst-vitalware-user',
            type: 'internal',
            document: require('../../../../guides/content/personas/health-catalyst-vitalware-user.md')
        }
    ];
}
