import { AbstractAsset } from '../AbstractAsset.js';

export abstract class AbstractAudio extends AbstractAsset {
	protected audioElement: HTMLAudioElement;

	public constructor() {
		super();
		this.audioElement = new Audio( this.file );
		this.audioElement.addEventListener(
			'canplaythrough',
			this.onLoad.bind(this),
		);
	}

	public load(): void {
		this.audioElement.load();
	}

	public getAudioElement(): HTMLAudioElement {
		return this.audioElement;
	}
}
