import { BiosStateDataInterface } from './State/BiosStateDataInterface.js';
import { HasStateDataInterface } from './State/HasStateDataInterface.js';
import { StateDataInterface } from './State/StateDataInterface.js';

export class Bios implements HasStateDataInterface {
	constructor() {}

	public getStateData(): StateDataInterface {
		return <BiosStateDataInterface>{};
	}

	public static fromStateData(stateData: BiosStateDataInterface): Bios {
		console.log(stateData);
		return new Bios();
	}
}
