import {ReleaseNotesService} from '@healthcatalyst/cashmere';
import {Component} from '@angular/core';

/**
 * @title Release Notes Modal
 */
@Component({
    selector: 'hc-release-notes-modal-example',
    templateUrl: 'release-notes-modal-example.component.html',
    standalone: false
})
export class ReleaseNotesModalExampleComponent {
    constructor(private releaseNoteService: ReleaseNotesService) {}

    open(): void {
        this.releaseNoteService.open(releaseNotesData);
    }
}

/** You will likely load the release notes in from the DB, or pull them in from resource JSON files. */
const releaseNotesData = {
    appName: 'Cashmere',
    headerLinkUrl: 'https://community.healthcatalyst.com/',
    headerLinkUrlText: 'More on HC Community',
    releaseNotes: [
        {
            version: '1.2.0',
            releaseMonth: 7,
            releaseYear: 2023,
            releaseDay: 15,
            notesHTML: `<h2><i class="hc-ico hc-ico-gift" aria-hidden="true"></i>New Features and Enhancements</h2>
            <hr>
            <h3>AI-Powered Forecasting (BETA)</h3>
            <p>Introducing AI-powered forecasting, available on most chart types. Forecast in the line chart below is represented by the dotted line, and you can hover for more detail.</p>
            <img width="500" src="/assets/screenshots/chart-forecast-screencap.gif" />
            <h3>Enhanced Patient Portal</h3>
            <p>Patients can now securely access their medical records, test results, and appointment history directly from the user-friendly dashboard.
            </p>
            <h2><i class="hc-ico hc-ico-bugfix" aria-hidden="true"></i>Fixes</h2>
            <hr>
            <h3>Diagnosis History</h3>
            <p>In this update, we've resolved a critical bug that was impacting some users' ability to access their diagnosis history.</p>
            <img width="500" src="/assets/screenshots/diagnosis-screenshot.png" />
            <h2><i class="hc-ico hc-ico-cog" aria-hidden="true"></i>Feature Flag Deprecation Notice</h2>
            <hr>
            <p>The following feature flags have been deprecated and will be removed in this release. These features will now be turned on for ALL users.</p>
            <ul>
            <li>Sharing widgets</li>
            <li>New user selection menu</li>
            <li>Optimized configuration save</li>
            <li>AI-powered medication thesarus</li>
            <li>Notification history</li>
            </ul>`
        },
        {
            version: '1.1.3',
            releaseMonth: 7,
            releaseYear: 2023,
            releaseDay: 15,
            isOpen: true,
            notesHTML: `<h2 id="8"><i class="fa-solid fa-bullhorn" aria-hidden="true"></i>New Features and Enhancements</h2>
            <hr>
            <h3 id="12">Security</h3>
            <h4 id="15">Ignite UI role-based access to modules</h4>
            <p>Role-based access to individual modules in Ignite UI is now supported. Roles can be assigned to groups or individual users. To access a module in Ignite UI, users must be assigned the corresponding role. The roles are as follows:</p>
            <table style="width:100%; text-align:left">
              <tr>
                <th width="20%"><p><strong>Role</strong></p></th>
                <th width="30%"><p><strong>Ignite UI Module Access</strong></p></th>
                <th><p><strong>Permissions Granted</strong></p></th>
              </tr>
              <tr>
                <td><p>Ignite UI Admin</p></td>
                <td><p>Admin &gt; Ignite UI Access</p><p>Admin &gt; Co-Branding</p></td>
                <td><p>Assign Ignite UI roles; manage UI colors and logo</p></td>
              </tr>
              <tr>
                <td><p>Sources User</p></td>
                <td><p>Platform &gt; Sources</p>
                    <p>Platform &gt; Schedules</p>
                </td>
                <td><p>Manage sources, source entities, ingestion jobs, and schedules</p></td>
              </tr>
              <tr>
                <td><p>Monitoring User</p></td>
                <td><p>Platform &gt; Monitoring</p></td>
                <td><p>View monitoring reports for source ingests, data mart and EDC data loads</p></td>
              </tr>
              <tr>
                <td><p>IDEA User</p></td>
                <td><p>Data tab</p></td>
                <td><p>Access Ignite Data Entry Application (IDEA); <a href="https://docs.healthcatalyst.com/ignite/articles/data-entry/manage-permissions/data-entry-permissions-overview.html" target=_blank>IDEA-specific permissions</a> required also to create or work in IDEA applications</p></td>
              </tr>
            </table>
            <p>Users with the Ignite UI Admin role can assign roles through the new <strong>Admin</strong> &gt; <strong>Ignite UI Access</strong> page. To request access to a module, contact your technical director. </p><div style="margin-top:14px;margin-bottom:14px;"><img width="500" src="/assets/screenshots/diagnosis-screenshot.png" /><br> </div>
            <p>Detailed instructions for using this feature are in the <a href="https://docs.healthcatalyst.com/ignite/articles/security/manage-access-ignite-ui.html" target=_blank>Ignite user documentation</a>.</p>
            <h3 id="21">Notes</h3>
            <ul>
                <li>To receive access permissions based on group membership, individual users first must be added to the group in your organization's identity provider. </li>
            <li>When assigning a role to a group, enter the group name exactly as it appears in your identity provider, including any spaces or punctuation. </li>
            <li>Individual users can view a list of their groups by following the instructions in <a href="https://docs.healthcatalyst.com/ignite/articles/view-security-roles.html" target=_blank>View Your Assigned Security Roles</a> in the Ignite user documentation. </li>
                 </ul>
            <h3 id="25">Source Ingestion</h3>
            <h4 id="28">Flat file ingestion: Remove files from source directory after successful ingestion</h4>
            <p>This update enables users to configure flat file ingestion jobs to automatically remove the source file after the data contained in the file is ingested. This feature saves storage space in source systems.</p>
            <p>To use this feature, adjust ingestion jobs in the configDB by setting a Boolean value for <code>remove_files</code> on the <code>tenant_ingestion</code> tables. If the value is <b>True</b>, source files are deleted after the Azure Data Factory flat file ingestion occurs. The default selection is <b>False</b>, which does not remove files from the source.</p>
            <p><strong>Note:</strong> This feature is not yet available in Ignite UI.</p>
            <h2 id="40"><i class="fa-solid fa-bug" aria-hidden="true"></i> Fixes</h2>
            <hr>
            <div class="group" data-node="10">
            <h3 id="45">Source Ingestion</h3>
            <h4 id="48">Source-triggered ingestion jobs failing</h4>
            <p>Source-triggered jobs no longer fail as a result of the recently added job parameter that allows for setting a custom timeout for queries running against source systems. The parameter is now included on source-triggered jobs.</p>
            </div>
            <div class="group" data-node="10">
            <h3 id="56">Monitoring</h3>
            <h4 id="59">Source Monitoring reports for jobs with zero row counts</h4>
            <p>The Source Monitoring report no longer incorrectly flags ingestion jobs as failed when the row count is zero.</p>
            </div>`
        },
        {
            version: '1.1.2',
            releaseMonth: 6,
            releaseYear: 2023,
            notesHTML: `<h2><i class="hc-ico hc-ico-bugfix" aria-hidden="true"></i>Fixes</h2>
            <hr>
            <h3>Sync Data Error</h3>
            <p>A synchronization bug between the web app and our database occasionally resulted in outdated patient data being displayed to healthcare providers.</p>
            `
        },
        {
            version: '1.1.1',
            releaseMonth: 5,
            releaseYear: 2023,
            notesHTML: `<h2><i class="hc-ico hc-ico-bugfix" aria-hidden="true"></i>Fixes</h2>
            <hr>
            <h3>Errant Appointment Alerts</h3>
            <p>Some users reported receiving appointment reminders with incorrect dates and times. Appointment reminders will now accurately reflect the date and time of the scheduled appointments, helping patients and healthcare providers maintain an organized and efficient appointment schedule.</p>
            `
        },
        {
            version: '1.1.0',
            releaseMonth: 4,
            releaseYear: 2023,
            notesHTML: `<h2><i class="hc-ico hc-ico-gift" aria-hidden="true"></i>New Features and Enhancements</h2>
            <hr>
            <h3>Electronic Prescription</h3>
            <p>Streamline the prescription process with electronic prescriptions that are sent directly to the patient's preferred pharmacy.
            Reduce errors and improve medication management.</p>
            <h3>Multi-Language Support</h3>
            <p>To accommodate a diverse patient population, our application now supports multiple languages, making healthcare information more accessible to all.</p>
            <h3>Improved Analytics Dashboard</h3>
            <p>Healthcare administrators and providers have access to an enhanced analytics dashboard to monitor patient data, track outcomes, and make data-driven decisions.</p>
            <h2><i class="hc-ico hc-ico-bugfix" aria-hidden="true"></i>Fixes</h2>
            <hr>
            <h3>Appointment History</h3>
            <p>In this update, we've resolved a critical bug that was impacting some users' ability to access their appointment history.</p>
            `
        },
        {
            version: '1.0.1',
            notesHTML: `<h2><i class="hc-ico hc-ico-bugfix" aria-hidden="true"></i>Fixes</h2>
            <hr>
            <h3>Patient Registration Error</h3>
            <p>In rare cases, users were unable to register a new account if they'd only visited our Downtown Madison Ave location. This has been resolved.</p>
            `,
            releaseMonth: 3,
            releaseYear: 2023
        }
    ]
};
