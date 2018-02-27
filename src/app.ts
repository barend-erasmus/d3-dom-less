import { D3SVGElement } from "./models/svg";
import { LinearScale } from "./models/linear-scale";

const y: LinearScale = new LinearScale(100, 50, 110, 10);

console.log(y.get(75));
