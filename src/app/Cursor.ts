import { GameWindow } from './GameWindow.js';

export class Cursor {
	private static instance: Cursor | null;
	private x: number = 0;
	private y: number = 0;

	private constructor() {}

	public static getInstance(): Cursor {
		if (!this.instance) {
			this.instance = new this();
		}
		return this.instance;
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

	public drawDebugData(): void {
		const gameWindow = GameWindow.getInstance();
		const ctx = gameWindow.getContext2D();

		// Draw outline
		ctx.save();
		ctx.beginPath();
		ctx.lineWidth = 1;
		ctx.strokeStyle = 'red';
		ctx.arc(this.x, this.y, 3, 0, 2 * Math.PI);
		ctx.stroke();
		ctx.closePath();
		ctx.restore();

		// Draw position
		ctx.save();
		ctx.font = "10px 'VT323'";
		ctx.fillStyle = 'red';
		ctx.textAlign = 'start';
		ctx.textBaseline = 'top';
		ctx.fillText(`x: ${Math.round(this.x)}`, this.x + 2, this.y - 22);
		ctx.fillText(`y: ${Math.round(this.y)}`, this.x + 2, this.y - 12);
		ctx.restore();
	}
}
