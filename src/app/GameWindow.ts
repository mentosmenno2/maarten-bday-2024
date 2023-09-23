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
		window.addEventListener('resize', this.onResize.bind(this));
	}

	private onResize(): void {
		// In a timeout, as browser first fires the resize event before redrawing elements.
		setTimeout(() => {
			this.canvasElement.width = this.canvasElement.offsetWidth;
			this.canvasElement.height = this.canvasElement.offsetHeight;
			this.width = this.canvasElement.width;
			this.height = this.canvasElement.height;
		}, 1);
	}

	public getContext2D(): CanvasRenderingContext2D {
		return this.context2D;
	}

	public getWidth(): number {
		return this.width;
	}

	public getHeight(): number {
		return this.height;
	}
}
