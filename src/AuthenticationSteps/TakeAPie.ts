import { Authentication } from '../Authentication.js';
import { Colors } from '../Colors.js';
import { AbstractAuthenticationStep } from './AbstractAuthenticationStep.js';

export class TakeAPie extends AbstractAuthenticationStep {
	private pieElement: HTMLDivElement;
	private piePercentageElement: HTMLSpanElement;
	private rangeInput: HTMLInputElement;
	private formElement: HTMLFormElement;
	private buttonLessElement: HTMLButtonElement;
	private buttonMoreElement: HTMLButtonElement;

	public constructor(authentication: Authentication) {
		super(authentication);
		this.generateElement();
	}

	protected generateElement(): void {
		const headingElement = <HTMLHeadingElement>document.createElement('h2');
		headingElement.textContent = 'Neem een taart';

		this.rangeInput = <HTMLInputElement>document.createElement('input');
		this.rangeInput.type = 'range';
		this.rangeInput.min = '0';
		this.rangeInput.max = '100';
		this.rangeInput.step = '0.01';
		this.rangeInput.value = '0';
		this.rangeInput.style.width = '150px';

		this.piePercentageElement = <HTMLSpanElement>document.createElement('span');
		this.piePercentageElement.style.textShadow = `0px 0px 5px ${Colors.Black}`;
		this.piePercentageElement.style.webkitTextStroke = `1px ${Colors.Black}`;
		this.piePercentageElement.style.fontSize = '40px';

		this.pieElement = <HTMLDivElement>document.createElement('div');
		this.pieElement.style.height = '200px';
		this.pieElement.style.maxHeight = 'calc( 100vh - 100px )';
		this.pieElement.style.aspectRatio = '1/1';
		this.pieElement.style.borderRadius = '50%';
		this.pieElement.style.border = `2px solid ${Colors.White}`;
		this.pieElement.style.display = 'flex';
		this.pieElement.style.flexDirection = 'column';
		this.pieElement.style.flexWrap = 'nowrap';
		this.pieElement.style.justifyContent = 'center';
		this.pieElement.style.alignItems = 'center';
		this.pieElement.appendChild(this.piePercentageElement);
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

		const rangeInputContainerElement = <HTMLDivElement>(
			document.createElement('div')
		);
		rangeInputContainerElement.style.display = 'flex';
		rangeInputContainerElement.style.flexDirection = 'row';
		rangeInputContainerElement.style.flexWrap = 'nowrap';
		rangeInputContainerElement.style.justifyContent = 'center';
		rangeInputContainerElement.style.alignItems = 'center';
		rangeInputContainerElement.appendChild(this.buttonLessElement);
		rangeInputContainerElement.appendChild(this.rangeInput);
		rangeInputContainerElement.appendChild(this.buttonMoreElement);

		this.formElement = <HTMLFormElement>document.createElement('form');
		this.formElement.style.display = 'flex';
		this.formElement.style.flexDirection = 'column';
		this.formElement.style.flexWrap = 'nowrap';
		this.formElement.style.justifyContent = 'flex-start';
		this.formElement.style.alignItems = 'center';
		this.formElement.appendChild(rangeInputContainerElement);
		this.formElement.appendChild(submitInputElement);

		this.element = <HTMLDivElement>document.createElement('div');
		this.element.classList.add('authentication-step');
		this.element.id = 'authentication-step-take-a-pie';
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
		this.element.appendChild(this.pieElement);
		this.element.appendChild(this.formElement);
	}

	public initialize(): void {
		this.rangeInput.addEventListener(
			'change',
			this.onRangeInputChange.bind(this),
		);
		this.rangeInput.addEventListener(
			'input',
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
		this.rangeInput.removeEventListener(
			'change',
			this.onRangeInputChange.bind(this),
		);
		this.rangeInput.removeEventListener(
			'input',
			this.onRangeInputChange.bind(this),
		);
		this.buttonLessElement.removeEventListener(
			'click',
			this.onButtonLessClick.bind(this),
		);
		this.buttonMoreElement.removeEventListener(
			'click',
			this.onButtonMoreClick.bind(this),
		);
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
		this.pieElement.style.backgroundImage = `conic-gradient(${Colors.Green} 0 ${value}%, ${Colors.Black} 0 ${empty}%)`;
		this.piePercentageElement.innerText = `${value}%`;
	}

	protected validate(): void {
		if (this.rangeInput.value !== '3.14') {
			alert('Dat is toch geen taart');
			return;
		}

		alert('lekker man, heb je al een stukje op?');
		return this.getAuthentication().gotToNextAuthenticationStep();
	}
}
