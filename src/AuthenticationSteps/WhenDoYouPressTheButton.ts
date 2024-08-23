import { Authentication } from '../Authentication.js';
import { Colors } from '../Colors.js';
import { AbstractAuthenticationStep } from './AbstractAuthenticationStep.js';

export class WhenDoYouPressTheButton extends AbstractAuthenticationStep {
	private buttonElement: HTMLButtonElement;
	private seconds: number = 0;
	private interval: NodeJS.Timeout | null = null;

	public constructor(authentication: Authentication) {
		super(authentication);
		this.generateElement();
	}

	protected generateElement(): void {
		const headingElement = <HTMLHeadingElement>document.createElement('h2');
		headingElement.textContent = `Wanneer klik jij op de knop?`;

		this.buttonElement = <HTMLButtonElement>document.createElement('button');
		this.setGiftText();

		this.element = <HTMLDivElement>document.createElement('div');
		this.element.classList.add('authentication-step');
		this.element.id = 'authentication-step-when-do-you-press-the-button';
		this.element.style.width = '100%';
		this.element.style.height = '100%';
		this.element.style.backgroundColor = Colors.Black;
		this.element.style.color = Colors.White;
		this.element.style.position = 'absolute';

		this.element.appendChild(headingElement);
		this.element.appendChild(this.buttonElement);
	}

	public initialize(): void {
		this.interval = setInterval(() => {
			this.seconds++;
			this.setGiftText();
		}, 1000);

		this.buttonElement.addEventListener('click', this.onButtonClick.bind(this));
	}

	public terminate(): void {
		clearInterval(this.interval);
		this.interval = null;

		this.buttonElement.removeEventListener(
			'click',
			this.onButtonClick.bind(this),
		);
	}

	public getButtonElement(): HTMLButtonElement {
		return this.buttonElement;
	}

	private onButtonClick(e: SubmitEvent): void {
		e.preventDefault();
		this.validate();
	}

	protected validate(): void {
		const gift = this.getGift(this.seconds);
		if (gift) {
			alert('Ik weet wel een beter kadootje hoor!');
			return;
		}
		return this.getAuthentication().gotToNextAuthenticationStep();
	}

	private setGiftText(): void {
		let gift = this.getGift(this.seconds);
		if (!gift) {
			gift = 'verjaardagsfelicitatie van Menno';
		}

		this.buttonElement.textContent = `Klik mij om een ${gift} te krijgen`;
	}

	private getGift(index: number): string | null {
		const nouns = [
			'fiets',
			'laptop',
			'boek',
			'horloge',
			'telefoon',
			'spelcomputer',
			'gitaar',
			'camera',
			'tablet',
			'sieraad',
			'zonnebril',
			'rugzak',
			'kookboek',
			'parfum',
			'koptelefoon',
			'smartwatch',
			'fotocamera',
			'droneset',
			'buitenkeuken',
			'mountainbike',
			'skateboard',
			'robotstofzuiger',
			'sneakers',
			'gourmetset',
			'schilderij',
			'vinylplaat',
			'muziekinstrument',
			'scooter',
			'fietstas',
			'bluetooth-speaker',
			'slimme thermostaat',
			'e-reader',
			'elektrische tandenborstel',
			'droneset',
			'wijnpakket',
			'golfset',
			'fitnesstracker',
			'tuinmeubelset',
			'tent',
			'barbecue',
			'elektrische step',
			'designertas',
			'spelbord',
			'concertkaartjes',
			'theeset',
			'koffiemachine',
			'tijdschrift',
			'bioscoopbonnen',
			'reischeque',
			'cadeaubon',
		];

		const randomNullChance = Math.floor(Math.random() * (nouns.length / 5));
		if (randomNullChance === 0) {
			return null;
		}

		return nouns[index] ?? null;
	}
}
