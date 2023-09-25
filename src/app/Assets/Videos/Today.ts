import { AbstractVideo } from './AbstractVideo.js';

export class Today extends AbstractVideo {
	public constructor() {
		super();
		this.file = 'assets/video/today.mp4';
		this.videoElement.setAttribute('src', this.file);
	}
}
