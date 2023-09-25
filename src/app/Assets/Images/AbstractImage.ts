import { AbstractAsset } from '../AbstractAsset.js';

export abstract class AbstractImage extends AbstractAsset {
	protected imageElement: HTMLImageElement;
	protected width: number;
	protected height: number;

	public constructor() {
		super();
		this.imageElement = new Image();
		this.imageElement.addEventListener('load', this.onLoad.bind(this));
	}

	public load(): void {}

	public getImageElement(): HTMLImageElement {
		return this.imageElement;
	}

	public getWidth(): number {
		return this.width;
	}

	public getHeight(): number {
		return this.height;
	}
}
