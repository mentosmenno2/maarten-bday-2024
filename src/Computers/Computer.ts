import { Bios } from '../Bios.js';
import { DisplayOutputInterface } from '../DisplayOutputInterface.js';
import { ComputerStateDataInterface } from '../State/ComputerStateDataInterface.js';
import { HasStateDataInterface } from '../State/HasStateDataInterface.js';

export class Computer implements HasStateDataInterface, DisplayOutputInterface {
	private id: string;
	private bios: Bios;
	private element: HTMLDivElement;

	public constructor(id: string, bios: Bios) {
		this.id = id;
		this.bios = bios;

		this.generateElement();
	}

	public getStateData(): ComputerStateDataInterface {
		return <ComputerStateDataInterface>{
			bios: this.bios.getStateData(),
		};
	}

	public static fromStateData(stateData: ComputerStateDataInterface): Computer {
		return new Computer(stateData.id, Bios.fromStateData(stateData.bios));
	}

	public getId(): string {
		return this.id;
	}

	public getElement(): HTMLDivElement {
		return this.element;
	}

	private generateElement(): void {
		this.element = document.createElement('div');
		this.element.id = `computer-${this.id}`;
		this.element.classList.add('computer');
		this.element.style.width = '100%';
		this.element.style.height = '100%';
		this.element.style.backgroundColor = 'black';
		this.element.style.color = 'white';
		this.element.appendChild(this.bios.getElement());
	}
}
