import { DisplayOutputInterface } from './DisplayOutputInterface.js';

export class HappyBirthdayMessage implements DisplayOutputInterface {
	private element: HTMLDivElement;

	public constructor() {
		this.generateElement();
	}

	public getElement(): HTMLDivElement {
		return this.element;
	}

	private generateElement(): void {
		this.element = <HTMLDivElement>document.createElement('div');
		this.element.id = `happy-birthday-message`;
		this.element.style.width = '100%';
		this.element.style.height = '100%';
		this.element.style.backgroundColor = 'white';
		this.element.style.color = 'black';
	}
}
