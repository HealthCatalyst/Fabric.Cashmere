# Deep Linking

###### Last updated November 15, 2021

:::

##### User Context

*Sometimes I want to be able to send a colleague a link to a particular page in the web app we work in, but when I send her the page I am working on, it always links her back to the web app’s homepage.*

:::

:::

##### Explanation

Let’s clarify what we mean by deep linking. We’re talking about two distinct, but deeply interrelated concepts. First, when the user navigates to a new page within the web app, the URL in their address bar changes too. Second, copying and pasting one of these URLs into a new browser window will bring the user back to the same piece of content that they were viewing.

Here are two examples of why deep linking in a web app is important:

- A user on a mobile phone is much more likely to have a spotty internet connection than a user on a desktop computer with a high-speed network connection. When that mobile internet connection fails to load a portion of your web app, the user may need to reload the entire page. If you use deep linking to provide the user with a persistent record of their location within your web app, the user will be able to resume their work without having to re-navigate through your web app.
- A user can share their location within the web app with a colleague and more easily collaborate on a work project.

:::

:::

##### How to Verify Support

For each page of your web app, try reloading the browser. Do you navigate back to the same location that you were viewing before? If so, you’re all set. Otherwise, you’ll need to investigate how to add support for the [History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API), or other similar means of accomplishing this same goal.

:::

:::

##### Next Steps

- [Add navigation with routing, Angular.io](https://angular.io/tutorial/toh-pt5)
- [History API, MDN](https://developer.mozilla.org/en-US/docs/Web/API/History_API)

:::
