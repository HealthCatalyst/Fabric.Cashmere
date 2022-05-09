import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NavigationEnd, Router} from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {ApplicationInsightsService} from '../application-insights/application-insights.service';

@Component({
    selector: 'hc-feedback-form',
    templateUrl: './feedback-form.component.html',
    styleUrls: ['./feedback-form.component.scss']
})
export class FeedbackFormComponent implements OnInit, OnDestroy {
    feedbackForm: FormGroup;
    notHelpful = false;
    thankYouMsg = false;
    private appInsights: ApplicationInsightsService;
    private unsubscribe = new Subject<void>();

    constructor(private router: Router) {
        this.appInsights = new ApplicationInsightsService();

        this.router.events.pipe(takeUntil(this.unsubscribe)).subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.notHelpful = false;
                this.thankYouMsg = false;
                if (this.feedbackForm) {
                    this.feedbackForm.reset();
                }
            }
        });
    }

    ngOnInit(): void {
        this.feedbackForm = new FormGroup({
            helpfulRating: new FormControl(''),
            yourEmail: new FormControl('', [Validators.email]),
            yourSuggestions: new FormControl('', [Validators.required, Validators.minLength(3)])
        });
    }

    checkNoHelp(): void {
        this.feedbackForm.controls.helpfulRating.setValue('No');
        this.notHelpful = true;
    }

    checkHelpful(): void {
        this.feedbackForm.controls.helpfulRating.setValue('Yes');
    }

    onCancel(): void {
        this.feedbackForm.reset();
        this.notHelpful = false;
    }

    onSubmit(): void {
        if (this.feedbackForm.invalid && this.notHelpful === true) {
            return;
        }

        this.thankYouMsg = true;

        const formData = new FormData();
        formData.append('currentUrl', this.router.url);
        formData.append('helpfulRating', this.feedbackForm.controls.helpfulRating.value);
        formData.append('yourEmail', this.feedbackForm.controls.yourEmail.value ? this.feedbackForm.controls.yourEmail.value : '');
        formData.append(
            'yourSuggestions',
            this.feedbackForm.controls.yourSuggestions.value ? this.feedbackForm.controls.yourSuggestions.value : ''
        );

        this.appInsights.logFeedback( formData );
        this.feedbackForm.reset();
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }
}
