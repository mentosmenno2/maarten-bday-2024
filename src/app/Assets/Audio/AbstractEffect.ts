import { AbstractAudio } from './AbstractAudio.js';

export abstract class AbstractEffect extends AbstractAudio {
	public constructor() {
		super();
		this.audioElement.loop = false;
	}
}
