export class OrdinalScale {
    constructor(
        private domain: string[],
        private paddingPercentage: number,
        private rangeMax: number,
        private rangeMin: number,
    ) {
    }

    public get(value: string): number {
        const diffRangeMaxMin: number = this.rangeMax - this.rangeMin;

        const padding: number = diffRangeMaxMin * this.paddingPercentage / (this.domain.length + 1);

        const index: number = this.domain.indexOf(value);

        return padding + (padding  * index) + (this.width() * index);
    }

    public width(): number {
        const diffRangeMaxMin: number = this.rangeMax - this.rangeMin;

        return (diffRangeMaxMin - (diffRangeMaxMin * this.paddingPercentage)) / this.domain.length ;
    }
} 