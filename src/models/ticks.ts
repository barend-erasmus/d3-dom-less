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
        lineElementFn: (element: D3SVGElement, scale: LinearScale) => void,
        scale: LinearScale,
        tickLineFn: (element: D3SVGElement, scale: LinearScale) => void,
        tickTextFn: (element: D3SVGElement, scale: LinearScale, value: number) => void,
    ): D3SVGElement {
        const lineElement: D3SVGElement = element
            .append('line')
            .attr('x1', 0)
            .attr('y1', scale.get(scale.domainMin))
            .attr('x2', 0)
            .attr('y2', scale.get(scale.domainMax) - (this.strokeWidth / 2))
            .attr('stroke-width', this.strokeWidth);

        if (lineElementFn) {
            lineElementFn(lineElement, scale);
        }

        for (let value: number = 0; value <= scale.domainMax - scale.domainMin; value += (scale.domainMax - scale.domainMin) / this.count) {
            const tickTextElement: D3SVGElement = element
                .append('text')
                .attr('x', -30)
                .attr('y', scale.get(Math.round(value)) + 5)
                .text(Math.round(value).toString());

            if (tickTextFn) {
                tickLineFn(tickTextElement, scale);
            }

            const tickLineElement: D3SVGElement = element
                .append('line')
                .attr('x1', 0)
                .attr('y1', scale.get(Math.round(value)) + (this.strokeWidth / 2))
                .attr('x2', -5)
                .attr('y2', scale.get(Math.round(value)) + (this.strokeWidth / 2))
                .attr('stroke-width', this.strokeWidth);

            if (tickLineFn) {
                tickTextFn(tickLineElement, scale, value);
            }
        }

        return element;
    }

    public drawOrdinalScaleBottom(
        element: D3SVGElement,
        lineElementFn: (element: D3SVGElement, scale: OrdinalScale) => void,
        scale: OrdinalScale,
        tickTextElementFn: (element: D3SVGElement, scale: OrdinalScale, value: string) => void,
    ): D3SVGElement {
        const lineElement: D3SVGElement = element
            .append('line')
            .attr('x1', scale.get(scale.domain[0]) - scale.padding())
            .attr('y1', 0 + (this.strokeWidth / 2))
            .attr('x2', scale.get(scale.domain[scale.domain.length - 1]) + scale.width() + scale.padding())
            .attr('y2', 0 + (this.strokeWidth / 2))
            .attr('stroke-width', this.strokeWidth);

        if (lineElementFn) {
            lineElementFn(lineElement, scale);
        }

        for (const value of scale.domain) {
            const tickTextElement: D3SVGElement = element
                .append('text')
                .attr('x', scale.get(value) + (scale.width() / 2))
                .attr('y', 15)
                .attr('text-anchor', 'middle')
                .text(value.toString());

            if (tickTextElementFn) {
                tickTextElementFn(element, scale, value);
            }
        }

        return element;
    }
}
