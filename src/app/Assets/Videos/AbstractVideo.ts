import { AbstractAsset } from '../AbstractAsset.js';

export abstract class AbstractVideo extends AbstractAsset {
	protected videoElement: HTMLVideoElement;
	protected width: number;
	protected height: number;

	public constructor() {
		super();
		this.videoElement = document.createElement('video');
		this.videoElement.addEventListener(
			'canplaythrough',
			this.onLoad.bind(this),
		);
		this.videoElement.width = this.width;
		this.videoElement.height = this.height;
	}

	public load(): void {
		this.videoElement.load();
	}

	public getVideoElement(): HTMLVideoElement {
		return this.videoElement;
	}

	public getWidth(): number {
		return this.width;
	}

	public getHeight(): number {
		return this.height;
	}
}
