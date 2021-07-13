import {Component, OnDestroy} from '@angular/core';
import {SectionService} from '../../../shared/section.service';
import {BaseDemoComponent} from '../../../shared/base-demo.component';
import {PersonaFile, PersonaService} from '../persona-list.service';
import {ActivatedRoute} from '@angular/router';
import {NavigationEnd, Router} from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
    selector: 'hc-persona-list',
    templateUrl: './persona-list.component.html',
    styleUrls: ['./persona-list.component.scss']
})
export class PersonaListComponent extends BaseDemoComponent implements OnDestroy {
    private unsubscribe = new Subject<void>();
    personaList: PersonaFile[];
    viewerMode = false;

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        sectionService: SectionService,
        public personaService: PersonaService
    ) {
        super(sectionService);
        this.personaList = personaService.personas;
        this.personaList.sort(this.comparePersonas);
        if ( activatedRoute.firstChild && activatedRoute.firstChild.routeConfig ) {
            this.viewerMode = true;
        }

        this.router.events.pipe(takeUntil(this.unsubscribe)).subscribe(event => {
            if (event instanceof NavigationEnd) {
                if ( activatedRoute.firstChild && activatedRoute.firstChild.routeConfig ) {
                    this.viewerMode = true;
                } else {
                    this.viewerMode = false;
                }
            }
        });
    }

    comparePersonas(a: PersonaFile, b: PersonaFile): number {
        let comparison = 0;
        if (a.title > b.title) {
            comparison = 1;
        } else if (a.title < a.title) {
            comparison = -1;
        }
        return comparison;
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }
}
