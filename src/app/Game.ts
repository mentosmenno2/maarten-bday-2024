import { GameWindow } from './GameWindow.js';

export class Game {
	private static instance: Game | null;

	public lastLoopTimestamp: number | null = null;

	private constructor() {}

	public static getInstance(): Game {
		if (!this.instance) {
			this.instance = new this();
		}
		return this.instance;
	}

	public initialize(): void {
		this.addEventListeners();
		window.requestAnimationFrame(this.loop.bind(this));
	}

	public addEventListeners(): void {
		GameWindow.getInstance().addEventListeners();
	}

	public loop(timestamp: number): void {
		if (this.lastLoopTimestamp === null) {
			this.lastLoopTimestamp = timestamp;
		}

		const deltaTime = timestamp - this.lastLoopTimestamp;
		this.processPhase(deltaTime);
		this.drawPhase();
		window.requestAnimationFrame(this.loop.bind(this));
	}

	private processPhase(deltaTime: number): void {}

	private drawPhase(): void {
		const gameWindow = GameWindow.getInstance();
		const ctx = gameWindow.getContext2D();
		ctx.clearRect(0, 0, gameWindow.getWidth(), gameWindow.getHeight());
	}
}
