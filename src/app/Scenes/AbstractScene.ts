export abstract class AbstractScene {
	public constructor() {}

	public abstract reset(): void;

	public abstract process(deltaTime: number): void;

	public abstract draw(): void;
}
