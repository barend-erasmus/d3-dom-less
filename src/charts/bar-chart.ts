import { LinearScale } from '../models/linear-scale';
import { Margin } from '../models/margin';
import { OrdinalScale } from '../models/ordinal-scale';
import { D3SVGElement } from '../models/svg';
import { Ticks } from '../models/ticks';

export class BarChart {

    private backgroundColor: string = '#222222';

    private barColor: string = '#84DCC6';

    private data: number[] = [];

    private labels: string[] = [];

    private margin: Margin = new Margin(30, 70, 20, 20);

    private numberOfTicks: number = 8;

    private textColor: string = '#FFFFFF';

    constructor(
        public height: number,
        public width: number,
    ) {

    }

    public build(): D3SVGElement {
        const xScale = new OrdinalScale(
            this.labels,
            0.2,
            this.width,
            0);

        const yScale = new LinearScale(
            this.data.reduce((a: number, b: number) => Math.max(a, b)),
            0,
            0,
            this.height,
        );

        const svg = D3SVGElement.create('svg');

        svg
            .attr('height', this.height + this.margin.top + this.margin.bottom)
            .attr('width', this.width + this.margin.left + this.margin.right)
            .style('background', this.backgroundColor);

        const group = svg.append('g')
            .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

        const ticks: Ticks = new Ticks(this.numberOfTicks);

        ticks.drawOrdinalScaleBottom(
            group.append('g')
                .attr('transform', `translate(0, ${this.height})`),
            (element: D3SVGElement, scale: OrdinalScale) => {
                element
                    .attr('stroke', this.textColor);
            },
            xScale,
            (element: D3SVGElement, scale: OrdinalScale, value: string) => {
                element
                    .attr('font-size', 12)
                    .attr('fill', this.textColor);
            },
        );

        ticks.drawLinearScaleLeft(
            group.append('g'),
            (element: D3SVGElement, scale: LinearScale) => {
                element
                    .attr('stroke', this.textColor);
            },
            yScale,
            (element: D3SVGElement, scale: LinearScale) => {
                element
                    .attr('font-size', 12)
                    .attr('fill', this.textColor);
            },
            (element: D3SVGElement, scale: LinearScale, value: number) => {
                element
                    .attr('stroke', this.textColor);
            },
        );

        for (let index: number = 0; index < this.data.length; index++) {
            group.append('rect')
                .attr('x', xScale.get(this.labels[index]))
                .attr('y', yScale.get(this.data[index]))
                .attr('width', xScale.width())
                .attr('height', this.height - yScale.get(this.data[index]))
                .attr('fill', this.barColor);
        }

        return svg;
    }

    public setBackgroundColor(color: string): BarChart {
        this.backgroundColor = color;

        return this;
    }

    public setBarColor(color: string): BarChart {
        this.barColor = color;

        return this;
    }

    public setData(data: number[], labels: string[]): BarChart {
        this.data = data;
        this.labels = labels;

        return this;
    }

    public setTextColor(color: string): BarChart {
        this.textColor = color;

        return this;
    }
}
