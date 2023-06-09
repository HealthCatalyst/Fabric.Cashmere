# Overview

###### Last updated June 9, 2023

:::

##### About

Accessibility is a crucial aspect of modern web design that ensures our products are usable for everyone, including those with disabilities. It encompasses a wide range of practices, guidelines, and techniques, the most important of which we will explore here.

:::

:::

##### Why Accessibility Matters

An underappreciated reason why web accessibility matters is that it benefits everyone—not just users with disabilities. For instance, keyboard navigation is critical for people who cannot use a mouse, such as those with motor impairments or mobility issues. However, power users who prefer the efficiency of keyboard shortcuts also benefit from well-implemented keyboard navigation.

Another vital aspect of web accessibility is readable text and visual design, which is crucial for users with visual impairments, learning disabilities, or cognitive issues. Adequate color contrast, clear and easy-to-read fonts, and consistent layout help these users navigate and comprehend the site effectively. However, even users with perfect 20/20 vision reap the benefits of such design elements—everyone appreciates well-structured and visually appealing content.

Making our products accessible can future-proof them for emerging technologies, ensuring consistency across devices and platforms. Many accessibility best practices also align with other web standards and contribute to improved site performance, code quality, and search engine optimization.

To further exemplify the importance of web accessibility, consider the following scenarios:

1. A visually impaired user relies on a screen reader to navigate a product marketing website but encounters a carousel component that is not keyboard navigable, causing the user to miss out on featured products. Implementing ARIA landmarks and roles for the carousel would improve accessibility and potentially add sales leads.
2. A user with a cognitive disability has difficulty understanding dense blocks of text on a website. By using clear headings and well-structured content, the website becomes more accessible for this user and easier to comprehend for all users, enhancing the overall user experience.
3. A colorblind user struggles to fill out a form on a website because the error messages use color alone to indicate required fields. Ensuring that form feedback incorporates both color and text can enhance accessibility, minimize frustration, and increase form completion rates.

Ensuring an accessible experience is both the right thing to do for your customers with disabilities, and a strategic investment that yields numerous benefits for everyone. Whether it's through improved keyboard navigation, readable text, or visual design, accessible websites deliver more inclusive, user-friendly experiences that encourage repeat visits, increase engagement, and foster a positive brand image. Implementing web accessibility best practices is ultimately a win-win, both for users and website owners.

:::

:::

##### Keyboard Navigation

Keyboard navigation allows users who cannot use a mouse, or prefer not to, to interact with the website efficiently. This includes users with motor impairments, mobility issues, those who use screen readers, and sighted power users.

Key considerations:

* Ensure that all interactive elements, including links, buttons, and form controls, are accessible via the keyboard.
* Use standard HTML elements like anchors and buttons to ensure keyboard compatibility.
* Implement a visual focus indicator to help users track their navigation.
* Avoid using keyboard traps, where users can't escape or navigate away from a particular element using the keyboard alone.
* Test the website's keyboard navigation to ensure a smooth and logical flow through the content.

:::

:::

##### Alternative Text for Images

Alternative text is a brief description of an image or other non-text content that can be read by screen readers. This is essential for users with visual impairments, who rely on alternative text to understand the context of images and other visual elements on a webpage.

Key considerations:

* Provide clear, concise alternative text descriptions for all meaningful images.
* Avoid using phrases like "image of" or "graphic of" in alternative text, as screen readers already announce the presence of an image.
* Purely decorative or redundant images can have empty alt attributes (alt="") to prevent unnecessary clutter in screen readers.
* Ensure that images used as links have alternative text that explains the link's destination or purpose.
* Periodically review and update alternative text to maintain its accuracy and relevance.

:::

:::

##### Accessible Forms

Accessible forms are essential for users with disabilities to interact with websites, especially when providing necessary information such as login credentials, contact details, or purchasing information. An accessible form is not only understandable and usable by screen readers but also adaptable to varying input methods.

Key considerations:
* Explicitly associate form labels with their corresponding input elements using the "for" attribute and matching "id" value.
* Group related form controls using the &lt;fieldset&gt; and &lt;legend&gt; elements.
* Provide clear error messages and guidance for correcting errors during form submission.
* Ensure proper tab order and keyboard navigation within the form, including verifying that the form can be submitted by pressing the return or enter key on the keyboard, when appropriate.
* Implement accessible form validation methods and avoid using CAPTCHAs that rely solely on visual recognition.

:::

:::

##### Readable Text and Visual Design

Readable text and visually clear help ensure users with visual impairments (including older users with lower visual acuity), learning disabilities, or cognitive issues can understand and interact with the content effectively.

Key considerations:
* Use sufficient color contrast between text and background to improve readability.
* Choose an appropriate text size or allow users to adjust the text size based on their preferences.
* Use clear, easy-to-read fonts and avoid complex or overly decorative typography.
* Arrange content in a logical and consistent manner, with proper headings and clearly marked sections.
* Avoid using complex patterns or distracting backgrounds that make the content difficult to read.

:::

:::

##### ARIA (Accessible Rich Internet Applications) Landmarks and Roles

ARIA landmarks and roles provide structural information and meaning to assistive technologies like screen readers, helping users with disabilities navigate and understand the content more effectively. Implementing ARIA landmarks and roles is an essential step in designing accessible web interfaces.

Key considerations:
* Use ARIA landmarks to denote key areas of a webpage, such as navigation, main content, and footer.
* Assign appropriate ARIA roles to elements that do not have a built-in semantic meaning (e.g., custom widgets or complex menus).
* Be cautious with ARIA usage, as improper implementation can negatively impact accessibility.
* Test ARIA implementation with various assistive technologies to ensure compatibility and proper functioning.
* Regularly review and update ARIA landmarks and roles as a website's structure or content changes.
