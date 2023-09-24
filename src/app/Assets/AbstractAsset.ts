export abstract class AbstractAsset {
	protected file: string;
	protected loaded: boolean = false;

	public abstract load(): void;

	protected onLoad(): void {
		this.loaded = true;
	}

	public isLoaded(): boolean {
		return this.loaded;
	}
}
