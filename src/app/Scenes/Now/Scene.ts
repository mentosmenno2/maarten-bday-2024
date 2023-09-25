import { AssetManager } from '../../Assets/AssetManager.js';
import { Text } from '../../GameObjects/Text.js';
import { Video } from '../../GameObjects/Video.js';
import { GameWindow } from '../../GameWindow.js';
import { Position } from '../../Position.js';
import { SceneManager } from '../../SceneManager.js';
import { AbstractScene } from '../AbstractScene.js';
import { Scene as HomeScene } from '../Home/Scene.js';
import { StartingPositions as HomeStartingPositions } from '../Home/StartingPositions.js';

export class Scene extends AbstractScene {
	protected passedTime: number = 0;

	protected textToday: Text;
	protected videoToday: Video;
	protected textSkip: Text;

	public constructor() {
		super();

		this.textToday = new Text();
		this.textToday.setText('Today');
		this.textToday.setVisible(false);
		this.textToday.setOpactiy(0);

		this.videoToday = new Video();
		this.videoToday.setAsset(
			AssetManager.getInstance().getVideos().get('today'),
		);

		this.textSkip = new Text();
		this.textSkip.setText('Click to skip');

		GameWindow.getInstance().getCanvasElement().style.cursor = 'pointer';
	}

	public process(deltaTime: number): void {
		this.passedTime += deltaTime;
		this.processtextToday();
		this.processvideoToday();
		this.processTextSkip();

		if (this.passedTime >= 62000) {
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

	private processtextToday(): void {
		const gameWindow = GameWindow.getInstance();

		this.textToday.setWidth(gameWindow.getWidth() * 0.8);
		this.textToday.setHeight(gameWindow.getHeight() * 0.8);
		this.textToday.setX(gameWindow.getWidth() * 0.1);
		this.textToday.setY(gameWindow.getHeight() * 0.1);
		if (this.passedTime >= 1000 && this.passedTime <= 4000) {
			this.textToday.setVisible(true);
		} else {
			this.textToday.setVisible(false);
		}

		if (this.passedTime >= 1000 && this.passedTime <= 1500) {
			this.textToday.setOpactiy((this.passedTime - 1000) / 500);
		}
		if (this.passedTime >= 3500 && this.passedTime <= 4000) {
			this.textToday.setOpactiy(1 - (this.passedTime - 3500) / 500);
		}
	}

	private processvideoToday(): void {
		const gameWindow = GameWindow.getInstance();
		this.videoToday.setWidth(gameWindow.getWidth());
		this.videoToday.setHeight(gameWindow.getHeight());
		this.videoToday.setX(0);
		this.videoToday.setY(0);
		if (this.passedTime >= 5000 && this.passedTime <= 62000) {
			this.videoToday.setVisible(true);
			if (
				this.videoToday.getAsset().getVideoElement().paused &&
				this.videoToday.getAsset().getVideoElement().currentTime === 0
			) {
				this.videoToday.getAsset().getVideoElement().play();
			}
		} else {
			this.videoToday.setVisible(false);
			this.videoToday.getAsset().getVideoElement().pause();
			this.videoToday.getAsset().getVideoElement().currentTime = 0;
		}
	}

	public draw(): void {
		this.textToday.draw();
		this.videoToday.draw();
		this.textSkip.draw();
	}

	private goToNextScene(): void {
		this.videoToday.getAsset().getVideoElement().pause();
		GameWindow.getInstance().getCanvasElement().style.cursor = 'auto';
		SceneManager.getInstance().setScene(new HomeScene(HomeStartingPositions.PC));
	}
}
