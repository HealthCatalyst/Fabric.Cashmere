import {NgModule} from '@angular/core';
import {ColorDemoComponent} from './color/color-demo.component';
import {IconGuideComponent} from './icons/icon-guide.component';
import {TypographyDemoComponent} from './typography/typography-demo.component';
import {CodeDemoComponent} from './code/code-demo.component';
import {SharedModule} from '../shared/shared.module';
import {FoundationsRoutesModule} from './foundations-routes.module';
import {FoundationsComponent} from './foundations.component';
import {BrandColorDemoComponent} from './brand-colors/brand-color-demo.component';
import {ApplicationInsightsService} from '../shared/application-insights/application-insights.service';
import {LogoDemoComponent} from './logo/logo-demo.component';
import {ProductsDemoComponent} from './products/products-demo.component';

@NgModule({
    imports: [SharedModule, FoundationsRoutesModule],
    providers: [ApplicationInsightsService],
    declarations: [
        FoundationsComponent,
        ColorDemoComponent,
        IconGuideComponent,
        TypographyDemoComponent,
        CodeDemoComponent,
        BrandColorDemoComponent,
        LogoDemoComponent,
        ProductsDemoComponent
    ]
})
export class FoundationsModule {}
