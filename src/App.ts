export class App {
	private static instance: App | null;

	private constructor() {}

	public static getInstance(): App {
		if (!this.instance) {
			this.instance = new this();
		}
		return this.instance;
	}

	public initialize(): void {
		this.addEventListeners();
		console.log('Initialized');
	}

	public addEventListeners(): void {

	}
}
