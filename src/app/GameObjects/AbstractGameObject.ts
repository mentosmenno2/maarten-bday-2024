export abstract class AbstractGameObject {
	protected visible: boolean = true;
	protected x: number = 0;
	protected y: number = 0;
	protected width: number = 0;
	protected height: number = 0;

	public constructor() {}

	public getVisible(): boolean {
		return this.visible;
	}

	public setVisible(visible: boolean): void {
		this.visible = visible;
	}

	public getX(): number {
		return this.x;
	}

	public setX(x: number): void {
		this.x = x;
	}

	public getY(): number {
		return this.y;
	}

	public setY(y: number): void {
		this.y = y;
	}

	public getWidth(): number {
		return this.width;
	}

	public setWidth(width: number): void {
		this.width = width;
	}

	public getHeight(): number {
		return this.height;
	}

	public setHeight(height: number): void {
		this.height = height;
	}

	public abstract draw(): void;
}
