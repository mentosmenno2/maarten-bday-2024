import { AbstractVideo } from "./AbstractVideo.js";

export class OneYearAgo extends AbstractVideo {

	public constructor() {
		super();
		this.file = 'assets/video/one-year-ago.mp4';
		this.videoElement = document.createElement('video');
		this.videoElement.setAttribute('src', this.file);
	}


}
