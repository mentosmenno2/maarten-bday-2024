import { AbstractImage } from '../Assets/Images/AbstractImage.js';
import { GameWindow } from '../GameWindow.js';
import { AbstractGameObject } from './AbstractGameObject.js';

export class Image extends AbstractGameObject {
	protected asset: AbstractImage;

	public constructor() {
		super();
	}

	public getAsset(): AbstractImage {
		return this.asset;
	}

	public setAsset(asset: AbstractImage): void {
		this.asset = asset;
	}

	public draw(): void {
		if (!this.visible) {
			return;
		}

		const gameWindow = GameWindow.getInstance();
		const ctx = gameWindow.getContext2D();
		ctx.save();
		ctx.imageSmoothingEnabled = false;
		ctx.drawImage(
			this.asset.getImageElement(),
			this.x,
			this.y,
			this.width,
			this.height,
		);
		ctx.restore();

		this.drawDebugData();
	}
}
