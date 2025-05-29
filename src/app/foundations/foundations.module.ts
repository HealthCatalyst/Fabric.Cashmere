import {NgModule} from '@angular/core';
import {ColorDemoComponent} from './color/color-demo.component';
import {IconGuideV1Component} from './icons/icon-guide-v1.component';
import {IconGuideV2Component} from './icons/icon-guide-v2.component';
import {TypographyDemoComponent} from './typography/typography-demo.component';
import {CodeDemoComponent} from './code/code-demo.component';
import {SharedModule} from '../shared/shared.module';
import {FoundationsRoutesModule} from './foundations-routes.module';
import {FoundationsComponent} from './foundations.component';
import {BrandColorDemoComponent} from './brand-colors/brand-color-demo.component';
import {ApplicationInsightsService} from '../shared/application-insights/application-insights.service';
import {LogoDemoComponent} from './logo/logo-demo.component';
import {FontsDemoComponent} from './fonts/fonts-demo.component';
import {ProductsDemoComponent} from './products/products-demo.component';
import {AIDemoComponent} from './ai/ai-demo.component';
import {AppBrandingDemoComponent} from './app-branding/app-branding-demo.component';
import {IconPickerComponent} from './products/icon-picker/icon-picker.component';
import {FaviconDemoComponent} from './favicons/favicon-demo.component';

@NgModule({
    imports: [SharedModule, FoundationsRoutesModule],
    providers: [ApplicationInsightsService],
    declarations: [
        FoundationsComponent,
        ColorDemoComponent,
        IconGuideV1Component,
        IconGuideV2Component,
        TypographyDemoComponent,
        CodeDemoComponent,
        FaviconDemoComponent,
        BrandColorDemoComponent,
        LogoDemoComponent,
        AIDemoComponent,
        AppBrandingDemoComponent,
        ProductsDemoComponent,
        IconPickerComponent,
        FontsDemoComponent
    ]
})
export class FoundationsModule {}
