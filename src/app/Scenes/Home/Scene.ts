import { AssetManager } from '../../Assets/AssetManager.js';
import { Image as ImageGameObject } from '../../GameObjects/Image.js';
import { GameWindow } from '../../GameWindow.js';
import { AbstractScene } from '../AbstractScene.js';
import { StartingPositions } from './StartingPositions.js';

export class Scene extends AbstractScene {
	protected background: ImageGameObject;

	public constructor( startingPosition: StartingPositions ) {
		super();

		this.background = new ImageGameObject();
		this.background.setAsset(
			AssetManager.getInstance().getImages().get('backgroundHome'),
		);

		console.log(startingPosition);
	}

	public process(deltaTime: number): void {
		this.processBackground();

		console.log(deltaTime);
	}

	private processBackground(): void {
		const gameWindow = GameWindow.getInstance();
		this.background.setWidth(gameWindow.getWidth());
		this.background.setHeight(gameWindow.getHeight());
		this.background.setX(0);
		this.background.setY(0);
	}

	public draw(): void {
		this.background.draw();
	}
}
