import {Component, ElementRef, HostListener, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import * as d3 from 'd3';

@Component({
    selector: 'hc-demo-barchart',
    template: `
        <div class="d3-bar-chart" #chart></div>
    `,
    styleUrls: ['./barchart.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class BarchartComponent implements OnInit {
    @ViewChild('chart')
    private chartContainer: ElementRef;
    @Input()
    private data: Array<any>;
    private margin: any = {top: 20, bottom: 45, left: 30, right: 20};
    private chart: any;
    private width: number;
    private height: number;
    private xScale: any;
    private xGroups: any;
    private yScale: any;
    private xAxis: any;
    private yAxis: any;
    private tip: any;
    private svg: any;

    @HostListener('window:resize')
    onResize() {
        if (this.data) {
            this.updateChart();
        }
    }

    constructor() {}

    ngOnInit() {
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

        // define X & Y domains
        let xDomain = this.data.map(d => d[0]);
        let xGroupDomain = ['0', '1', '2'];
        let yDomain = [0, 100];

        this.xScale = d3
            .scaleBand()
            .padding(0.1)
            .domain(xDomain)
            .rangeRound([0, this.width]);
        this.xGroups = d3
            .scaleBand()
            .padding(0.1)
            .domain(xGroupDomain)
            .rangeRound([0, this.xScale.bandwidth()]);
        this.yScale = d3
            .scaleLinear()
            .domain(yDomain)
            .range([this.height, 0]);

        // x & y axis
        this.xAxis = this.svg
            .append('g')
            .attr('class', 'axis axis-x')
            .attr('transform', `translate(${this.margin.left}, ${this.margin.top + this.height})`)
            .call(
                d3
                    .axisBottom(this.xScale)
                    .tickSize(0)
                    .tickPadding(10)
            );
        this.yAxis = this.svg
            .append('g')
            .attr('class', 'axis axis-y')
            .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)
            .call(
                d3
                    .axisLeft(this.yScale)
                    .tickSizeInner(-this.width)
                    .tickSizeOuter(0)
                    .tickPadding(10)
            );

        // chart plot area
        this.chart = this.svg
            .append('g')
            .attr('class', 'bars')
            .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

        // Define the div for the tooltip
        this.tip = d3
            .select('body')
            .append('div')
            .attr('class', 'chart-tooltip')
            .style('opacity', 0);
    }

    updateChart() {
        let self = this;
        let barColors = ['green-bar', 'blue-bar', 'purple-bar'];
        let barTips = ['tip-green', 'tip-blue', 'tip-purple'];
        let barNames = ['Cardiology', 'Orthopedics', 'Oncology'];

        // update dimensions
        let element = this.chartContainer.nativeElement;
        this.width = element.offsetWidth - this.margin.left - this.margin.right;
        this.height = element.offsetHeight - this.margin.top - this.margin.bottom;
        this.svg.attr('width', element.offsetWidth).attr('height', element.offsetHeight);

        // update scales
        let xDomain = this.data.map(d => d[0]);
        let xGroupDomain = ['0', '1', '2'];
        let yDomain = [0, 100];

        this.xScale = d3
            .scaleBand()
            .padding(0.1)
            .domain(xDomain)
            .rangeRound([0, this.width]);
        this.xGroups = d3
            .scaleBand()
            .padding(0.1)
            .domain(xGroupDomain)
            .rangeRound([0, this.xScale.bandwidth()]);
        this.yScale = d3
            .scaleLinear()
            .domain(yDomain)
            .range([this.height, 0]);

        // update x & y axis
        this.xAxis.call(
            d3
                .axisBottom(this.xScale)
                .tickSize(0)
                .tickPadding(10)
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

        this.xAxis.selectAll('text').remove();
        this.xAxis.selectAll('.axis-label').remove();
        this.xAxis
            .selectAll('.tick')
            .append('foreignObject')
            .attr('class', 'axis-label')
            .attr('x', -(this.xScale.bandwidth() / 2))
            .attr('y', 10)
            .attr('width', this.xScale.bandwidth())
            .attr('height', 24)
            .html(d => d);

        // update chart plot area
        this.svg.select('.bars').remove();
        this.chart = this.svg
            .append('g')
            .attr('class', 'bars')
            .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

        // add bar groups
        let bar = this.chart
            .selectAll('.bars')
            .data(this.data)
            .enter()
            .append('g')
            .attr('class', 'group')
            .attr('name', d => d[0])
            .attr('transform', function(d) {
                return 'translate(' + self.xScale(d[0]) + ',0)';
            });

        // add new bars
        bar.selectAll('rect')
            .data(function(d) {
                return d.slice(1);
            })
            .enter()
            .append('rect')
            .attr('class', (d, i) => barColors[i])
            .attr('x', (d, i) => self.xGroups(i))
            .attr('width', this.xGroups.bandwidth())
            .attr('y', d => this.yScale(d))
            .attr('height', d => this.height - this.yScale(d));

        // add mouseover tooltips
        bar.selectAll('rect')
            .on('mouseover', function(d, i) {
                let groupName = d3.select(this.parentNode).attr('name');
                self.tip
                    .transition()
                    .duration(200)
                    .style('opacity', 1)
                    .attr('class', 'chart-tooltip ' + barTips[i]);
                self.tip
                    .html('<div class="tooltip-header">' + barNames[i] + '</div>' + groupName + ': <strong>' + d + '</strong>')
                    .style('left', d3.event.pageX + 'px')
                    .style('top', d3.event.pageY - 28 + 'px');
            })
            .on('mouseout', function(d) {
                self.tip
                    .transition()
                    .duration(500)
                    .style('opacity', 0);
            });
    }
}
