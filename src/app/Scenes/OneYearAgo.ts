import { Text } from '../GameObjects/Text.js';
import { GameWindow } from '../GameWindow.js';
import { AbstractScene } from './AbstractScene.js';

export class OneYearAgo extends AbstractScene {
	protected passedTime: number = 0;

	protected textOneYearAgo: Text;

	public constructor() {
		super();

		this.textOneYearAgo = new Text();
		this.textOneYearAgo.setText('Hi het is ikke je weet wel');
		this.textOneYearAgo.setVisible(false);
	}

	public process(deltaTime: number): void {
		this.passedTime += deltaTime;
		const gameWindow = GameWindow.getInstance();
		this.textOneYearAgo.setWidth(gameWindow.getWidth() * 0.8);
		this.textOneYearAgo.setHeight(gameWindow.getHeight() * 0.8);
		this.textOneYearAgo.setX(gameWindow.getWidth() * 0.1);
		this.textOneYearAgo.setY(gameWindow.getHeight() * 0.1);
		if (this.passedTime >= 1000 && this.passedTime <= 3000) {
			this.textOneYearAgo.setVisible(true);
		} else {
			this.textOneYearAgo.setVisible(false);
		}
	}

	public draw(): void {
		this.textOneYearAgo.draw();
	}
}
