import { LinearScale } from '../models/linear-scale';
import { OrdinalScale } from '../models/ordinal-scale';
import { D3SVGElement } from '../models/svg';
import { Ticks } from '../models/ticks';

const svg = D3SVGElement.create('svg');

const margin = { top: 20, right: 20, bottom: 30, left: 70 };

const width = 700;
const height = 700;

const rawData = {base: 'USD', date: '2018-02-27', rates: {AUD: 1.2762, BGN: 1.59, BRL: 3.238, CAD: 1.272, CHF: 0.93805, CNY: 6.3137, CZK: 20.647, DKK: 6.0532, EUR: 0.81294, GBP: 0.71864, HKD: 7.8264, HRK: 6.0525, HUF: 255.24, IDR: 13673.0, ILS: 3.4812, INR: 64.875, ISK: 100.72, JPY: 107.12, KRW: 1071.9, MXN: 18.722, MYR: 3.908, NOK: 7.8278, NZD: 1.3753, PHP: 52.261, PLN: 3.3875, RON: 3.7863, RUB: 55.929, SEK: 8.1945, SGD: 1.3198, THB: 31.39, TRY: 3.7907, ZAR: 11.656}};

const data = Object.keys(rawData.rates).map((key) => {
    return {
        code: key,
        rate: rawData.rates[key],
    };
}).filter((item) => item.rate > 10 && item.rate < 70);

const xScale = new OrdinalScale(
    data.map((x) => x.code),
    0.2,
    width,
    data.map((x) => x.rate).reduce((a, b) => Math.min(a, b)));

const yScale = new LinearScale(
    data.map((x) => x.rate).reduce((a, b) => Math.max(a, b)),
    0,
    0,
    height,
);

svg
    .attr('height', height + margin.top + margin.bottom)
    .attr('width', width + margin.left + margin.right)
    .style('background', '#222222');

const group = svg.append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

const ticks: Ticks = new Ticks(8);

ticks.drawOrdinalScaleBottom(
    group.append('g')
        .attr('transform', `translate(0, ${height})`),
    xScale);

ticks.drawLinearScaleLeft(group.append('g'), yScale);

for (const item of data) {
    group.append('rect')
        .attr('x', xScale.get(item.code))
        .attr('y', yScale.get(item.rate))
        .attr('width', xScale.width())
        .attr('height', height - yScale.get(item.rate))
        .attr('fill', '#84DCC6');
}

console.log(svg.toString());
