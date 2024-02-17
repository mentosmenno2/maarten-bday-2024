import { AppStateDataInterface } from './AppStateDataInterface.js';

export class State {
	private static instance: State | null;

	private data: AppStateDataInterface;

	private constructor() {
		const foundState = this.getFromLocalStorage();
		if (foundState) {
			this.data = foundState;
			return;
		}

		this.data = <AppStateDataInterface>{
			computers: [],
		};
	}

	public static getInstance(): State {
		if (!this.instance) {
			this.instance = new this();
		}
		return this.instance;
	}

	public getData(): AppStateDataInterface {
		return this.data;
	}

	public save(): void {
		this.saveToLocalStorage();
	}

	private saveToLocalStorage(): void {
		localStorage.setItem('state', JSON.stringify(this.data));
	}

	private getFromLocalStorage(): AppStateDataInterface | null {
		const savedDataString = localStorage.getItem('state');
		if (!savedDataString) {
			return null;
		}

		const savedDataObject = JSON.parse(savedDataString);
		if (!savedDataObject) {
			return null;
		}

		return <AppStateDataInterface>savedDataObject;
	}
}
