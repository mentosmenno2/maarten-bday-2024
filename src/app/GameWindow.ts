import { Position } from './Position.js';
import { SceneManager } from './SceneManager.js';

export class GameWindow {
	private static instance: GameWindow | null;

	private canvasElement: HTMLCanvasElement;
	private context2D: CanvasRenderingContext2D;
	private width: number;
	private height: number;

	private constructor() {
		this.canvasElement = <HTMLCanvasElement>(
			document.getElementById('game-window')
		);
		this.setSizeFromOffsetSize();
		this.context2D = this.canvasElement.getContext('2d', {
			alpha: false,
			desynchronized: true,
		});
	}

	public static getInstance(): GameWindow {
		if (!this.instance) {
			this.instance = new this();
		}
		return this.instance;
	}

	public addEventListeners(): void {
		window.addEventListener('resize', this.onResizeEvent.bind(this));
		this.canvasElement.addEventListener('click', this.onClickEvent.bind(this));
		this.canvasElement.addEventListener(
			'mousemove',
			this.onMouseMoveEvent.bind(this),
		);
		this.canvasElement.addEventListener(
			'touchmove',
			this.onTouchMoveEvent.bind(this),
		);
	}

	private onResizeEvent(): void {
		// In a timeout, as browser first fires the resize event before redrawing elements.
		setTimeout(this.setSizeFromOffsetSize.bind(this), 1);
	}

	private setSizeFromOffsetSize(): void {
		this.canvasElement.width = this.canvasElement.offsetWidth;
		this.canvasElement.height = this.canvasElement.offsetHeight;
		this.width = this.canvasElement.width;
		this.height = this.canvasElement.height;
	}

	private onClickEvent(e: PointerEvent): void {
		e.preventDefault();
		const canvasBoundingBox = this.canvasElement.getBoundingClientRect();
		const mousePosition = new Position(
			((e.clientX - canvasBoundingBox.left) /
				(canvasBoundingBox.right - canvasBoundingBox.left)) *
				this.canvasElement.width,
			((e.clientY - canvasBoundingBox.top) /
				(canvasBoundingBox.bottom - canvasBoundingBox.top)) *
				this.canvasElement.height,
		);

		SceneManager.getInstance().getScene().onMouseClick(mousePosition);
	}

	private onMouseMoveEvent(e: MouseEvent): void {
		e.preventDefault();
		const canvasBoundingBox = this.canvasElement.getBoundingClientRect();
		const mousePosition = new Position(
			((e.clientX - canvasBoundingBox.left) /
				(canvasBoundingBox.right - canvasBoundingBox.left)) *
				this.canvasElement.width,
			((e.clientY - canvasBoundingBox.top) /
				(canvasBoundingBox.bottom - canvasBoundingBox.top)) *
				this.canvasElement.height,
		);

		SceneManager.getInstance().getScene().onMouseMove(mousePosition);
	}

	private onTouchMoveEvent(e: TouchEvent): void {
		e.preventDefault();
		const canvasBoundingBox = this.canvasElement.getBoundingClientRect();
		const mousePosition = new Position(
			((e.touches[0].clientX - canvasBoundingBox.left) /
				(canvasBoundingBox.right - canvasBoundingBox.left)) *
				this.canvasElement.width,
			((e.touches[0].clientY - canvasBoundingBox.top) /
				(canvasBoundingBox.bottom - canvasBoundingBox.top)) *
				this.canvasElement.height,
		);

		SceneManager.getInstance().getScene().onMouseMove(mousePosition);
	}

	public getContext2D(): CanvasRenderingContext2D {
		return this.context2D;
	}

	public getCanvasElement(): HTMLCanvasElement {
		return this.canvasElement;
	}

	public getWidth(): number {
		return this.width;
	}

	public getHeight(): number {
		return this.height;
	}
}
