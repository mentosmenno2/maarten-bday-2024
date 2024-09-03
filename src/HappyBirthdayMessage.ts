import { Colors } from './Colors.js';
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
		const headingElement = <HTMLHeadingElement>document.createElement('h2');
		headingElement.textContent = 'Happy birthday Maarten!';

		const imageElement = <HTMLImageElement>document.createElement('img');
		imageElement.alt = 'Evil Duck';
		imageElement.src = './evil-duck.png';

		this.element = <HTMLDivElement>document.createElement('div');
		this.element.id = 'happy-birthday-message';
		this.element.style.width = '100%';
		this.element.style.height = '100%';
		this.element.style.backgroundColor = Colors.Black;
		this.element.style.color = Colors.White;
		this.element.style.position = 'absolute';
		this.element.style.display = 'flex';
		this.element.style.flexDirection = 'column';
		this.element.style.flexWrap = 'nowrap';
		this.element.style.justifyContent = 'flex-start';
		this.element.style.alignItems = 'center';
		this.element.appendChild( headingElement );
		this.element.appendChild(imageElement);
	}
}
