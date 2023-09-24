import { Position } from '../Position.js';

export abstract class AbstractScene {
	public constructor() {}

	public abstract process(deltaTime: number): void;

	public abstract draw(): void;

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public onMouseClick(_position: Position): void {}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public onMouseMove(_position: Position): void {}
}
