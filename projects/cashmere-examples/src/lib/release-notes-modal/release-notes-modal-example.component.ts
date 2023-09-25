import {ReleaseNotesService} from '@healthcatalyst/cashmere';
import {Component} from '@angular/core';

/**
 * @title Release Notes Modal
 */
@Component({
    selector: 'hc-release-notes-modal-example',
    templateUrl: 'release-notes-modal-example.component.html'
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
