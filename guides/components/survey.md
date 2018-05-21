:::

##### Angular Component

```html
<hc-typeform-survey surveyUri="https://exampleCompany.typeform.com" #survey>
</hc-typeform-survey>
<button hc-button color="primary" (click)="survey.open()">
    Open Survey
</button>
```

:::

:::

##### Properties

| Name      | Type   | Description                                          |
| --------- | ------ | ---------------------------------------------------- |
| surveyUri | string | Use to swap out the survey that will be administered |

:::
