import {Component, ElementRef, ViewChild} from '@angular/core';
import {SectionService} from '../../shared/section.service';
import {BaseDemoComponent} from '../../shared/base-demo.component';

@Component({
    selector: 'hc-app-branding-demo',
    templateUrl: './app-branding-demo.component.html',
    styleUrls: ['./app-branding-demo.component.scss']
})
export class AppBrandingDemoComponent extends BaseDemoComponent {

    @ViewChild('canvasContainer') canvasContainer:ElementRef;
    @ViewChild('imageOutput') imageOutput:ElementRef;
    theme = "dark";
    slimText = "Cashmere";
    boldText = "Dashboard";

    constructor(sectionService: SectionService) {
        super(sectionService);
    }

    ngAfterViewInit() {
        setTimeout(() => this.generateLogo(), 2000); // font may not have loaded yet
        this.generateLogo();
    }

    generateLogo() {
        const canvas = this.canvasContainer.nativeElement;
        const ctx = canvas.getContext("2d", {alpha: true});
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let textColor = "";
        if(this.theme === "light") {
            textColor = "#000000";
            this.imageOutput.nativeElement.style.backgroundColor = "#ffffff";
        }
        else {
            textColor = "#ffffff";
            this.imageOutput.nativeElement.style.backgroundColor = "#384655";
        }
        const baseFont = "182px CarnasLight";
        const slimTextLetterSpacing = ".75px";
        const boldTextLetterSpacing = "4px";
        ctx.font = baseFont;
        ctx.letterSpacing = slimTextLetterSpacing;
        const slimTextRect = ctx.measureText(this.slimText);
        ctx.font = "bold " + baseFont;
        ctx.letterSpacing = boldTextLetterSpacing;
        const boldTextRect = ctx.measureText(this.boldText);
        canvas.width = slimTextRect.width + 2 + boldTextRect.width;
        canvas.height = 203;

        const textOffsetX = 0;
        const textOffsetY = 156; //slimTextRect.fontBoundingBoxAscent-21;

        // slim text
        ctx.font = baseFont;
        ctx.letterSpacing = slimTextLetterSpacing;
        ctx.fillStyle = textColor; // setting font resets fillStyle :P
        ctx.fillText(this.slimText, textOffsetX, textOffsetY);

        //bold text
        ctx.font = "bold " + baseFont;
        ctx.letterSpacing = boldTextLetterSpacing;
        ctx.fillStyle = textColor; // setting font resets fillStyle :P
        ctx.fillText(this.boldText, textOffsetX + slimTextRect.width, textOffsetY);

        // create data url
        const dataUrl = canvas.toDataURL();
        this.imageOutput.nativeElement.src = dataUrl;

        // create a clean download link
        const downloadLink = document.getElementById("download-button") as HTMLFormElement;
        if(downloadLink) {
            downloadLink.href = dataUrl;
            let filename = `${this.slimText}${this.boldText ? "-" + this.boldText : ""}`;
            filename = filename.toLowerCase().replace(/[^0-1a-z\s-]/, '').trim().replace(/\s/, '-');
            downloadLink.download = filename + `.png`;
        }
    }
}
