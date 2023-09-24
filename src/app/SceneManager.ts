import { AbstractScene } from './Scenes/AbstractScene.js';
import { Scene as LoadingScene } from './Scenes/Loading/Scene.js';

export class SceneManager {
	private static instance: SceneManager | null;

	protected scene: AbstractScene;

	private constructor() {
		this.scene = new LoadingScene();
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

	public setScene(scene: AbstractScene): void {
		this.scene = scene;
	}
}
