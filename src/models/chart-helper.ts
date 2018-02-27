export class ChartHelper {

    constructor(
        public height: number,
        public numberOfItems: number,
        public paddingPercentage: number,
        public range: number,
        public width: number,
    ) {

    }

    public getBarHeight(value: number): number {
        return value * this.getYPixelsPerUnit();
    }

    public getBarPadding(): number {
        return this.width * this.paddingPercentage / (this.numberOfItems + 1);
    }

    public getBarWidth(): number {
        return (this.width - (this.width * this.paddingPercentage)) / this.numberOfItems;
    }

    public getTextWidth(text: string, fontSize: number) {
        return text.length * (fontSize / 2.5);
    }

    public getX(index: number): number {
        return this.getBarPadding() + (this.getBarPadding()  * index) + (this.getBarWidth() * index);
    }

    public getY(value: number): number {
        return (this.range - value) * this.getYPixelsPerUnit();
    }

    public getXPixelsPerUnit(): number {
        return this.width / this.range;
    }

    public getYPixelsPerUnit(): number {
        return this.height / this.range;
    }
}