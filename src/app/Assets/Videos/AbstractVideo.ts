import { AbstractAsset } from '../AbstractAsset.js';

export abstract class AbstractVideo extends AbstractAsset {
	protected videoElement: HTMLVideoElement;

	public getVideoElement(): HTMLVideoElement {
		return this.videoElement;
	}
}
