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
                path: 'ux-writing',
                component: MarkdownContentComponent,
                data: {
                    title: 'Ux Writing',
                    category: 'Foundations',
                    document: require('../../../guides/accessibility/ux-writing.md')
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
    imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
    exports: [RouterModule]
})
export class AccessibilityRoutesModule {}
