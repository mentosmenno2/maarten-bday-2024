import { AbstractVideo } from './AbstractVideo.js';

export class OneYearAgo extends AbstractVideo {

	public constructor() {
		super();
		this.file = 'assets/video/one-year-ago.mp4';
		this.videoElement.setAttribute('src', this.file);
		this.width = 1000;
		this.height = 1000;
	}
}
