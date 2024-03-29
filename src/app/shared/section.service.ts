import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable({providedIn: 'root'})
export class SectionService {
    constructor(private router: Router) {}

    currentSection(): string | null {
        const url = this.router.url;
        const parsed = this.router.parseUrl(url);
        return parsed.queryParamMap.get('section');
    }

    scrollToSection(): void {
        const section = this.currentSection();
        if (!section) {
            return;
        }

        const element = document.getElementById(section);
        if (!element) {
            return;
        }

        element.scrollIntoView();
    }
}
