import {Component, ElementRef, ViewChild} from '@angular/core';
import {SectionService} from '../../shared/section.service';
import {BaseDemoComponent} from '../../shared/base-demo.component';

@Component({
    selector: 'hc-app-branding-demo',
    templateUrl: './app-branding-demo.component.html',
    styleUrls: ['./app-branding-demo.component.scss'],
    standalone: false
})
export class AppBrandingDemoComponent extends BaseDemoComponent {

    @ViewChild('canvasContainer') canvasContainer:ElementRef;
    @ViewChild('imageOutput') imageOutput:ElementRef;
    theme = "dark";
    slimText = "Cashmere";
    boldText = "Dashboard";
    outputFormat = 'image/png';

    constructor(sectionService: SectionService) {
        super(sectionService);
    }

    ngAfterViewInit() {
        setTimeout(() => this.generateLogo(), 2000); // font may not have loaded yet :(
        setTimeout(() => this.generateLogo(), 500);
    }

    generateLogo() {
        const canvas = this.canvasContainer.nativeElement;
        const ctx = canvas.getContext("2d", {alpha: true});
        let slimTextColor = "";
        let boldTextColor = "";
        if(this.theme === "light") {
            slimTextColor = "#0b0c0c"; // slightly grey
            boldTextColor = "#000000";
            this.imageOutput.nativeElement.style.backgroundColor = "#ffffff";
        }
        else {
            slimTextColor = "#f4f3f3"; // slightly grey
            boldTextColor = "#ffffff";
            this.imageOutput.nativeElement.style.backgroundColor = "#384655";
        }


        const fontFace = "BrandFont";
        const slimTextFont = "182px " + fontFace;
        const boldTextFont = "bold 181px " + fontFace;
        const slimTextLetterSpacing = "-2.5px";
        const boldTextLetterSpacing = "-2.5px";

        // calculate sizing and positioning of text.
        ctx.font = slimTextFont;
        ctx.letterSpacing = slimTextLetterSpacing;
        const slimTextRect = ctx.measureText(this.slimText);
        ctx.font = boldTextFont;
        ctx.letterSpacing = boldTextLetterSpacing;
        const boldTextRect = ctx.measureText(this.boldText);
        canvas.width = slimTextRect.width + 2 + boldTextRect.width;
        canvas.height = 203;
        const textOffsetX = 0;
        const textOffsetY = 157; //slimTextRect.fontBoundingBoxAscent-21;

        // render background
        if(this.outputFormat === "image/jpeg") { 
            // solid background
            ctx.fillStyle = this.imageOutput.nativeElement.style.backgroundColor;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        else { 
            // transparent background
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }

        // render slim text
        ctx.font = slimTextFont;
        ctx.letterSpacing = slimTextLetterSpacing;
        ctx.fillStyle = slimTextColor; // setting font resets fillStyle :P
        ctx.fillText(this.slimText, textOffsetX, textOffsetY);

        // render bold text
        ctx.font = boldTextFont;
        ctx.letterSpacing = boldTextLetterSpacing;
        ctx.fillStyle = boldTextColor; // setting font resets fillStyle :P
        ctx.fillText(this.boldText, textOffsetX + slimTextRect.width, textOffsetY);

        // create data url
        const dataUrl = canvas.toDataURL(this.outputFormat);
        this.imageOutput.nativeElement.src = dataUrl;

        // create a clean download link
        const downloadLink = document.getElementById("download-button") as HTMLFormElement;
        if(downloadLink) {
            downloadLink.href = dataUrl;
            let filename = `${this.slimText}${this.boldText ? "-" + this.boldText : ""}`;
            filename = filename.toLowerCase().replace(/[^0-1a-z\s-]/, '').trim().replace(/\s/, '-');
            const fileFormat = this.outputFormat.split("/")[1];
            downloadLink.download = `${filename}.${fileFormat}`;
        }
    }
}
