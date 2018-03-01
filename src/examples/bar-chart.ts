import { BarChart } from '../charts/bar-chart';
import { D3SVGElement } from '../models/svg';

const rawData = { base: 'USD', date: '2018-02-27', rates: { AUD: 1.2762, BGN: 1.59, BRL: 3.238, CAD: 1.272, CHF: 0.93805, CNY: 6.3137, CZK: 20.647, DKK: 6.0532, EUR: 0.81294, GBP: 0.71864, HKD: 7.8264, HRK: 6.0525, HUF: 255.24, IDR: 13673.0, ILS: 3.4812, INR: 64.875, ISK: 100.72, JPY: 107.12, KRW: 1071.9, MXN: 18.722, MYR: 3.908, NOK: 7.8278, NZD: 1.3753, PHP: 52.261, PLN: 3.3875, RON: 3.7863, RUB: 55.929, SEK: 8.1945, SGD: 1.3198, THB: 31.39, TRY: 3.7907, ZAR: 11.656 } };

const data = Object.keys(rawData.rates).map((key) => {
    return {
        code: key,
        rate: rawData.rates[key],
    };
}).filter((item) => item.rate > 10 && item.rate < 70);

const barChart: BarChart = new BarChart(700, 700);

const svg: D3SVGElement = barChart
    .setBackgroundColor('#4D5057')
    .setBarColor('#3E78B2')
    .setTextColor('#1B998B')
    .setData(data.map((x) => x.rate), data.map((x) => x.code))
    .build();

console.log(svg.toString());
