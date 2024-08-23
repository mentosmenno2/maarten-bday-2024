import { Authentication } from '../Authentication.js';
import { AbstractAuthenticationStep } from './AbstractAuthenticationStep.js';

export class TakeAPie extends AbstractAuthenticationStep {
	private pieElement: HTMLDivElement;
	private rangeInput: HTMLInputElement;
	private formElement: HTMLFormElement;
	private buttonLessElement: HTMLButtonElement;
	private buttonMoreElement: HTMLButtonElement;

	public constructor(authentication: Authentication) {
		super(authentication);
		this.generateElement();
	}

	protected generateElement(): void {
		const headingElement = <HTMLHeadingElement>document.createElement('h1');
		headingElement.textContent = 'Neem een taart';

		this.pieElement = <HTMLDivElement>document.createElement('div');
		this.pieElement.style.height = '200px';
		this.pieElement.style.maxHeight = 'calc( 100vh - 100px )';
		this.pieElement.style.aspectRatio = '1/1';
		this.pieElement.style.borderRadius = '50%';

		this.rangeInput = <HTMLInputElement>document.createElement('input');
		this.rangeInput.type = 'range';
		this.rangeInput.min = '0';
		this.rangeInput.max = '100';
		this.rangeInput.step = '0.01';
		this.rangeInput.value = '0';
		this.showValueOnPie(Number(this.rangeInput.value));

		this.buttonLessElement = <HTMLButtonElement>(
			document.createElement('button')
		);
		this.buttonLessElement.innerText = '<';
		this.buttonLessElement.type = 'button';

		this.buttonMoreElement = <HTMLButtonElement>(
			document.createElement('button')
		);
		this.buttonMoreElement.innerText = '>';
		this.buttonMoreElement.type = 'button';

		const submitInputElement = <HTMLInputElement>(
			document.createElement('input')
		);
		submitInputElement.type = 'submit';
		submitInputElement.value = 'Controleren';

		this.formElement = <HTMLFormElement>document.createElement('form');
		this.formElement.appendChild(this.buttonLessElement);
		this.formElement.appendChild(this.rangeInput);
		this.formElement.appendChild(this.buttonMoreElement);
		this.formElement.appendChild(submitInputElement);

		this.element = <HTMLDivElement>document.createElement('div');
		this.element.classList.add('authentication-step');
		this.element.id = 'authentication-step-take-a-pie';
		this.element.style.width = '100%';
		this.element.style.height = '100%';
		this.element.style.backgroundColor = 'white';
		this.element.style.color = 'black';

		this.element.appendChild(headingElement);
		this.element.appendChild(this.pieElement);
		this.element.appendChild(this.formElement);
	}

	public initialize(): void {
		this.rangeInput.addEventListener(
			'change',
			this.onRangeInputChange.bind(this),
		);
		this.buttonLessElement.addEventListener(
			'click',
			this.onButtonLessClick.bind(this),
		);
		this.buttonMoreElement.addEventListener(
			'click',
			this.onButtonMoreClick.bind(this),
		);
		this.formElement.addEventListener('submit', this.onFormSubmit.bind(this));
	}

	public terminate(): void {
		this.formElement.removeEventListener(
			'submit',
			this.onFormSubmit.bind(this),
		);
	}

	public getPieElement(): HTMLDivElement {
		return this.pieElement;
	}

	public getFormElement(): HTMLFormElement {
		return this.formElement;
	}

	private onRangeInputChange(): void {
		this.showValueOnPie(Number(this.rangeInput.value));
	}

	private onButtonLessClick(): void {
		this.rangeInput.value = String(
			Math.max(
				Number(this.rangeInput.value) - Number(this.rangeInput.step),
				Number(this.rangeInput.min),
			),
		);
		this.rangeInput.dispatchEvent(new Event('change'));
	}

	private onButtonMoreClick(): void {
		this.rangeInput.value = String(
			Math.min(
				Number(this.rangeInput.value) + Number(this.rangeInput.step),
				Number(this.rangeInput.max),
			),
		);
		this.rangeInput.dispatchEvent(new Event('change'));
	}

	private onFormSubmit(e: SubmitEvent): void {
		e.preventDefault();
		this.validate();
	}

	private showValueOnPie(value: number): void {
		const empty = 100 - value;
		this.pieElement.style.backgroundImage = `conic-gradient(orange 0 ${value}%, black 0 ${empty}%)`;
		this.pieElement.innerText = `${value}%`;
	}

	protected validate(): void {
		if (this.rangeInput.value !== '3.14') {
			alert('Dat is toch geen taart');
			return;
		}
		return this.getAuthentication().gotToNextAuthenticationStep();
	}
}
