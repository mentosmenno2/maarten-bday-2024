import { Colors } from './Colors.js';
import { DisplayOutputInterface } from './DisplayOutputInterface.js';

export class HappyBirthdayMessage implements DisplayOutputInterface {
	private element: HTMLDivElement;

	private audioElement: HTMLAudioElement;

	public constructor() {
		this.generateElement();
	}

	public getElement(): HTMLDivElement {
		return this.element;
	}

	private generateElement(): void {
		const headingElement = <HTMLHeadingElement>document.createElement('h2');
		headingElement.textContent = 'Happy birthday Maarten!';

		const imageElement = <HTMLImageElement>document.createElement('img');
		imageElement.alt = 'Evil Duck';
		imageElement.src = './assets/images/evil-duck.png';
		imageElement.style.imageRendering = 'pixelated';
		imageElement.style.height = '400px';
		imageElement.style.maxHeight = 'calc( 100% - 200px )';
		imageElement.style.animation = 'spin 4s linear infinite';

		const linkElement = <HTMLAnchorElement>document.createElement('a');
		linkElement.href = 'https://github.com/mentosmenno2/maarten-bday-2024/';
		linkElement.innerText = 'GitHub';

		this.audioElement = <HTMLAudioElement>document.createElement('audio');
		this.audioElement.src = './assets/audio/happy-bday.mp3';
		this.audioElement.autoplay = false;
		this.audioElement.controls = true;
		this.audioElement.loop = true;
		this.audioElement.preload = 'auto';

		this.element = <HTMLDivElement>document.createElement('div');
		this.element.id = 'happy-birthday-message';
		this.element.style.width = '100%';
		this.element.style.height = '100%';
		this.element.style.color = Colors.White;
		this.element.style.position = 'absolute';
		this.element.style.display = 'flex';
		this.element.style.flexDirection = 'column';
		this.element.style.flexWrap = 'nowrap';
		this.element.style.justifyContent = 'flex-start';
		this.element.style.alignItems = 'center';
		this.element.appendChild(headingElement);
		this.element.appendChild(imageElement);
		this.element.appendChild(this.audioElement);
		this.element.style.animation = 'glow 10s linear infinite';
	}

	public initialize(): void {
		this.audioElement.play();
	}
}
