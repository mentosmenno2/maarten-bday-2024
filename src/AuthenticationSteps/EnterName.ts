import { Authentication } from '../Authentication.js';
import { Colors } from '../Colors.js';
import { AbstractAuthenticationStep } from './AbstractAuthenticationStep.js';

export class EnterName extends AbstractAuthenticationStep {
	private nameInputElement: HTMLInputElement;
	private formElement: HTMLFormElement;

	public constructor(authentication: Authentication) {
		super(authentication);
		this.generateElement();
	}

	protected generateElement(): void {
		const headingElement = <HTMLHeadingElement>document.createElement('h2');
		headingElement.textContent = 'Vul je voornaam in';

		this.nameInputElement = <HTMLInputElement>document.createElement('input');
		this.nameInputElement.type = 'text';

		const submitInputElement = <HTMLInputElement>(
			document.createElement('input')
		);
		submitInputElement.type = 'submit';
		submitInputElement.value = 'Controleren';

		this.formElement = <HTMLFormElement>document.createElement('form');
		this.formElement.style.display = 'flex';
		this.formElement.style.flexDirection = 'column';
		this.formElement.style.flexWrap = 'nowrap';
		this.formElement.style.justifyContent = 'flex-start';
		this.formElement.style.alignItems = 'center';
		this.formElement.appendChild(this.nameInputElement);
		this.formElement.appendChild(submitInputElement);

		this.element = <HTMLDivElement>document.createElement('div');
		this.element.classList.add('authentication-step');
		this.element.id = 'authentication-step-enter-name';
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
		this.element.appendChild(this.formElement);
	}

	public initialize(): void {
		this.nameInputElement.addEventListener(
			'input',
			this.onNameInput.bind(this),
		);
		this.formElement.addEventListener('submit', this.onFormSubmit.bind(this));
	}

	public terminate(): void {
		this.nameInputElement.removeEventListener(
			'input',
			this.onNameInput.bind(this),
		);
		this.formElement.removeEventListener(
			'submit',
			this.onFormSubmit.bind(this),
		);
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
		const allowedNames = ['maarten', 'xdbyss']; // xdbyss = cheats

		if (
			!allowedNames.includes(this.getNameInputElement().value.toLowerCase())
		) {
			alert('Verkeerde naam');
			return;
		}

		alert(
			'Correct! Het was knap geweest als het hier al mis zou gaan natuurlijk',
		);
		return this.getAuthentication().gotToNextAuthenticationStep();
	}

	private onNameInput(e: InputEvent): void {
		e.preventDefault();

		const value = this.nameInputElement.value;
		if (value.length > 1) {
			let shifted = '';
			for (let i = 0; i < value.length - 1; i++) {
				shifted += this.shiftLetterDown(value[i]);
			}
			shifted += value[value.length - 1];
			this.nameInputElement.value = shifted;
		}
	}

	private shiftLetterDown(letter: string): string {
		if (letter === 'A') return 'Z';
		if (letter === 'a') return 'z';

		const code = letter.charCodeAt(0);
		return String.fromCharCode(code - 1);
	}
}
