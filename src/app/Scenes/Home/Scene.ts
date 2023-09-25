import { AssetManager } from '../../Assets/AssetManager.js';
import { Image as ImageGameObject } from '../../GameObjects/Image.js';
import { GameWindow } from '../../GameWindow.js';
import { Position } from '../../Position.js';
import { AbstractScene } from '../AbstractScene.js';
import { StartingPositions } from './StartingPositions.js';

export class Scene extends AbstractScene {
	protected background: ImageGameObject;
	protected maarten: ImageGameObject;

	public constructor(startingPosition: StartingPositions) {
		super();

		// Create gameObjects
		this.background = new ImageGameObject();
		this.background.setAsset(
			AssetManager.getInstance().getImages().get('backgroundHome'),
		);

		this.maarten = new ImageGameObject();
		this.maarten.setAsset(
			AssetManager.getInstance().getImages().get('duckMaarten'),
		);

		// Set gameObject sizes and speeds
		this.setGameObjectSizes();

		// Set positions
		this.background.setX(0);
		this.background.setY(0);

		const maartenStartPosition =
			this.getPositionFromStartingPosition(startingPosition);
		this.maarten.setX(maartenStartPosition.getX());
		this.maarten.setY(maartenStartPosition.getY());
	}

	public process(deltaTime: number): void {
		this.setGameObjectSizes();

		console.log(deltaTime);
	}

	private setGameObjectSizes(): void {
		const gameWindow = GameWindow.getInstance();

		this.background.setWidth(gameWindow.getWidth());
		this.background.setHeight(gameWindow.getHeight());

		this.maarten.setWidth(
			this.maarten.getAsset().getWidth() * (gameWindow.getHeight() / 100),
		);
		this.maarten.setHeight(
			this.maarten.getAsset().getHeight() * (gameWindow.getHeight() / 100),
		);
	}

	public draw(): void {
		this.background.draw();
		this.maarten.draw();
	}

	getPositionFromStartingPosition(
		startingPosition: StartingPositions,
	): Position {
		const gameWindow = GameWindow.getInstance();
		const position = new Position(
			(gameWindow.getWidth() / 1000) * 300,
			(gameWindow.getHeight() / 1000) * 600,
		);
		switch (startingPosition) {
			case StartingPositions.Door:
				position.setX((gameWindow.getWidth() / 1000) * 650);
				position.setY(
					(gameWindow.getHeight() / 1000) * 700 - this.maarten.getHeight(),
				);
				break;
		}

		return position;
	}
}
