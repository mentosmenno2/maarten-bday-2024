import { Authentication } from '../Authentication.js';
import { Colors } from '../Colors.js';
import { AbstractAuthenticationStep } from './AbstractAuthenticationStep.js';

export class SaySomething extends AbstractAuthenticationStep {
	private questionElement: HTMLParagraphElement;
	private answerElement: HTMLParagraphElement;
	private recognition: SpeechRecognition | null;
	private words: string = '';
	private sentence: string;
	private valdated: boolean = false;
	private buttonElement: HTMLButtonElement;

	public constructor(authentication: Authentication) {
		super(authentication);
		this.generateElement();

		const SpeechRecognition = window.SpeechRecognition
			? window.SpeechRecognition
			: window.webkitSpeechRecognition
			? window.webkitSpeechRecognition
			: null;
		this.recognition = SpeechRecognition ? new SpeechRecognition() : null;
		if (this.recognition) {
			this.recognition.continuous = true;
			this.recognition.lang = 'nl-NL';
			this.recognition.interimResults = true;
			this.recognition.maxAlternatives = 1;
		}
	}

	protected generateElement(): void {
		const headingElement = <HTMLHeadingElement>document.createElement('h2');
		headingElement.textContent = 'Zeg de volgende woorden na';

		this.sentence = this.generateRandomAnimalSentence();
		this.questionElement = <HTMLParagraphElement>document.createElement('p');
		this.questionElement.innerText = `"${this.sentence}"`;
		this.answerElement = <HTMLParagraphElement>document.createElement('p');
		this.answerElement.innerText = '...';

		this.buttonElement = <HTMLButtonElement>document.createElement('button');
		this.buttonElement.innerText = 'Mijn browser heeft geen coole features';

		this.element = <HTMLDivElement>document.createElement('div');
		this.element.classList.add('authentication-step');
		this.element.id = 'authentication-step-say-something';
		this.element.style.width = '100%';
		this.element.style.height = '100%';
		this.element.style.backgroundColor = Colors.Black;
		this.element.style.color = Colors.White;
		this.element.style.position = 'absolute';
		this.element.style.display = 'flex';
		this.element.style.flexDirection = 'column';
		this.element.style.flexWrap = 'nowrap';
		this.element.style.justifyContent = 'flex-start';
		this.element.style.alignItems = 'center';

		this.element.appendChild(headingElement);
		this.element.appendChild(this.questionElement);
		this.element.appendChild(this.answerElement);
		this.element.appendChild(this.buttonElement);
	}

	public initialize(): void {
		this.buttonElement.addEventListener(
			'click',
			this.onButtonElementClick.bind(this),
		);

		if (!this.recognition) {
			alert('Je browser heeft geen coole features, boohooo');
			return;
		}

		this.recognition.addEventListener('result', this.onWordSaid.bind(this));
		this.recognition.start();
	}

	public terminate(): void {
		this.buttonElement.removeEventListener(
			'click',
			this.onButtonElementClick.bind(this),
		);

		if (!this.recognition) {
			return;
		}

		this.recognition.stop();
		this.recognition.removeEventListener('result', this.onWordSaid.bind(this));
	}

	protected validate(): void {
		const inputString = this.words.toLowerCase();
		const answer = this.sentence.toLowerCase();
		if (inputString !== answer) {
			return;
		}

		// Prevent validation. Cannot prevent events in time as recognition fires delayed.
		if (this.valdated) {
			return;
		}
		this.valdated = true;

		alert('Die stem, die herken ik ergens van');
		return this.getAuthentication().gotToNextAuthenticationStep();
	}

	private onWordSaid(event: SpeechRecognitionEvent): void {
		const lines = [];
		for (let i = event.resultIndex; i < event.results.length; i++) {
			lines.push(event.results[i][0].transcript.trim());
		}

		this.words = lines
			.join(' ')
			.toLowerCase()
			.replace(/[^a-zA-Z0-9 ]/g, '');
		this.answerElement.textContent = this.words;
		this.validate();
	}

	private generateRandomAnimalSentence(): string {
		const subjects = [
			'De hond',
			'De kat',
			'De olifant',
			'De vogel',
			'De leeuw',
		];
		const verbs = ['jaagt', 'eet', 'springt', 'speelt', 'slaapt'];
		const objects = [
			'op een bal',
			'op een muis',
			'in het gras',
			'met een touw',
			'onder een boom',
		];

		const subject = subjects[Math.floor(Math.random() * subjects.length)];
		const verb = verbs[Math.floor(Math.random() * verbs.length)];
		const object = objects[Math.floor(Math.random() * objects.length)];

		return `${subject} ${verb} ${object}`;
	}

	private onButtonElementClick(): void {
		alert('Stoooooom');
		return this.getAuthentication().gotToNextAuthenticationStep();
	}
}
