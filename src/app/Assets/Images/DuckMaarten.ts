import { AbstractImage } from './AbstractImage.js';

export class DuckMaarten extends AbstractImage {
	public constructor() {
		super();
		this.file = 'assets/images/ducks/maarten.png';
		this.imageElement.setAttribute('src', this.file);
		this.width = 24;
		this.height = 28;
	}
}
