import { AbstractAsset } from '../AbstractAsset.js';

export abstract class AbstractVideo extends AbstractAsset {
	protected videoElement: HTMLVideoElement;

	public constructor() {
		super();
		this.videoElement = document.createElement('video');
		this.videoElement.addEventListener(
			'canplaythrough',
			this.onLoad.bind(this),
		);
	}

	public load(): void {
		this.videoElement.load();
	}

	public getVideoElement(): HTMLVideoElement {
		return this.videoElement;
	}
}
