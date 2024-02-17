import { BiosStateDataInterface } from './BiosStateDataInterface.js';

export interface ComputerStateDataInterface {
	id: string;
	bios: BiosStateDataInterface | null;
}
