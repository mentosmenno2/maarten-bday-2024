import { Bios } from '../Bios.js';
import { ComputerStateDataInterface } from '../State/ComputerStateDataInterface.js';
import { HasStateDataInterface } from '../State/HasStateDataInterface.js';

export class Computer implements HasStateDataInterface {
	private id: string;
	private bios: Bios;

	public constructor(id: string, bios: Bios) {
		this.id = id;
		this.bios = bios;
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
}
