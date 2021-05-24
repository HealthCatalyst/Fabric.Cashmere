import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {PersonaFile, PersonaService} from '../persona-list.service';

@Component({
    selector: 'hc-persona-viewer',
    templateUrl: './persona-viewer.component.html',
    styleUrls: ['./persona-viewer.component.scss']
})
export class PersonaViewerComponent implements OnInit, OnDestroy {
    public document: string = '';
    public referrer: string = '/content/personas';
    public backText: string = 'Back to Persona List';
    private unsubscribe = new Subject<void>();

    constructor(private activatedRoute: ActivatedRoute, private router: Router, public personaService: PersonaService) {}

    ngOnInit() {
        this.activatedRoute.paramMap.pipe(takeUntil(this.unsubscribe)).subscribe(queryParams => {
            const route = queryParams.get('id');
            const selectedPersona: PersonaFile | undefined = this.personaService.personas.find(persona => persona.route === route);
            if (selectedPersona) {
                this.document = selectedPersona.document;
            }
        });

        const url = this.router.url;
        const parsed = this.router.parseUrl(url);
        if ( parsed.queryParamMap.get('referrer') ) {
            if ( parsed.queryParamMap.get('referrer') === 'chart' ) {
                this.referrer = '/content/org-chart';
                this.backText = 'Back to Org Chart';
            } else {
                this.referrer = '/content/products/' + parsed.queryParamMap.get('referrer');
                this.backText = 'Back to Product Persona Summary'
            }
        }
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }
}
