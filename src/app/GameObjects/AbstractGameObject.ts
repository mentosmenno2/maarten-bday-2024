import { Game } from '../Game.js';
import { GameWindow } from '../GameWindow.js';

export abstract class AbstractGameObject {
	protected visible: boolean = true;
	protected x: number = 0;
	protected y: number = 0;
	protected width: number = 0;
	protected height: number = 0;
	protected opacity: number = 1;

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

	public getOpacity(): number {
		return this.opacity;
	}

	public setOpactiy(opacity: number): void {
		this.opacity = opacity;
	}

	public abstract draw(): void;

	protected drawDebugData(): void {
		if (!this.visible) {
			return;
		}

		if (!Game.getInstance().isDebugMode()) {
			return;
		}

		const gameWindow = GameWindow.getInstance();
		const ctx = gameWindow.getContext2D();

		// Draw outline
		ctx.save();
		ctx.beginPath();
		ctx.lineWidth = 1;
		ctx.strokeStyle = 'red';
		ctx.rect(this.x, this.y, this.width, this.height);
		ctx.stroke();
		ctx.closePath();
		ctx.restore();

		// Draw position
		ctx.save();
		ctx.font = "10px 'VT323'";
		ctx.fillStyle = 'red';
		ctx.textAlign = 'start';
		ctx.textBaseline = 'top';
		ctx.globalAlpha = this.opacity;
		ctx.fillText(`x: ${Math.round(this.x)}`, this.x + 2, this.y + 2);
		ctx.fillText(`y: ${Math.round(this.y)}`, this.x + 2, this.y + 12);
		ctx.restore();

		// Draw size and opacity
		ctx.save();
		ctx.font = "10px 'VT323'";
		ctx.fillStyle = 'red';
		ctx.textAlign = 'start';
		ctx.textBaseline = 'top';
		ctx.globalAlpha = this.opacity;
		const widthText = `w: ${Math.round(this.width)}`;
		const widthTextMetrics = ctx.measureText(widthText);
		ctx.fillText(
			widthText,
			this.x + this.width - widthTextMetrics.width - 2,
			this.y +
				this.height -
				(widthTextMetrics.fontBoundingBoxAscent +
					widthTextMetrics.fontBoundingBoxDescent) -
				22,
		);
		const heightText = `h: ${Math.round(this.height)}`;
		const HeightTextMetrics = ctx.measureText(heightText);
		ctx.fillText(
			heightText,
			this.x + this.width - HeightTextMetrics.width - 2,
			this.y +
				this.height -
				(HeightTextMetrics.fontBoundingBoxAscent +
					HeightTextMetrics.fontBoundingBoxDescent) -
				12,
		);
		const opacityText = `o: ${Math.round(this.height)}`;
		const OpactiyTextMetrics = ctx.measureText(heightText);
		ctx.fillText(
			opacityText,
			this.x + this.width - OpactiyTextMetrics.width - 2,
			this.y +
				this.height -
				(OpactiyTextMetrics.fontBoundingBoxAscent +
					OpactiyTextMetrics.fontBoundingBoxDescent) -
				2,
		);
		ctx.restore();
	}
}
