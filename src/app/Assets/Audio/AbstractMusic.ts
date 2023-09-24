import { AbstractAudio } from './AbstractAudio.js';

export abstract class AbstractMusic extends AbstractAudio {
	public constructor() {
		super();
		this.audioElement.loop = true;
	}
}
