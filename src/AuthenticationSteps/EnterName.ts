import { Authentication } from '../Authentication.js';
import { AbstractAuthenticationStep } from './AbstractAuthenticationStep.js';

export class EnterName extends AbstractAuthenticationStep {
	private nameInputElement: HTMLInputElement;
	private formElement: HTMLFormElement;

	public constructor(authentication: Authentication) {
		super(authentication);
		this.generateElement();
	}

	protected generateElement(): void {
		this.nameInputElement = <HTMLInputElement>document.createElement('input');
		this.nameInputElement.type = 'text';

		const submitInputElement = <HTMLInputElement>(
			document.createElement('input')
		);
		submitInputElement.type = 'submit';

		this.formElement = <HTMLFormElement>document.createElement('form');
		this.formElement.appendChild(this.nameInputElement);
		this.formElement.appendChild(submitInputElement);
		this.formElement.addEventListener('submit', this.onFormSubmit.bind(this));

		this.element = <HTMLDivElement>document.createElement('div');
		this.element.classList.add('authentication-step');
		this.element.id = 'authentication-step-enter-name';
		this.element.style.width = '100%';
		this.element.style.height = '100%';
		this.element.style.backgroundColor = 'white';
		this.element.style.color = 'black';

		this.element.appendChild(this.formElement);
	}

	public getNameInputElement(): HTMLInputElement {
		return this.nameInputElement;
	}

	public getFormElement(): HTMLFormElement {
		return this.formElement;
	}

	private onFormSubmit(e: SubmitEvent): void {
		e.preventDefault();
		this.validate();
	}

	protected validate(): void {
		if (this.getNameInputElement().value.toLowerCase() !== 'maarten') {
			alert('Verkeerde naam');
			return;
		}

		return this.getAuthentication().gotToNextAuthenticationStep();
	}
}
