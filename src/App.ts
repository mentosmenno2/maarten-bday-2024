import { Bios } from './Bios.js';
import { Computer } from './Computers/Computer.js';
import { DisplayOutputInterface } from './DisplayOutputInterface.js';
import { AppStateDataInterface } from './State/AppStateDataInterface.js';
import { HasStateDataInterface } from './State/HasStateDataInterface.js';
import { State } from './State/State.js';

export class App implements HasStateDataInterface, DisplayOutputInterface {
	private static instance: App | null;

	private computers: Computer[];
	private element: HTMLDivElement;

	private constructor(computers: Computer[]) {
		this.computers = computers;
		// If not has computer, create computer
		if (!this.computers.length) {
			this.computers.push(new Computer('maarten', new Bios()));
		}

		this.generateElement();
	}

	public static getInstance(): App {
		if (!this.instance) {
			this.instance = this.fromStateData(State.getInstance().getData());
		}
		return this.instance;
	}

	public initialize(): void {
		// Display
		document.querySelector('body').appendChild(this.element);

		console.log('initialized');
	}

	public getActiveComputer(): Computer {
		return this.computers[0];
	}

	public getStateData(): AppStateDataInterface {
		return <AppStateDataInterface>{
			computers: this.computers.map((computer) => {
				return computer.getStateData();
			}),
		};
	}

	/**
	 * I'm having problems with myself.
	 * I want consistency but I destroy it here.
	 * Fml.
	 */
	public static fromStateData(stateData: AppStateDataInterface): App {
		return new App(
			stateData.computers.map((computer) => {
				return Computer.fromStateData(computer);
			}),
		);
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

		this.element.appendChild(this.getActiveComputer().getElement());
	}
}
