import { GameWindow } from '../GameWindow.js';
import { AbstractGameObject } from './AbstractGameObject.js';

export class Text extends AbstractGameObject {
	protected text: string;
	protected fontFamily: string = "'VT323'";
	protected fillStyle: CanvasFillStrokeStyles['fillStyle'] = '#cccccc';

	public constructor() {
		super();
	}

	public getText(): string {
		return this.text;
	}

	public setText(text: string): void {
		this.text = text;
	}

	public getFillStyle(): CanvasFillStrokeStyles['fillStyle'] {
		return this.fillStyle;
	}

	public setFillStyle(fillStyle: CanvasFillStrokeStyles['fillStyle']): void {
		this.fillStyle = fillStyle;
	}

	public draw(): void {
		if (!this.getVisible()) {
			return;
		}

		const gameWindow = GameWindow.getInstance();
		const ctx = gameWindow.getContext2D();
		ctx.save();
		let fontSize = 0;
		let textWidth = 0;
		let textHeight = 0;
		// eslint-disable-next-line no-constant-condition
		while (true) {
			ctx.font = `${fontSize}px ${this.fontFamily}`;
			const metrics = ctx.measureText(this.text);
			textWidth = metrics.width;
			textHeight =
				metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent;
			if (textWidth > this.width || textHeight > this.height) {
				break;
			}
			fontSize++;
		}
		ctx.fillStyle = this.fillStyle;
		ctx.textAlign = 'start';
		ctx.textBaseline = 'top';

		const textX = this.x + (this.width - textWidth) / 2;
		const textY = this.y + (this.height - textHeight) / 2;
		ctx.fillText(this.text, textX, textY);
		ctx.restore();

		ctx.save();
		ctx.beginPath();
		ctx.lineWidth = 1;
		ctx.strokeStyle = 'red';
		ctx.rect(this.x, this.y, this.width, this.height);
		ctx.stroke();
		ctx.restore();
	}
}
