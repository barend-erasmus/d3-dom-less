export class D3SVGElement {

    private attributes: {} = null;

    private children: D3SVGElement[] = [];

    private innerText: string = null;

    private styles: {} = null;

    constructor(
        public tag: string,
    ) {

    }

    public static create(tag: string): D3SVGElement {
        const element: D3SVGElement = new D3SVGElement(tag);

        if (tag === 'svg') {
            element.attr('xmlns', 'http://www.w3.org/2000/svg');
        }

        return element;
    }

    public append(tag: string): D3SVGElement {
        const element: D3SVGElement = D3SVGElement.create(tag);

        this.children.push(element);

        return element;
    }

    public attr(name: string, value: string | number): D3SVGElement {
        if (!this.attributes) {
            this.attributes = {};
        }

        this.attributes[name] = value;

        return this;
    }

    public style(name: string, value: string | number): D3SVGElement {
        if (!this.styles) {
            this.styles = {};
        }

        this.styles[name] = value;

        return this;
    }

    public text(value: string): D3SVGElement {
        this.innerText = value;

        return this;
    }

    public toString(): string {
        return `<${this.tag}${this.attributesToString()}${this.stylesToString()}>${this.innerTextToString()}${this.childrenToString()}</${this.tag}>`;
    }

    private attributesToString(): string {
        return this.attributes? ` ${Object.keys(this.attributes).map((key) => `${key}="${this.attributes[key]}"`).join(' ')}` : '';
    }

    private childrenToString(): string {
        return this.children.map((element) => element.toString()).join('');
    }

    private innerTextToString(): string {
        return this.innerText ? this.innerText : '';
    }

    private stylesToString(): string {
        return this.styles? ` style="${Object.keys(this.styles).map((key) => `${key}: ${this.styles[key]}`).join(';')}"` : '';
    }
}