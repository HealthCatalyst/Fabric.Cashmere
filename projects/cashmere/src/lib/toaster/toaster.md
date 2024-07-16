##### Using Toast Messages

Toast messages are an awesome way to provide quick, unobtrusive feedback to the user. They can be used to confirm successful actions, warn of potential issues, and inform the user of errors, among other things.

Following are some guidelines and suggestions for effectively using toasts in your application.

<img src="./assets/usage/toast-diagram.png" height="200px">

### Toast Header
- Always use title case.
- Keep it short. Preferably use 2-3 words, but can use more.
- Don’t use contractions.
- **For success messages**, write the action first, then the object second. *“Saved Job”* instead of *“Job Saved”*
    - Why? In most cases, the user is aware of the object they are interacting with, so the action word ought to go first. That way with the very first word they read, users are likely given all they need to know that what they expected to happen did happen.
- **For error messages**
    - If the error is the direct result of a user action on an object, you can leave off the object name, and then just clarify the type of object in the error message. *“Save Failed”* instead of *“Failed to Save Job”*.
    - If the error isn’t the direct result of a user-triggered action, the name of the object becomes more important to include in the header. As an example, a user navigates to a job page and the page attempts to load job type options but fails to do so. *“Failed to Load Job Types”*.


### Toast Message
- Use sentence case
- Be consistent with the use of punctuation for one-sentence messages (Either do or don’t use it throughout your application). Always use punctuation if there’s more than one sentence.
- Include extra detail that may be helpful to describe what happened
    - If multiple things were impacted
        - Consider including the count of objects affected in numerical form: *”Successfully updated 6 jobs”*
        - Use proper pluralization instead of hardcoding: *”job”* or *“jobs”* instead of *“job(s)”*
    - If one (or just a few) things were impacted, include the name of the thing: *“Successfully updated ‘My Awesome Job’”*

- **For errors**
  - Don’t include technical details that aren’t appropriate or helpful for the audience:
    - *"Unable to connect. Port 5001 seems to be blocked”*
  - Concisely explain the implications:
      - *"Unable to add Job 7 to the queue. Jobs 8 and on will not be run."*
  - Offer remediation steps if available:
      - *"Double check your job settings"* or *"Contact your admin if the problem continues"*

- **More writing tips:**
  - [Check out our UX writing guide](https://cashmere.healthcatalyst.net/content/ux-writing-writing-choices)

### Do I always need a header AND message for my toast?
Nope. You can use just the header or just the message. For cases where there’s one 1-3 words you want to give, just a header would be appropriate. If there are just 4-7 words, a message alone would be appropriate.

If you’re not providing any additional information or clarification, DON’T use both. A bad example- Header: *“Saved Job”* Message: *“The job was saved.”*

If you’re providing more than 5-7 words, you should consider using both header and message so that the user can have a quickly scannable header to help them decide if they want to read on.


### Colors, Ornaments, & Actions
- Green for success
<br>
<img src="./assets/usage/toast-success.png">

- Red for error
<br>
<img src="./assets/usage/toast-error.png">

- Orange for warning
<br>
<img src="./assets/usage/toast-warning.png">

- Blue or white for informational
<br>
<img src="./assets/usage/toast-info.png">

- You can consider adding buttons or links if there's somewhere to navigate, a modal to open, or actions to take. If adding clickable elements to your toast, use a white custom toast
<br>
<img src="./assets/usage/toast-action-1.png">
<br>
<img src="./assets/usage/toast-action-2.png">

- You can consider adding a more specific icon as appropriate
<br>
<img src="./assets/usage/toast-custom-icon.png">

- For long-running, non-blocking actions, consider using a toast with a progress bar.
<br>
<img src="./assets/usage/toast-progress-bar.png">
