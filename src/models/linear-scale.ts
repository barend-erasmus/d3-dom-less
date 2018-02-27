export class LinearScale {
    constructor(
        private domainMax: number,
        private domainMin: number,
        private rangeMax: number,
        private rangeMin: number,
    ) {
    }

    public get(value: number): number {
        const diffDomainMaxMin: number = this.domainMax - this.domainMin;
        const diffRangeMaxMin: number = this.rangeMax - this.rangeMin;

        const result: number = ((value - this.domainMin) / diffDomainMaxMin * diffRangeMaxMin) + this.rangeMin;
        
        return result;
    }
} 