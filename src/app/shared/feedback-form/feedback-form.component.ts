import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NavigationEnd, Router} from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {HcToastOptions, HcToasterService} from '@healthcatalyst/cashmere';
import {environment} from '../../../environments/environment';

@Component({
    selector: 'hc-feedback-form',
    templateUrl: './feedback-form.component.html',
    styleUrls: ['./feedback-form.component.scss'],
    standalone: false
})
export class FeedbackFormComponent implements OnInit, OnDestroy {
    feedbackForm: FormGroup;
    notHelpful = false;
    thankYouMsg = false;
    private unsubscribe = new Subject<void>();

    constructor(private router: Router, private httpClient: HttpClient, private toasterService: HcToasterService) {
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

        let headers = new HttpHeaders();
        headers = headers.append('Content-Type', 'application/json');
        const options = {headers: headers};
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const postSub = this.httpClient.post<any>( environment.productCatalog.url + '/feedback.add',
            {
                source: 'Cashmere',
                url: this.router.url,
                helpful: this.feedbackForm.controls.helpfulRating.value === 'Yes',
                email: this.feedbackForm.controls.yourEmail.value ? this.feedbackForm.controls.yourEmail.value : '',
                suggestions: this.feedbackForm.controls.yourSuggestions.value ? this.feedbackForm.controls.yourSuggestions.value : '',
                date: new Date()
            },
            options
        )
        .subscribe({
            next: () => {
                this.thankYouMsg = true;
                this.feedbackForm.reset();
                postSub.unsubscribe();
            },
            error: msg => {
                const options: HcToastOptions = {
                    header: 'Submit Failed',
                    body: "Unable to submit feedback request. Try again later.",
                    type: 'alert',
                    position: 'bottom-right'
                };
                this.toasterService.addToast(options);
                console.log( msg );
                postSub.unsubscribe();
            }
        });
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }
}
