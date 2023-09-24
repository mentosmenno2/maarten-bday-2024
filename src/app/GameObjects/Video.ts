import { AbstractVideo } from '../Assets/Videos/AbstractVideo.js';
import { GameWindow } from '../GameWindow.js';
import { AbstractGameObject } from './AbstractGameObject.js';

export class Video extends AbstractGameObject {
	protected asset: AbstractVideo;

	public constructor() {
		super();
	}

	public getAsset(): AbstractVideo {
		return this.asset;
	}

	public setAsset(asset: AbstractVideo): void {
		this.asset = asset;
	}

	public draw(): void {
		if (!this.getVisible()) {
			return;
		}

		const gameWindow = GameWindow.getInstance();
		const ctx = gameWindow.getContext2D();
		ctx.save();
		ctx.drawImage(
			this.asset.getVideoElement(),
			this.x,
			this.y,
			this.width,
			this.height,
		);
		ctx.restore();

		// Debugging
		ctx.save();
		ctx.beginPath();
		ctx.lineWidth = 1;
		ctx.strokeStyle = 'red';
		ctx.rect(this.x, this.y, this.width, this.height);
		ctx.stroke();
		ctx.restore();
	}
}
