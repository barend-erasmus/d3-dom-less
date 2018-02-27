import { D3SVGElement } from "../models/svg";
import { OrdinalScale } from "../models/ordinal-scale";
import { LinearScale } from "../models/linear-scale";

const svg = D3SVGElement.create('svg');

const margin = { top: 20, right: 20, bottom: 30, left: 40 };

const width = 400;
const height = 400;

const data = [
    {
        frequency: 10,
        letter: 'A',
    },
    {
        frequency: 20,
        letter: 'B',
    },
    {
        frequency: 30,
        letter: 'C',
    },
];

var x = new OrdinalScale(
    data.map((x) => x.letter),
    0.1,
    width,
    data.map((x) => x.frequency).reduce((a, b) => Math.min(a, b)));

const y = new LinearScale(
    data.map((x) => x.frequency).reduce((a, b) => Math.max(a, b)),
    0,
    0,
    height,
);

svg
    .attr('height', 400 + margin.left + margin.right)
    .attr('width', 400 + margin.top + margin.bottom)
    .style('background', 'blue');

const group = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// g.append("g")
//     .attr("class", "axis axis--x")
//     .attr("transform", "translate(0," + height + ")")
//     .call(d3.axisBottom(x));

// g.append("g")
//     .attr("class", "axis axis--y")
//     .call(d3.axisLeft(y).ticks(10, "%"))
//     .append("text")
//     .attr("transform", "rotate(-90)")
//     .attr("y", 6)
//     .attr("dy", "0.71em")
//     .attr("text-anchor", "end")
//     .text("Frequency");

for (let index: number = 0; index < data.length; index++) {
    group.append("rect")
        .attr("x", x.get(data[index].letter))
        .attr("y", y.get(data[index].frequency))
        .attr("width", x.width())
        .attr("height", 400 - y.get(data[index].frequency))
        .attr('fill', 'black');
}


console.log(svg.toString());