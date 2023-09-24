import { AbstractVideo } from './Videos/AbstractVideo.js';
import { OneYearAgo } from './Videos/OneYearAgo.js';

export class AssetManager {
	private static instance: AssetManager | null;

	protected videos: Map<string, AbstractVideo>;

	private constructor() {
		this.videos = new Map(
			Object.entries({
				oneYearAgo: new OneYearAgo(),
			}),
		);
	}

	public static getInstance(): AssetManager {
		if (!this.instance) {
			this.instance = new this();
		}
		return this.instance;
	}

	public getLoadedPercentage(): number {
		const totalAssets = this.videos.size;
		let loadedAssets = 0;
		this.videos.forEach((videoObject: AbstractVideo) => {
			if (videoObject.isLoaded()) {
				loadedAssets++;
			}
		});
		return (loadedAssets / totalAssets) * 100;
	}

	public getVideos(): Map<string, AbstractVideo> {
		return this.videos;
	}

	public loadAssets(): void {
		this.videos.forEach((videoObject: AbstractVideo) => {
			videoObject.load();
		});
	}
}
