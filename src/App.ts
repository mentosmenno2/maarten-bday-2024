import { Authentication } from './Authentication.js';
import { DisplayOutputInterface } from './DisplayOutputInterface.js';

export class App implements DisplayOutputInterface {
	private static instance: App | null;

	private authentication: Authentication;
	private element: HTMLDivElement;

	public constructor() {
		this.authentication = new Authentication();
		this.generateElement();
	}

	public static getInstance(): App {
		if (!this.instance) {
			this.instance = new App();
		}
		return this.instance;
	}

	public initialize(): void {
		// Display
		document.querySelector('body').appendChild(this.element);
	}

	public getElement(): HTMLDivElement {
		return this.element;
	}

	private generateElement(): void {
		this.element = <HTMLDivElement>document.createElement('div');
		this.element.id = `app`;
		this.element.style.width = '100%';
		this.element.style.height = '100%';
		this.element.style.backgroundColor = 'white';
		this.element.style.color = 'black';

		this.element.appendChild(this.authentication.getElement());
	}
}
