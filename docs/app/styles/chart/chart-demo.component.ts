import { Component, OnInit, TemplateRef } from '@angular/core';
import { HcModal } from '../../../../lib/src/modal/modal';
import { ModalOptions } from '../../../../lib/src/modal/modal-options';
import { ModalService } from './../../../../lib/src/modal/modal.service';

@Component({
    selector: 'hc-chart-demo',
    templateUrl: './chart-demo.component.html',
    styleUrls: ['./chart-demo.component.scss'],
})

export class ChartDemoComponent implements OnInit {

    lastModified: Date = new Date( document.lastModified );
    loading: boolean = true;
    modalHeader: string = 'Chart Information';
    chartData: Array<any>;
    lineData: Array<any>;
    private hospitals = ['Millrock Physician Group', 'Memorial Physician Group', 'St. Johns Physician Group', 'University Physician Group']

    constructor( private modalService: ModalService ) {}

    ngOnInit() {
        // give everything a chance to get loaded before starting the animation to reduce choppiness
        setTimeout(() => { this.generateData(); this.loading = false; }, 2000);
    }

    generateData() {
        this.chartData = [];
        this.lineData = [];

        for (let i = 0; i < 4; i++) {
        this.chartData.push([
            this.hospitals[i],
            Math.floor(Math.random() * 100),
            Math.floor(Math.random() * 100),
            Math.floor(Math.random() * 100)
        ]);
        }

        for (let j = 0; j < (10 + Math.floor(Math.random() * 15)); j++) {
            this.lineData.push([
                new Date(2016 + Math.floor(j / 12), j % 12 ),
                Math.floor(Math.random() * 100),
                40 + Math.floor(Math.random() * 20)
            ]);
        }
    }

    public chartInfo(content: TemplateRef<any>, headerName) {
        let options: ModalOptions = {
            data: `This is an example of a supporting info box associated with a chart. An info box can be used to provide
                supporting information about the data set, algorithms used, how the data was collected, etc.  Viewers new
                to an application may not be as willing to trust data being presented at face value, so info boxes like this
                are a way to alleviate concerns about data quality.`,
            size: 'md'
        };
        this.modalHeader = headerName;
        this.modalService.open(content, options)
    }

    public chartShare(content: TemplateRef<any>, headerName) {
        let options: ModalOptions = {
            data: `Additional options for charts may be included in the header icon row.  This may include functionality
                for sharing, exporting, etc.`,
            size: 'md'
        };
        this.modalHeader = headerName;
        this.modalService.open(content, options)
    }
}
