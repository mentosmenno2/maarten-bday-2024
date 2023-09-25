import { AssetManager } from '../../Assets/AssetManager.js';
import { Text } from '../../GameObjects/Text.js';
import { Video } from '../../GameObjects/Video.js';
import { GameWindow } from '../../GameWindow.js';
import { Position } from '../../Position.js';
import { SceneManager } from '../../SceneManager.js';
import { AbstractScene } from '../AbstractScene.js';
import { Scene as NowScene } from '../Now/Scene.js';

export class Scene extends AbstractScene {
	protected passedTime: number = 0;

	protected textOneYearAgo: Text;
	protected videoOneYearAgo: Video;
	protected textSkip: Text;

	public constructor() {
		super();

		this.textOneYearAgo = new Text();
		this.textOneYearAgo.setText('One year ago');
		this.textOneYearAgo.setVisible(false);
		this.textOneYearAgo.setOpactiy(0);

		this.videoOneYearAgo = new Video();
		this.videoOneYearAgo.setAsset(
			AssetManager.getInstance().getVideos().get('oneYearAgo'),
		);

		this.textSkip = new Text();
		this.textSkip.setText('Click to skip');

		GameWindow.getInstance().getCanvasElement().style.cursor = 'pointer';
	}

	public process(deltaTime: number): void {
		this.passedTime += deltaTime;
		this.processTextOneYearAgo();
		this.processVideoOneYearAgo();
		this.processTextSkip();

		if (this.passedTime >= 50000) {
			this.goToNextScene();
		}
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public onMouseClick(_position: Position): void {
		AssetManager.getInstance()
			.getAudio()
			.get('buttonClick')
			.getAudioElement()
			.play();
		this.goToNextScene();
	}

	private processTextSkip(): void {
		const gameWindow = GameWindow.getInstance();
		this.textSkip.setWidth(gameWindow.getWidth() * 0.2);
		this.textSkip.setHeight(gameWindow.getHeight() * 0.1);
		this.textSkip.setX(gameWindow.getWidth() - this.textSkip.getWidth() - 10 );
		this.textSkip.setY(gameWindow.getHeight() - this.textSkip.getHeight() - 10 );
	}

	private processTextOneYearAgo(): void {
		const gameWindow = GameWindow.getInstance();
		this.textOneYearAgo.setWidth(gameWindow.getWidth() * 0.8);
		this.textOneYearAgo.setHeight(gameWindow.getHeight() * 0.8);
		this.textOneYearAgo.setX(gameWindow.getWidth() * 0.1);
		this.textOneYearAgo.setY(gameWindow.getHeight() * 0.1);
		if (this.passedTime >= 1000 && this.passedTime <= 4000) {
			this.textOneYearAgo.setVisible(true);
		} else {
			this.textOneYearAgo.setVisible(false);
		}

		if (this.passedTime >= 1000 && this.passedTime <= 1500) {
			this.textOneYearAgo.setOpactiy((this.passedTime - 1000) / 500);
		}
		if (this.passedTime >= 3500 && this.passedTime <= 4000) {
			this.textOneYearAgo.setOpactiy(1 - (this.passedTime - 3500) / 500);
		}
	}

	private processVideoOneYearAgo(): void {
		const gameWindow = GameWindow.getInstance();
		this.videoOneYearAgo.setWidth(gameWindow.getWidth());
		this.videoOneYearAgo.setHeight(gameWindow.getHeight());
		this.videoOneYearAgo.setX(0);
		this.videoOneYearAgo.setY(0);
		if (this.passedTime >= 5000 && this.passedTime <= 50000) {
			this.videoOneYearAgo.setVisible(true);
			if (
				this.videoOneYearAgo.getAsset().getVideoElement().paused &&
				this.videoOneYearAgo.getAsset().getVideoElement().currentTime === 0
			) {
				this.videoOneYearAgo.getAsset().getVideoElement().play();
			}
		} else {
			this.videoOneYearAgo.setVisible(false);
			this.videoOneYearAgo.getAsset().getVideoElement().pause();
			this.videoOneYearAgo.getAsset().getVideoElement().currentTime = 0;
		}
	}

	public draw(): void {
		this.textOneYearAgo.draw();
		this.videoOneYearAgo.draw();
		this.textSkip.draw();
	}

	private goToNextScene(): void {
		this.videoOneYearAgo.getAsset().getVideoElement().pause();
		GameWindow.getInstance().getCanvasElement().style.cursor = 'auto';
		SceneManager.getInstance().setScene(new NowScene());
	}
}
