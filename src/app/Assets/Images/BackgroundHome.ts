import { AbstractImage } from './AbstractImage.js';

export class BackgroundHome extends AbstractImage {
	public constructor() {
		super();
		this.file = 'assets/images/backgrounds/home.png';
		this.imageElement.setAttribute('src', this.file);
	}
}
