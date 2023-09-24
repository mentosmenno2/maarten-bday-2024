import { GameWindow } from '../GameWindow.js';
import { AbstractGameObject } from './AbstractGameObject.js';

export class Button extends AbstractGameObject {

	public constructor() {
		super();
	}

	public draw(): void {
		if (!this.getVisible()) {
			return;
		}

		const gameWindow = GameWindow.getInstance();
		const ctx = gameWindow.getContext2D();
		ctx.save();

		ctx.restore();

		// Debugging
		ctx.save();
		ctx.beginPath();
		ctx.lineWidth = 1;
		ctx.strokeStyle = 'red';
		ctx.rect(this.x, this.y, this.width, this.height);
		ctx.stroke();
		ctx.closePath();
		ctx.restore();
	}
}
