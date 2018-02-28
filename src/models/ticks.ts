import { LinearScale } from './linear-scale';
import { OrdinalScale } from './ordinal-scale';
import { D3SVGElement } from './svg';

export class Ticks {

    private strokeWidth: number = 2;

    constructor(
        private count: number,
    ) {

    }

    public drawLinearScaleLeft(
        element: D3SVGElement,
        scale: LinearScale,
    ): D3SVGElement {
        element
            .append('line')
            .attr('x1', 0)
            .attr('y1', scale.get(scale.domainMin))
            .attr('x2', 0)
            .attr('y2', scale.get(scale.domainMax) - (this.strokeWidth / 2))
            .attr('stroke', '#FFFFFF')
            .attr('stroke-width', this.strokeWidth);

        for (let value: number = 0; value <= scale.domainMax - scale.domainMin; value += (scale.domainMax - scale.domainMin) / this.count) {
            element
                .append('text')
                .attr('x', -30)
                .attr('y', scale.get(Math.round(value)) + 3)
                .attr('font-size', 10)
                .attr('fill', '#FFFFFF')
                .text(Math.round(value).toString());

            element
                .append('line')
                .attr('x1', 0)
                .attr('y1', scale.get(Math.round(value)) + (this.strokeWidth / 2))
                .attr('x2', -5)
                .attr('y2', scale.get(Math.round(value)) + (this.strokeWidth / 2))
                .attr('stroke', '#FFFFFF')
                .attr('stroke-width', this.strokeWidth);
        }

        return element;
    }

    public drawOrdinalScaleBottom(
        element: D3SVGElement,
        scale: OrdinalScale,
    ): D3SVGElement {
        element
            .append('line')
            .attr('x1', scale.get(scale.domain[0]) - scale.padding())
            .attr('y1', 0 + (this.strokeWidth / 2))
            .attr('x2', scale.get(scale.domain[scale.domain.length - 1]) + scale.width() + scale.padding())
            .attr('y2', 0 + (this.strokeWidth / 2))
            .attr('stroke', '#FFFFFF')
            .attr('stroke-width', this.strokeWidth);

        for (const value of scale.domain) {
            element
                .append('text')
                .attr('x', scale.get(value) + (scale.width() / 2))
                .attr('y', 12)
                .attr('font-size', 10)
                .attr('fill', '#FFFFFF')
                .attr('text-anchor', 'middle')
                .text(value.toString());
        }

        return element;
    }
}
