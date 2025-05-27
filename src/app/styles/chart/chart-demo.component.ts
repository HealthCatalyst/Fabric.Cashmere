import {Component} from '@angular/core';
import {SectionService} from '../../shared/section.service';
import {BaseDemoComponent} from '../../shared/base-demo.component';
import {SelectChangeEvent} from '@healthcatalyst/cashmere';
import {ViewChild, ElementRef} from '@angular/core';
import * as echarts from 'echarts/core';
import { BarChart, GaugeChart, LineChart } from 'echarts/charts';
import { GridComponent, LegendComponent, TooltipComponent, DataZoomComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import * as hcChartLight from '../../../assets/charts/healthcatalyst-light-echart-v5.x.json';
import * as hcChartDark from '../../../assets/charts/healthcatalyst-dark-echart-v5.x.json';

const exampleData = {
    simple: {
        legend: undefined,
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        series: [
            {
                name: "Week 1",
                data: [150, 230, 224, 218, 135, 147, 260],
            }
        ],
    },
    grouped: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        series: [
            {
                name: "Week 1",
                data: [150, 230, 224, 218, 135, 147, 260],
            },
            {
                name: "Week 2",
                data: [260, 218, 230, 224, 135, 150, 147],
            },
            {
                name: "Week 3",
                data: [230, 150, 218, 224, 147, 260, 135],
            },
            {
                name: "Week 4",
                data: [218, 224, 135, 260, 150, 230, 147],
            }
        ]
    },
    average: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        series: [
            {
                name: "Week 1",
                data: [150, 230, 224, 218, 135, 147, 260],
                color: "#bbbbbb"
            },
            {
                name: "Week 2",
                data: [260, 218, 230, 224, 135, 150, 147],
                color: "#bbbbbb"
            },
            {
                name: "Week 3",
                data: [230, 150, 218, 224, 147, 260, 135],
                color: "#bbbbbb"
            },
            {
                name: "Week 4",
                data: [218, 224, 135, 260, 150, 230, 147],
                color: "#bbbbbb"
            },
            {
                name: "Average",
                data: [214, 205, 201, 231, 141, 196, 172],
                color: "#00aeff",
                type: "line",
                label: {
                    show: true,
                }
            },
        ]
    },
};

@Component({
    selector: 'hc-chart',
    templateUrl: './chart-demo.component.html',
    styleUrls: ['./chart-demo.component.scss'],
    standalone: false
})

export class ChartDemoComponent extends BaseDemoComponent {

    @ViewChild('chartContainer') chartContainer:ElementRef;
    chartTheme = 'light';
    chartType = 'bar';
    chartData = 'simple';
    showZoom = true;
    showLegend = true;
    chartOptions = "";
    myChart;
    resizeObserver: ResizeObserver;

    constructor(sectionService: SectionService) {
        super(sectionService);
        this.buildChartOptions();
        echarts.use([
            BarChart,
            CanvasRenderer,
            GaugeChart,
            GridComponent,
            LineChart,
            LegendComponent,
            TooltipComponent,
            DataZoomComponent
        ]);
    }

    ngAfterViewInit(): void {
        const theme = {...(this.chartTheme === 'light' ? hcChartLight : hcChartDark)}; // json is loaded as a module spreading it to reconstruct it as an object.
        this.chartContainer.nativeElement.style.background = this.chartTheme === 'light' ? "#fff": "#222";
        this.myChart = echarts.init(this.chartContainer.nativeElement, theme);
        this.resizeObserver = new ResizeObserver(() => this.myChart.resize());
        this.resizeObserver.observe(this.chartContainer.nativeElement);
        this.updateChart();
    }

    ngOnDestroy(): void {
        echarts.dispose(this.chartContainer.nativeElement);
        this.resizeObserver && this.resizeObserver.disconnect();
    }

    buildChartOptions(): Record<string, unknown> {
        const data = exampleData[this.chartData];
        const options = {
            legend: this.showLegend ? {} : undefined,
            xAxis: {
              type: 'category',
              data: data.labels,
            },
            yAxis: {
              type: 'value'
            },
            series: data.series.map(it => ({
                type: this.chartType,
                label: this.chartData === 'simple' ? {
                    show: true,
                    rotate: 0,
                    align: 'center',
                    verticalAlign: 'middle',
                    position: 'top',
                    distance: 15,
                    fontSize: 12,
                    rich: {
                        name: {}
                    }
                } : undefined,
                ...it,
            })),
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            dataZoom: this.showZoom ? [
                {
                    type: 'inside',
                }, {}
            ] : undefined,

        };
        this.chartOptions = "```json\n" + JSON.stringify(options, null, 2) + "\n```\n";
        return options;
    }

    updateChart():void {
        if(!this.chartContainer) {
            console.warn("Chart container not present!");
            return;
        }

        this.myChart.clear();
        this.myChart.setOption(this.buildChartOptions());
    }

    changeChartType(chartType: SelectChangeEvent): void {
        this.chartType = chartType.value;
        this.updateChart();
    }

    changeChartTheme(chartTheme: SelectChangeEvent): void {
        this.chartTheme = chartTheme.value;
        echarts.dispose(this.chartContainer.nativeElement);
        this.ngAfterViewInit();
    }

    changeChartData(chartData: SelectChangeEvent): void {
        this.chartData = chartData.value;
        this.updateChart();
    }

    changeChartZoom(): void {
        this.showZoom = !this.showZoom;
        this.updateChart();
    }

    changeChartLegend(): void {
        this.showLegend = !this.showLegend;
        this.updateChart();
    }
}
