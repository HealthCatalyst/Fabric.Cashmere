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
    public document = '';
    public orgChart = false;
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
            this.orgChart = true;
        }
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }
}
