import { AssetManager } from './Assets/AssetManager.js';
import { GameWindow } from './GameWindow.js';
import { SceneManager } from './SceneManager.js';

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
		AssetManager.getInstance().loadAssets();
		window.requestAnimationFrame(this.loop.bind(this));
	}

	public addEventListeners(): void {
		GameWindow.getInstance().addEventListeners();
		AssetManager.getInstance().addEventListeners();
	}

	public loop(timestamp: number): void {
		if (this.lastLoopTimestamp === null) {
			this.lastLoopTimestamp = timestamp;
		}

		const deltaTime = timestamp - this.lastLoopTimestamp;
		this.processPhase(deltaTime);
		this.lastLoopTimestamp = timestamp;
		this.drawPhase();
		window.requestAnimationFrame(this.loop.bind(this));
	}

	private processPhase(deltaTime: number): void {
		SceneManager.getInstance().getScene().process(deltaTime);
	}

	private drawPhase(): void {
		const gameWindow = GameWindow.getInstance();
		const ctx = gameWindow.getContext2D();
		ctx.clearRect(0, 0, gameWindow.getWidth(), gameWindow.getHeight());

		SceneManager.getInstance().getScene().draw();
	}

	public isDebugMode(): boolean {
		const urlObject = new URL(window.location.href);
		const value = urlObject.searchParams.get( 'debug' );
		return value === 'true';
	}
}
