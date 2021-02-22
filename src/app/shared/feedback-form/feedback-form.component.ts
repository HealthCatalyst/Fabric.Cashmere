import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'hc-feedback-form',
    templateUrl: './feedback-form.component.html',
    styleUrls: ['./feedback-form.component.scss']
})
export class FeedbackFormComponent implements OnInit {
    feedbackForm: FormGroup;
    formSubmitted = false;
    scriptURL = 'https://script.google.com/macros/s/AKfycby91RSaTB9bknujdz0nj021jGaeyVeg1jPQHikIptuhRKeAQwfdvrqIEQ/exec';
    notHelpful: boolean = false;
    currentPage: string = window.location.href;
    thankYouMsg: boolean = false;

    constructor(private httpClient: HttpClient) {}

    ngOnInit(): void {
        this.feedbackForm = new FormGroup({
            currentUrl: new FormControl(''),
            helpfulRating: new FormControl(''),
            yourEmail: new FormControl('', [Validators.email]),
            yourSuggestions: new FormControl('', [Validators.required, Validators.minLength(3)])
        });
    }

    checkNoHelp() {
        this.feedbackForm.controls.helpfulRating.setValue('No');
        this.notHelpful = true;
    }

    checkHelpful() {
        this.feedbackForm.controls.helpfulRating.setValue('Yes');
    }

    onCancel() {
        this.feedbackForm.reset();
        this.notHelpful = false;
    }

    onSubmit() {
        if (this.feedbackForm.invalid && this.notHelpful === true) {
            return;
        }

        this.formSubmitted = true;
        this.thankYouMsg = true;
        this.feedbackForm.controls.currentUrl.setValue(this.currentPage);

        const formData = new FormData();
        formData.append('currentUrl', this.feedbackForm.controls.currentUrl.value);
        formData.append('helpfulRating', this.feedbackForm.controls.helpfulRating.value);
        formData.append('yourEmail', this.feedbackForm.controls.yourEmail.value);
        formData.append('yourSuggestions', this.feedbackForm.controls.yourSuggestions.value);

        this.httpClient.post<any>(this.scriptURL, formData).subscribe(
            res => console.log(res),
            err => console.log(err)
        );

        this.feedbackForm.reset();
    }
}
