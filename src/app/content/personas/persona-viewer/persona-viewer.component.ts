import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SectionService} from '../../../shared/section.service';
import {PersonaFile, PersonaService} from '../persona-list.service';

@Component({
    selector: 'hc-persona-viewer',
    templateUrl: './persona-viewer.component.html',
    styleUrls: ['./persona-viewer.component.scss']
})
export class PersonaViewerComponent implements OnInit {
    public document: string = '';

    constructor(private activatedRoute: ActivatedRoute, public personaService: PersonaService, private sectionService: SectionService) {}

    ngOnInit() {
        this.activatedRoute.paramMap.subscribe(queryParams => {
            const route = queryParams.get('id');
            const selectedPersona: PersonaFile | undefined = this.personaService.personas.find(persona => persona.route === route);
            if (selectedPersona) {
                this.document = selectedPersona.document;
            }
        });
    }

    loaded() {
        this.sectionService.scrollToSection();
    }
}
