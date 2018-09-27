# User Feedback Guide

###### Last updated May 21, 2018

:::

##### Overview

The purpose of this guide is to explain the methodologies and mechanisms for gathering qualitative user feedback. It will also provide general templates for body copy that can be used for user prompts.
:::

:::

##### Why Collect User Feedback?

Implementing a feedback mechanism into the product is critical to continually striving to build a better product that best meets the needs of your users. It is important to have a couple different feedback mechanisms within a product, including a volunteered mechanism (where they can click on “Give Feedback” from the Help menu or somewhere else) and a timed mechanism (a pop up that appears in the product on some cadence such as every X number of logins). These can be the same questions or different ones. In addition, users can be invited to provide feedback via email by providing a link to the same survey as the in-page popup survey. This is more personal and can yield higher response rates in certain situations.
:::

:::

##### Qualitative Feedback vs. Quantitative Telemetry

Quantitative usage metrics and qualitative customer satisfaction data are complimentary and should be used hand in hand. The usage data helps us understand the overall volume of use as well as what aspects/features of the product are being used and how. Qualitative data can help fill in the “why” behind quantitative metrics.
:::

:::

##### User Satisfaction

After a user has had enough time to explore and utilize the product, they will then be able to provide a meaningful satisfaction rating (asking too soon will yield inaccurate results). A 7 point scale is often used to gauge user satisfaction, and many also opt for a 9 or 11 point scale. The scale you choose comes down to a tradeoff between ease of use for the respondent (generally it’s easier to answer on a 7 point scale than an 11 point one) and robustness of results (an 11 point scale gives a larger continuum so over time you can more easily see if the needle is moving). User satisfaction is often rolled up to a “satisfaction score” for the product and tracked by the organization as a key metric for sustainability and growth. This can be represented as an average score or “top two box” score (percent of users who are “very” and “extremely” satisfied).
:::

:::

##### Net Promoter Score®

The Net Promoter Score® (NPS) is likely the most widely utilized approach to gathering feedback for digital products. The question under the NPS methodology is “How likely are you to recommend [insert product or service name] to a friend or colleague?” This methodology is founded upon a lot of research showing that people will go so far as to recommend a product when they are satisfied with it themselves. So it takes satisfaction one step further. It is a metric of enthusiasm and happiness with a product. Oftentimes a second free text question is used following the NPS® question. This question asks the user why they gave the rating they did, which reveals what’s making them very happy or unhappy. The NPS methodology uses a 0 to 11-point scale, where respondents scoring 0 to 6 are considered “Detractors”, 7 and 8 are considered “Passives” and 9 and 10 are considered “Promoters”. To calculate NPS, the percent of Detractors is subtracted from the percent of Promoters. This score is represented as a negative or positive number (not a percent; a common error). This score can then be used to compare a company or product to past performance or benchmarks. One caution regarding NPS is that small sample sizes can result in volatility when tracked over time which can raise red flags unnecessarily. Arguably, several hundred respondents are a necessary guidepost to be able to reliably track the NPS metric. However, on an individual level or with smaller sample sizes, it is still highly useful to understand whether an individual is a Promoter, Passive or Detractor or to track the percent who are likely to recommend the product (e.g., percent who answer 8,9 or 10).
:::

:::

##### Frequency of Gathering Feedback

There is no rule of thumb that applies to all situations in terms of how often to gather feedback. In general, a team should make meaningful changes or improvements to the product in between surveying users. It also depends on the length of the survey. If it is a longer form, more comprehensive satisfaction survey that will take a user 5-10 minutes to complete, perhaps asking annually is best. But if the survey is brief and more of a “pulse” that takes respondents 2 minutes or less, asking **monthly or quarterly** could be acceptable without giving respondents fatigue.
:::

:::

##### Asking for Feedback in App

It has become common practice to ask users to complete a short form satisfaction survey directly within an application. Guidelines for frequency are explained in the above tile. An app will typically prompt their users via a modal dialog on launch. A basic template for the prompt is as follows:

**Prompt header:**
Help us improve [product name]

**Body text:**
We'd love to hear about your experience with [product name]. Please take 1-2 minutes to share your feedback and help us improve the application.

**Confirm button text:**
Provide Feedback

**Dismiss button text:**
No thanks

After agreeing to provide user feedback, it is recommended that the [Typeform Survey](https://cashmere.healthcatalyst.net/components/typeform-survey) component be used to collect in app feedback.
:::

:::

##### Asking for Feedback via Email

With any survey it is important to achieve the highest response rate possible. A personalized invitation to take the survey is generally going to yield the highest response rate. If the product is in alpha or beta phases at a client, for example, having the product team reach out to users directly on an individual level may be best. If you choose to send the users a personal email asking them to click through to the survey, here is a template as a starting point:

_Health Catalyst would like your feedback to help inform improvements to [product name]. It is very important that we hear from you to ensure that [product name] is meeting your needs and helping you to continue to excel as a data-driven organization. Health Catalyst will use your feedback to inform necessary upgrades. The [product name] Survey is anonymous and will take you about 1-3 minutes to complete._

_Please click here to take the survey: {link}_

_If you have any questions, please feel free to reach out to me. Thank you for completing the survey by {date}._

However, it is not always practical to take this personalized approach, especially with more mature products that have a lot of users. In that case MailChimp or another centralized tool that can send automated emails are a good option.

:::
