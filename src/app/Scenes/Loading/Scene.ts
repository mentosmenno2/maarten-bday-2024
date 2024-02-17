import { AssetManager } from '../../Assets/AssetManager.js';
import { Text } from '../../GameObjects/Text.js';
import { GameWindow } from '../../GameWindow.js';
import { Position } from '../../Position.js';
import { SceneManager } from '../../SceneManager.js';
import { AbstractScene } from '../AbstractScene.js';
import { Scene as IntroScene } from '../Intro/Scene.js';

export class Scene extends AbstractScene {
	protected passedTime: number = 0;

	protected loadingText: Text;
	protected percentageText: Text;
	protected percentageLoaded: number = 0;
	protected allAssetsLoadedTimer: number = 0;

	public constructor() {
		super();
		this.loadingText = new Text();
		this.loadingText.setText('Loading...');
		this.percentageText = new Text();
		this.percentageLoaded = 0;
		this.allAssetsLoadedTimer = 0;
		this.percentageText.setText(`${Math.round(this.percentageLoaded)}%`);
	}

	public process(deltaTime: number): void {
		this.passedTime += deltaTime;
		this.processLoadingText();

		this.percentageLoaded = AssetManager.getInstance().getLoadedPercentage();
		this.processPercentageText();
		if (this.percentageLoaded >= 100) {
			this.allAssetsLoadedTimer = Math.min(
				1000,
				this.allAssetsLoadedTimer + deltaTime,
			);
		}

		if (this.allAssetsLoadedTimer >= 1000) {
			this.loadingText.setText('Ready?');
			this.percentageText.setText('Click to start');
			GameWindow.getInstance().getCanvasElement().style.cursor = 'pointer';
		}
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public onMouseClick(_position: Position): void {
		if (this.allAssetsLoadedTimer < 1000) {
			return;
		}

		AssetManager.getInstance()
			.getAudio()
			.get('buttonClick')
			.getAudioElement()
			.play();
		GameWindow.getInstance().getCanvasElement().style.cursor = 'auto';
		SceneManager.getInstance().setScene(new IntroScene());
	}

	private processLoadingText(): void {
		const gameWindow = GameWindow.getInstance();
		this.loadingText.setWidth(gameWindow.getWidth() * 0.8);
		this.loadingText.setHeight(gameWindow.getHeight() * 0.3);
		this.loadingText.setX(gameWindow.getWidth() * 0.1);
		this.loadingText.setY(gameWindow.getHeight() * 0.1);
	}

	private processPercentageText(): void {
		const gameWindow = GameWindow.getInstance();
		this.percentageText.setText(`${Math.round(this.percentageLoaded)}%`);
		this.percentageText.setWidth(gameWindow.getWidth() * 0.5);
		this.percentageText.setHeight(gameWindow.getHeight() * 0.2);
		this.percentageText.setX(gameWindow.getWidth() * 0.25);
		this.percentageText.setY(gameWindow.getHeight() * 0.7);
	}

	public draw(): void {
		this.loadingText.draw();
		this.percentageText.draw();
	}
}
