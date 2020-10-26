import {Component, ElementRef, HostListener, Input, ViewChild, ViewEncapsulation, AfterViewInit} from '@angular/core';
import * as d3 from 'd3';

@Component({
    selector: 'hc-demo-linechart',
    template: `
        <div class="d3-line-chart" #chart></div>
    `,
    styleUrls: ['./linechart.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class LinechartComponent implements AfterViewInit {
    @ViewChild('chart')
    private chartContainer: ElementRef;
    @Input()
    private data: Array<any>;
    private margin: any = {top: 20, bottom: 60, left: 40, right: 20};
    private chart: any;
    private dotsPrimary: any;
    private dotsSecondary: any;
    private width: number;
    private height: number;
    private xScale: any;
    private yScale: any;
    private xAxis: any;
    private yAxis: any;
    private tip: any;
    private svg: any;

    constructor() {}

    @HostListener('window:resize')
    onResize() {
        this.updateChart();
    }

    ngAfterViewInit() {
        this.createChart();
        if (this.data) {
            this.updateChart();
        }
    }

    createChart() {
        let element = this.chartContainer.nativeElement;
        this.width = element.offsetWidth - this.margin.left - this.margin.right;
        this.height = element.offsetHeight - this.margin.top - this.margin.bottom;
        this.svg = d3
            .select(element)
            .append('svg')
            .attr('width', element.offsetWidth)
            .attr('height', element.offsetHeight);

        // create scales
        this.xScale = d3.scaleTime().range([0, this.width]);
        this.yScale = d3.scaleLinear().range([this.height, 0]);

        // x & y axis
        this.xAxis = this.svg
            .append('g')
            .attr('class', 'axis axis-x')
            .attr('transform', `translate(${this.margin.left}, ${this.margin.top + this.height})`)
            .call(d3.axisBottom(this.xScale));
        this.yAxis = this.svg
            .append('g')
            .attr('class', 'axis axis-y')
            .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)
            .call(d3.axisLeft(this.yScale));
    }

    updateChart() {
        // update dimensions
        let element = this.chartContainer.nativeElement;
        let self = this;
        this.width = element.offsetWidth - this.margin.left - this.margin.right;
        this.height = element.offsetHeight - this.margin.top - this.margin.bottom;
        this.svg.attr('width', element.offsetWidth).attr('height', element.offsetHeight);

        // update scales
        this.xScale = d3.scaleTime().range([0, this.width]);
        this.yScale = d3.scaleLinear().range([this.height, 0]);
        this.xScale.domain(
            d3.extent(this.data, function(d: any) {
                return d[0];
            })
        );
        this.yScale.domain([0, 100]);

        this.xAxis.call(
            d3
                .axisBottom(this.xScale)
                .tickSize(0)
                .tickFormat(d3.timeFormat('%b %Y'))
        );
        this.yAxis.call(
            d3
                .axisLeft(this.yScale)
                .tickSizeInner(-this.width)
                .tickSizeOuter(0)
                .tickPadding(10)
        );

        this.yAxis.select('.domain').remove();
        this.yAxis.selectAll('.tick:not(:first-of-type) line').attr('stroke-dasharray', '2,2');

        this.xAxis.selectAll('text').attr('transform', function(d) {
            return 'translate(' + (10 + this.getBBox().height * -2) + ',' + (10 + this.getBBox().height) + ')rotate(-60)';
        });

        let line = d3
            .line()
            .x(function(d: any) {
                return self.xScale(d[0]);
            })
            .y(function(d: any) {
                return self.yScale(d[1]);
            });

        let line2 = d3
            .line()
            .x(function(d: any) {
                return self.xScale(d[0]);
            })
            .y(function(d: any) {
                return self.yScale(d[2]);
            });

        // secondary line
        this.svg.select('.secondary-line').remove();
        this.svg
            .append('path')
            .attr('class', 'secondary-line')
            .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)
            .attr('fill', 'none')
            .attr('stroke-linejoin', 'round')
            .attr('stroke-linecap', 'round')
            .attr('stroke-width', 2)
            .datum(self.data)
            .attr('d', line2);

        // Add the secondary line scatterplot
        this.svg.select('.secondary-scatter').remove();
        this.dotsSecondary = this.svg
            .append('g')
            .attr('class', 'secondary-scatter')
            .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

        this.dotsSecondary
            .selectAll('dot')
            .data(self.data)
            .enter()
            .append('circle')
            .attr('r', 6)
            .attr('cx', function(d) {
                return self.xScale(d[0]);
            })
            .attr('cy', function(d) {
                return self.yScale(d[2]);
            });

        // primary line
        this.svg.select('.primary-line').remove();
        this.chart = this.svg
            .append('path')
            .attr('class', 'primary-line')
            .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)
            .attr('fill', 'none')
            .attr('stroke-linejoin', 'round')
            .attr('stroke-linecap', 'round')
            .attr('stroke-width', 2)
            .datum(self.data)
            .attr('d', line);

        // Add the primary line scatterplot
        this.svg.select('.primary-scatter').remove();
        this.dotsPrimary = this.svg
            .append('g')
            .attr('class', 'primary-scatter')
            .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

        this.dotsPrimary
            .selectAll('dot')
            .data(self.data)
            .enter()
            .append('circle')
            .attr('r', 6)
            .attr('cx', function(d) {
                return self.xScale(d[0]);
            })
            .attr('cy', function(d) {
                return self.yScale(d[1]);
            });

        let tip = d3.select('.chart-tooltip');

        // add mouseover tooltips to primary scatterplot
        this.dotsPrimary
            .selectAll('circle')
            .on('mouseover', function(d) {
                let tempDate = new Date(d[0]);
                let dateArray = tempDate.toString().split(' ');

                tip.transition()
                    .duration(200)
                    .style('opacity', 1)
                    .attr('class', 'chart-tooltip tip-purple');
                tip.html(
                    '<div class="tooltip-header">Millrock Hospital</div>' +
                        dateArray[1] +
                        ' ' +
                        dateArray[3] +
                        ': <strong>' +
                        d[1] +
                        '</strong>'
                )
                    .style('left', d3.event.pageX + 15 + 'px')
                    .style('top', d3.event.pageY - 28 + 'px');
            })
            .on('mouseout', function(d) {
                tip.transition()
                    .duration(500)
                    .style('opacity', 0);
            });

        // add mouseover tooltips to secondary scatterplot
        this.dotsSecondary
            .selectAll('circle')
            .on('mouseover', function(d) {
                let tempDate = new Date(d[0]);
                let dateArray = tempDate.toString().split(' ');

                tip.transition()
                    .duration(200)
                    .style('opacity', 1)
                    .attr('class', 'chart-tooltip tip-gray');
                tip.html(
                    '<div class="tooltip-header">Touchstone Benchmark</div>' +
                        dateArray[1] +
                        ' ' +
                        dateArray[3] +
                        ': <strong>' +
                        d[2] +
                        '</strong>'
                )
                    .style('left', d3.event.pageX + 15 + 'px')
                    .style('top', d3.event.pageY - 28 + 'px');
            })
            .on('mouseout', function(d) {
                tip.transition()
                    .duration(500)
                    .style('opacity', 0);
            });
    }
}
