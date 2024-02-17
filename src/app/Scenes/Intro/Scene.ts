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

	protected textIntro: Text;
	protected videoIntro: Video;
	protected textSkip: Text;

	public constructor() {
		super();

		this.textIntro = new Text();
		this.textIntro.setText('Intro');
		this.textIntro.setVisible(false);
		this.textIntro.setOpactiy(0);

		this.videoIntro = new Video();
		this.videoIntro.setAsset(
			AssetManager.getInstance().getVideos().get('intro'),
		);

		this.textSkip = new Text();
		this.textSkip.setText('Click to skip');

		GameWindow.getInstance().getCanvasElement().style.cursor = 'pointer';
	}

	public process(deltaTime: number): void {
		this.passedTime += deltaTime;
		this.processtextIntro();
		this.processvideoIntro();
		this.processTextSkip();

		if (this.passedTime >= 115000) {
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
		this.textSkip.setX(gameWindow.getWidth() - this.textSkip.getWidth() - 10);
		this.textSkip.setY(gameWindow.getHeight() - this.textSkip.getHeight() - 10);
	}

	private processtextIntro(): void {
		const gameWindow = GameWindow.getInstance();

		this.textIntro.setWidth(gameWindow.getWidth() * 0.8);
		this.textIntro.setHeight(gameWindow.getHeight() * 0.8);
		this.textIntro.setX(gameWindow.getWidth() * 0.1);
		this.textIntro.setY(gameWindow.getHeight() * 0.1);
		if (this.passedTime >= 1000 && this.passedTime <= 4000) {
			this.textIntro.setVisible(true);
		} else {
			this.textIntro.setVisible(false);
		}

		if (this.passedTime >= 1000 && this.passedTime <= 1500) {
			this.textIntro.setOpactiy((this.passedTime - 1000) / 500);
		}
		if (this.passedTime >= 3500 && this.passedTime <= 4000) {
			this.textIntro.setOpactiy(1 - (this.passedTime - 3500) / 500);
		}
	}

	private processvideoIntro(): void {
		const gameWindow = GameWindow.getInstance();
		this.videoIntro.setWidth(gameWindow.getWidth());
		this.videoIntro.setHeight(gameWindow.getHeight());
		this.videoIntro.setX(0);
		this.videoIntro.setY(0);
		if (this.passedTime >= 5000 && this.passedTime <= 115000) {
			this.videoIntro.setVisible(true);
			if (
				this.videoIntro.getAsset().getVideoElement().paused &&
				this.videoIntro.getAsset().getVideoElement().currentTime === 0
			) {
				this.videoIntro.getAsset().getVideoElement().play();
			}
		} else {
			this.videoIntro.setVisible(false);
			this.videoIntro.getAsset().getVideoElement().pause();
			this.videoIntro.getAsset().getVideoElement().currentTime = 0;
		}
	}

	public draw(): void {
		this.textIntro.draw();
		this.videoIntro.draw();
		this.textSkip.draw();
	}

	private goToNextScene(): void {
		this.videoIntro.getAsset().getVideoElement().pause();
		GameWindow.getInstance().getCanvasElement().style.cursor = 'auto';
		SceneManager.getInstance().setScene(
			new HomeScene(HomeStartingPositions.PC),
		);
	}
}
