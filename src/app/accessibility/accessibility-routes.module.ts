import {RouterModule, Routes} from '@angular/router';
import {AccessibilityComponent} from './accessibility.component';
import {MarkdownContentComponent} from '../shared/markdown-content.component';
import {NgModule} from '@angular/core';

const routes: Routes = [
    {
        path: 'accessibility',
        component: AccessibilityComponent,
        children: [
            {
                path: 'overview',
                component: MarkdownContentComponent,
                data: {
                    title: 'Overview',
                    category: 'Foundations',
                    document: require('../../../guides/accessibility/overview.md')
                }
            },
            {
                path: 'writing-for-accessibility',
                component: MarkdownContentComponent,
                data: {
                    title: 'Writing for Accessibility',
                    category: 'Foundations',
                    document: require('../../../guides/accessibility/writing-for-accessibility.md')
                }
            },
            {
                path: '**',
                redirectTo: 'overview'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {})],
    exports: [RouterModule]
})
export class AccessibilityRoutesModule {}
