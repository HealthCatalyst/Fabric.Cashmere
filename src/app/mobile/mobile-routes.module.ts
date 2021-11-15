import {RouterModule, Routes} from '@angular/router';
import {MobileDevComponent} from './mobile.component';
import {MarkdownContentComponent} from '../shared/markdown-content.component';
import {NgModule} from '@angular/core';

const routes: Routes = [
    {
        path: 'web/mobile',
        component: MobileDevComponent,
        children: [
            {
                path: 'overview',
                component: MarkdownContentComponent,
                data: {
                    title: 'Overview',
                    category: 'Foundations',
                    document: require('raw-loader!../../../guides/mobile/overview.md')
                }
            },
            {
                path: 'viewport-meta-tags',
                component: MarkdownContentComponent,
                data: {
                    title: 'Viewport Meta Tags',
                    category: 'Foundations',
                    document: require('raw-loader!../../../guides/mobile/viewport-meta-tags.md')
                }
            },
            {
                path: 'responsive-breakpoints',
                component: MarkdownContentComponent,
                data: {
                    title: 'Responsive Breakpoints',
                    category: 'Foundations',
                    document: require('raw-loader!../../../guides/mobile/responsive-breakpoints.md')
                }
            },
            {
                path: 'font-sizes',
                component: MarkdownContentComponent,
                data: {
                    title: 'Font Sizes',
                    category: 'Foundations',
                    document: require('raw-loader!../../../guides/mobile/font-sizes.md')
                }
            },
            {
                path: 'keyboard-accessibility',
                component: MarkdownContentComponent,
                data: {
                    title: 'Keyboard Accessibility',
                    category: 'Foundations',
                    document: require('raw-loader!../../../guides/mobile/keyboard-accessibility.md')
                }
            },
            {
                path: 'anchor-button-tags',
                component: MarkdownContentComponent,
                data: {
                    title: 'Anchor and Button Tags',
                    category: 'Foundations',
                    document: require('raw-loader!../../../guides/mobile/anchor-button-tags.md')
                }
            },
            {
                path: 'deep-linking',
                component: MarkdownContentComponent,
                data: {
                    title: 'Deep Linking',
                    category: 'Foundations',
                    document: require('raw-loader!../../../guides/mobile/deep-linking.md')
                }
            },
            {
                path: 'input-tag-types',
                component: MarkdownContentComponent,
                data: {
                    title: 'Input Tag Types',
                    category: 'Best Practices',
                    document: require('raw-loader!../../../guides/mobile/input-tag-types.md')
                }
            },
            {
                path: 'mobile-navigation',
                component: MarkdownContentComponent,
                data: {
                    title: 'Mobile Navigation',
                    category: 'Best Practices',
                    document: require('raw-loader!../../../guides/mobile/mobile-navigation.md')
                }
            },
            {
                path: 'form-fields',
                component: MarkdownContentComponent,
                data: {
                    title: 'Form Fields',
                    category: 'Best Practices',
                    document: require('raw-loader!../../../guides/mobile/form-fields.md')
                }
            },
            {
                path: 'modals-popovers-drawers',
                component: MarkdownContentComponent,
                data: {
                    title: 'Modals/Popovers/Drawers',
                    category: 'Best Practices',
                    document: require('raw-loader!../../../guides/mobile/modals-popovers-drawers.md')
                }
            },
            {
                path: 'help-text',
                component: MarkdownContentComponent,
                data: {
                    title: 'Help Text',
                    category: 'Best Practices',
                    document: require('raw-loader!../../../guides/mobile/help-text.md')
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
export class MobileRoutesModule {}
