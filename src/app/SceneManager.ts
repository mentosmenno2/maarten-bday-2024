import { AbstractScene } from './Scenes/AbstractScene.js';
import { OneYearAgo } from './Scenes/OneYearAgo.js';

export class SceneManager {
	private static instance: SceneManager | null;

	protected scene: AbstractScene;

	private constructor() {
		this.scene = new OneYearAgo();
	}

	public static getInstance(): SceneManager {
		if (!this.instance) {
			this.instance = new this();
		}
		return this.instance;
	}

	public getScene(): AbstractScene {
		return this.scene;
	}
}
