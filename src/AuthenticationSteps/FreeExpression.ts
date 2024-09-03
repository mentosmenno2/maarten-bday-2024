import { Authentication } from '../Authentication.js';
import { Colors } from '../Colors.js';
import { AbstractAuthenticationStep } from './AbstractAuthenticationStep.js';

export class FreeExpression extends AbstractAuthenticationStep {
	private canvasElement: HTMLCanvasElement;
	private formElement: HTMLFormElement;
	private drawing = false;
	private hasDrawn = false;

	public constructor(authentication: Authentication) {
		super(authentication);
		this.generateElement();
	}

	protected generateElement(): void {
		const headingElement = <HTMLHeadingElement>document.createElement('h2');
		const objectToDraw = this.getObjectToDraw();
		headingElement.textContent = `Teken je mooiste ${objectToDraw}`;

		this.canvasElement = <HTMLCanvasElement>document.createElement('canvas');
		this.canvasElement.width = 2000;
		this.canvasElement.height = 2000;
		this.canvasElement.style.width = '300px';
		this.canvasElement.style.maxWidth = 'calc( 100% - 40px )';
		this.canvasElement.style.backgroundColor = Colors.White;

		const submitInputElement = <HTMLInputElement>(
			document.createElement('input')
		);
		submitInputElement.type = 'submit';
		submitInputElement.value = 'Controleren';

		this.formElement = <HTMLFormElement>document.createElement('form');
		this.formElement.appendChild(submitInputElement);

		this.element = <HTMLDivElement>document.createElement('div');
		this.element.classList.add('authentication-step');
		this.element.id = 'authentication-step-free-expression';
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
		this.element.appendChild(this.canvasElement);
		this.element.appendChild(this.formElement);
	}

	public initialize(): void {
		this.canvasElement.addEventListener(
			'mousedown',
			this.startPosition.bind(this),
		);
		this.canvasElement.addEventListener('mouseup', this.endPosition.bind(this));
		this.canvasElement.addEventListener('mousemove', this.draw.bind(this));
		this.canvasElement.addEventListener(
			'touchstart',
			this.startPosition.bind(this),
		);
		this.canvasElement.addEventListener(
			'touchend',
			this.endPosition.bind(this),
		);
		this.canvasElement.addEventListener('touchmove', this.draw.bind(this));

		this.formElement.addEventListener('submit', this.onFormSubmit.bind(this));
	}

	public terminate(): void {
		this.canvasElement.removeEventListener(
			'mousedown',
			this.startPosition.bind(this),
		);
		this.canvasElement.removeEventListener(
			'mouseup',
			this.endPosition.bind(this),
		);
		this.canvasElement.removeEventListener('mousemove', this.draw.bind(this));
		this.canvasElement.removeEventListener(
			'touchstart',
			this.startPosition.bind(this),
		);
		this.canvasElement.removeEventListener(
			'touchend',
			this.endPosition.bind(this),
		);
		this.canvasElement.removeEventListener('touchmove', this.draw.bind(this));

		this.formElement.removeEventListener(
			'submit',
			this.onFormSubmit.bind(this),
		);
	}

	public getCanvasElement(): HTMLCanvasElement {
		return this.canvasElement;
	}

	public getFormElement(): HTMLFormElement {
		return this.formElement;
	}

	private onFormSubmit(e: SubmitEvent): void {
		e.preventDefault();
		this.validate();
	}

	protected validate(): void {
		if (!this.hasDrawn) {
			alert('Dat lijkt toch nergens op');
			return;
		}

		return this.getAuthentication().gotToNextAuthenticationStep();
	}

	private startPosition(e: TouchEvent | MouseEvent): void {
		this.drawing = true;
		this.hasDrawn = true;
		this.draw(e); // Start drawing immediately
	}

	private endPosition(e: TouchEvent | MouseEvent): void {
		this.draw(e);
		this.drawing = false;
		this.canvasElement.getContext('2d').beginPath(); // Stop drawing
	}

	private draw(e: TouchEvent | MouseEvent): void {
		if (!this.drawing) return;

		const ctx = this.canvasElement.getContext('2d');
		ctx.lineWidth = 20;
		ctx.lineCap = 'round';
		ctx.strokeStyle = 'black';

		const { x, y } = this.getScaledCoordinates(e);
		ctx.lineTo(x, y);
		ctx.stroke();
		ctx.beginPath();
		ctx.moveTo(x, y);
	}

	private getScaledCoordinates(e: TouchEvent | MouseEvent): {
		x: number;
		y: number;
	} {
		const rect = this.canvasElement.getBoundingClientRect();
		let x = 0;
		let y = 0;

		if (e instanceof TouchEvent && e.touches.length > 0) {
			x = e.touches[0].clientX - rect.left;
			y = e.touches[0].clientY - rect.top;
		} else if (e instanceof MouseEvent) {
			x = e.clientX - rect.left;
			y = e.clientY - rect.top;
		}

		x *= this.canvasElement.width / rect.width;
		y *= this.canvasElement.height / rect.height;

		return { x, y };
	}

	private getObjectToDraw(): string {
		const nouns = [
			'vrije expressie',
			'ballon',
			'fiets',
			'ijsje',
			'boom',
			'kat',
			'hond',
			'regenboog',
			'berg',
			'auto',
			'trein',
			'raket',
			'paraplu',
			'bloem',
			'vlinder',
			'taart',
			'gitaar',
			'kasteel',
			'olifant',
			'hoed',
			'kwal',
			'vlieger',
			'vuurtoren',
			'maan',
			'potlood',
			'robot',
			'schip',
			'sneeuwpop',
			'ster',
			'zonnebril',
			'tent',
			'eenhoorn',
			'vulkaan',
			'walvis',
			'molen',
			'zebra',
			'brug',
			'wolk',
			'diamant',
			'trommel',
			'veer',
			'vis',
			'bril',
			'blad',
			'paddenstoel',
			'palmboom',
			'piraat',
			'vliegtuig',
			'zeilboot',
			'paard',
			'step',
		];

		const randomIndex = Math.floor(Math.random() * nouns.length);
		return nouns[randomIndex];
	}
}
