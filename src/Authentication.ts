import { AbstractAuthenticationStep } from './AuthenticationSteps/AbstractAuthenticationStep.js';
import { EnterName } from './AuthenticationSteps/EnterName.js';
import { FreeExpression } from './AuthenticationSteps/FreeExpression.js';
import { IAmARobot } from './AuthenticationSteps/IAmARobot.js';
import { TakeAPie } from './AuthenticationSteps/TakeAPie.js';
import { WhenDoYouPressTheButton } from './AuthenticationSteps/WhenDoYouPressTheButton.js';
import { DisplayOutputInterface } from './DisplayOutputInterface.js';
import { HappyBirthdayMessage } from './HappyBirthdayMessage.js';

export class Authentication implements DisplayOutputInterface {
	private element: HTMLDivElement;

	private authenticationSteps: AbstractAuthenticationStep[];
	private authenticationStepIndex: number;
	private happyBirthdayMessage: HappyBirthdayMessage;

	public constructor() {
		this.happyBirthdayMessage = new HappyBirthdayMessage();
		this.authenticationSteps = [
			new EnterName(this),
			new TakeAPie(this),
			new FreeExpression(this),
			new IAmARobot(this),
			new WhenDoYouPressTheButton(this),
		];
		this.authenticationStepIndex = 0;
		this.generateElement();
	}

	public getElement(): HTMLDivElement {
		return this.element;
	}

	private getCurrentAuthenticationStep(): AbstractAuthenticationStep | null {
		return this.authenticationSteps[this.authenticationStepIndex] ?? null;
	}

	public gotToNextAuthenticationStep(): void {
		const authenticationStep = this.getCurrentAuthenticationStep();
		if (authenticationStep) {
			authenticationStep.terminate();
		}

		this.authenticationStepIndex++;
		this.displayCurrentAuthenticationStep();
	}

	protected displayCurrentAuthenticationStep(): void {
		this.element.innerHTML = '';
		const authenticationStep = this.getCurrentAuthenticationStep();
		if (authenticationStep) {
			this.element.appendChild(authenticationStep.getElement());
			authenticationStep.initialize();
		} else {
			this.element.appendChild(this.happyBirthdayMessage.getElement());
		}
	}

	private generateElement(): void {
		this.element = <HTMLDivElement>document.createElement('div');
		this.element.id = 'authentication';
		this.element.style.width = '100%';
		this.element.style.height = '100%';
		this.element.style.backgroundColor = 'white';
		this.element.style.color = 'black';

		this.displayCurrentAuthenticationStep();
	}
}
