import { AssetManager } from '../../Assets/AssetManager.js';
import { Text } from '../../GameObjects/Text.js';
import { Video } from '../../GameObjects/Video.js';
import { GameWindow } from '../../GameWindow.js';
import { SceneManager } from '../../SceneManager.js';
import { AbstractScene } from '../AbstractScene.js';
import { Scene as HomeScene } from '../Home/Scene.js';
import { StartingPositions as HomeStartingPositions } from '../Home/StartingPositions.js';

export class Scene extends AbstractScene {
	protected passedTime: number = 0;

	protected textToday: Text;
	protected videoToday: Video;

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
	}

	public process(deltaTime: number): void {
		this.passedTime += deltaTime;
		this.processtextToday();
		this.processvideoToday();

		if (this.passedTime >= 62000) {
			SceneManager.getInstance().setScene(new HomeScene( HomeStartingPositions.None ));
		}
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
	}
}
