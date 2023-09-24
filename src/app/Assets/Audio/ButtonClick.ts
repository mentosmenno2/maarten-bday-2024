import { AbstractEffect } from './AbstractEffect.js';

export class ButtonClick extends AbstractEffect {
	public constructor() {
		super();
		this.file = 'assets/audio/effects/button-click.mp3';
		this.audioElement.setAttribute('src', this.file);
	}
}
