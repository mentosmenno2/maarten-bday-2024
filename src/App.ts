import { Bios } from './Bios.js';
import { Computer } from './Computers/Computer.js';
import { AppStateDataInterface } from './State/AppStateDataInterface.js';
import { HasStateDataInterface } from './State/HasStateDataInterface.js';
import { State } from './State/State.js';

export class App implements HasStateDataInterface {
	private static instance: App | null;

	private state: State;

	private computers: Computer[];

	private constructor(computers: Computer[]) {
		this.computers = computers;
	}

	public static getInstance(): App {
		if (!this.instance) {
			this.instance = this.fromStateData(State.getInstance().getData());
		}
		return this.instance;
	}

	public initialize(): void {
		// If not has computer, create computer
		if (!this.computers.length) {
			this.computers.push(new Computer('maarten', new Bios()));
		}

		console.log('initialized');
	}

	public getActiveComputer(): Computer {
		return this.computers[0];
	}

	public getState(): State {
		return this.state;
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
}
