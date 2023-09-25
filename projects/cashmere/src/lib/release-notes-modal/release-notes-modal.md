##### Preparing Release Notes

Work with the content writing team to craft your release notes for each release. They can provide you with standardardized HTML that you'll pass into the `notesHTML` property of your configuration data.

#### Recommendations:
1. Break your notes into 2 main sections, "Features & Enhancements" and "Fixes". You can add other sections as needed.
2. Use screenshots and animated gifs liberally.
3. Keep a few prior versions worth of release notes available.

Here's an example of standard release note markup that uses built-in Cashmere styles:

```html
    <!-- New features section. -->
    <h2><i class="hc-ico hc-ico-gift" aria-hidden="true"></i>New Features and Enhancements</h2>
    <hr>
    <h3>Enhanced Patient Portal</h3>
    <p>Patients can now securely access medical records, test results, and appointment history directly from the user-friendly dashboard.</p>
    <!-- Note: images can be base64 encoded. The content team can help with this.-->
    <img width="500" src="/assets/screenshots/release-note-example-1.png" />

    <!-- Bugfix section. -->
    <h2><i class="hc-ico hc-ico-bugfix" aria-hidden="true"></i>Fixes</h2>
    <hr>
    <h3>Diagnosis History</h3>
    <p>In this update, we've resolved a critical bug that was impacting some users' ability to access their diagnosis history.</p>
    <img width="500" src="/assets/screenshots/release-note-example-2.png" />
```
