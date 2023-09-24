export abstract class AbstractScene {
	public constructor() {}

	public abstract process(deltaTime: number): void;

	public abstract draw(): void;
}
