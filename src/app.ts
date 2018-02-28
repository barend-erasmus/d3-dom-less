import { LinearScale } from './models/linear-scale';
import { D3SVGElement } from './models/svg';

const y: LinearScale = new LinearScale(100, 50, 110, 10);

console.log(y.get(75));
