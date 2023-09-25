import { AbstractGameObject } from './AbstractGameObject.js';

export class Invisible extends AbstractGameObject {
	public constructor() {
		super();
	}

	public draw(): void {
		if (!this.visible) {
			return;
		}

		this.drawDebugData();
	}
}
