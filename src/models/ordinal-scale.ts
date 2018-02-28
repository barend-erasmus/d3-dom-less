export class OrdinalScale {
    constructor(
        public domain: string[],
        public paddingPercentage: number,
        public rangeMax: number,
        public rangeMin: number,
    ) {
    }

    public deltaRange(): number {
        return this.rangeMax - this.rangeMin;
    }

    public get(value: string): number {
        const index: number = this.domain.indexOf(value);

        return this.padding() + (this.padding()  * index) + (this.width() * index);
    }

    public padding(): number {
        return this.deltaRange() * this.paddingPercentage / (this.domain.length + 1);
    }

    public width(): number {
        const diffRangeMaxMin: number = this.rangeMax - this.rangeMin;

        return (diffRangeMaxMin - (diffRangeMaxMin * this.paddingPercentage)) / this.domain.length ;
    }
}
