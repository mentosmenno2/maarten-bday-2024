import { Authentication } from '../Authentication.js';
import { Colors } from '../Colors.js';
import { Console } from '../Console.js';
import { AbstractAuthenticationStep } from './AbstractAuthenticationStep.js';

export class IAmARobot extends AbstractAuthenticationStep {
	private robotInputElement: HTMLInputElement;
	private formElement: HTMLFormElement;
	private labelElement: HTMLLabelElement;
	private initialOrientation: string|null;

	public constructor(authentication: Authentication) {
		super(authentication);
		this.generateElement();
	}

	protected generateElement(): void {
		const headingElement = <HTMLHeadingElement>document.createElement('h2');
		headingElement.textContent = 'Bevestig dat je een robot bent';

		this.robotInputElement = <HTMLInputElement>document.createElement('input');
		this.robotInputElement.type = 'checkbox';
		this.robotInputElement.value = '1';
		this.robotInputElement.id = 'authentication-step-enter-name-robot-input';
		this.robotInputElement.disabled = true;

		this.labelElement = <HTMLLabelElement>document.createElement('label');
		this.labelElement.innerText = 'Ik ben een robot';
		this.labelElement.htmlFor = 'authentication-step-enter-name-robot-input';

		const robotInputWrapperElement = <HTMLDivElement>(
			document.createElement('div')
		);
		robotInputWrapperElement.style.display = 'flex';
		robotInputWrapperElement.style.flexDirection = 'row';
		robotInputWrapperElement.style.flexWrap = 'nowrap';
		robotInputWrapperElement.style.justifyContent = 'flex-start';
		robotInputWrapperElement.style.alignItems = 'center';
		robotInputWrapperElement.appendChild(this.robotInputElement);
		robotInputWrapperElement.appendChild(this.labelElement);

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
		this.formElement.appendChild(robotInputWrapperElement);
		this.formElement.appendChild(submitInputElement);

		this.element = <HTMLDivElement>document.createElement('div');
		this.element.classList.add('authentication-step');
		this.element.id = 'authentication-step-i-am-a-robot';
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
		this.formElement.addEventListener('submit', this.onFormSubmit.bind(this));
		screen.orientation.addEventListener(
			'change',
			this.onOrientationChange.bind(this),
		);

		Console.log('🔓 Vooruit, voor deze ene keer mag je hier klooien :).');

		this.initialOrientation = screen.orientation.type;
		if ('ontouchstart' in document.documentElement) {
			alert(
				'Omdat je een mobiele telefoon gebruikt, moet je even andersom denken dan anders.',
			);
		}
	}

	public terminate(): void {
		this.formElement.removeEventListener(
			'submit',
			this.onFormSubmit.bind(this),
		);

		screen.orientation.removeEventListener(
			'change',
			this.onOrientationChange.bind(this),
		);

		Console.log(
			'🔒 Klaar met de pret, de element inspector is weer verboden terrein.',
		);
	}

	public getRobotInputElement(): HTMLInputElement {
		return this.robotInputElement;
	}

	public getFormElement(): HTMLFormElement {
		return this.formElement;
	}

	private onFormSubmit(e: SubmitEvent): void {
		e.preventDefault();
		this.validate();
	}

	private onOrientationChange(): void {
		if (screen.orientation.type === 'portrait-secondary') {
			this.robotInputElement.disabled = false;
		} else if (screen.orientation.type !== this.initialOrientation) {
			this.robotInputElement.disabled = false;
		} else {
			this.robotInputElement.disabled = true;
		}
	}

	protected validate(): void {
		if (!this.getRobotInputElement().checked) {
			alert('Sorry, je bent geen robot');
			return;
		}

		alert('Beep boop, jij hoort erbij');
		return this.getAuthentication().gotToNextAuthenticationStep();
	}
}
