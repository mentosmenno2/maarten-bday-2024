import { Authentication } from '../Authentication.js';
import { DisplayOutputInterface } from '../DisplayOutputInterface.js';

export abstract class AbstractAuthenticationStep
	implements DisplayOutputInterface
{
	protected element: HTMLDivElement;
	private authentication: Authentication;

	public constructor(authentication: Authentication) {
		this.authentication = authentication;
		this.generateElement();
	}

	public getElement(): HTMLDivElement {
		return this.element;
	}

	protected abstract generateElement(): void;

	public getAuthentication(): Authentication {
		return this.authentication;
	}

	protected abstract validate(): void;
}
