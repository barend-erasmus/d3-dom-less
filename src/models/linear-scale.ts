export class LinearScale {
    constructor(
        public domainMax: number,
        public domainMin: number,
        public rangeMax: number,
        public rangeMin: number,
    ) {
    }

    public get(value: number): number {
        const diffDomainMaxMin: number = this.domainMax - this.domainMin;
        const diffRangeMaxMin: number = this.rangeMax - this.rangeMin;

        const result: number = ((value - this.domainMin) / diffDomainMaxMin * diffRangeMaxMin) + this.rangeMin;

        return result;
    }
}
