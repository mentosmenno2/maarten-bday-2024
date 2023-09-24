import { AbstractAudio } from './Audio/AbstractAudio.js';
import { ButtonClick } from './Audio/ButtonClick.js';
import { AbstractImage } from './Images/AbstractImage.js';
import { AbstractVideo } from './Videos/AbstractVideo.js';
import { OneYearAgo } from './Videos/OneYearAgo.js';

export class AssetManager {
	private static instance: AssetManager | null;

	private images: Map<string, AbstractImage>;
	private audio: Map<string, AbstractAudio>;
	private videos: Map<string, AbstractVideo>;

	private musicVolume: number;
	private musicVolumeInputElement: HTMLInputElement;
	private musicVolumeValueElement: HTMLSpanElement;

	private effectvolume: number;
	private effectVolumeInputElement: HTMLInputElement;
	private effectVolumeValueElement: HTMLSpanElement;

	private constructor() {
		this.musicVolumeInputElement = <HTMLInputElement>document.getElementById( 'volume-audio-music-input' );
		this.musicVolumeValueElement = <HTMLSpanElement>document.getElementById( 'volume-audio-music-label-value' );

		this.effectVolumeInputElement = <HTMLInputElement>document.getElementById( 'volume-audio-effect-input' );
		this.effectVolumeValueElement = <HTMLSpanElement>document.getElementById( 'volume-audio-effect-label-value' );

		this.images = new Map(
			Object.entries({

			}),
		);

		this.audio = new Map(
			Object.entries({
				buttonClick: new ButtonClick(),
			}),
		);

		this.videos = new Map(
			Object.entries({
				oneYearAgo: new OneYearAgo(),
			}),
		);

		// Set volumes after defining assets
		this.setMusicVolume(20);
		this.setEffectVolume(100);
	}

	public static getInstance(): AssetManager {
		if (!this.instance) {
			this.instance = new this();
		}
		return this.instance;
	}

	public addEventListeners(): void {
		this.musicVolumeInputElement.addEventListener( 'change', this.onChangeMusicVolume.bind(this) );
		this.musicVolumeInputElement.addEventListener( 'input', this.onChangeMusicVolume.bind(this) );

		this.effectVolumeInputElement.addEventListener( 'change', this.onChangeEffectVolume.bind(this) );
		this.effectVolumeInputElement.addEventListener( 'input', this.onChangeEffectVolume.bind(this) );
	}

	private onChangeMusicVolume(): void {
		this.setMusicVolume( Number(this.musicVolumeInputElement.value) );
	}

	private onChangeEffectVolume(): void {
		this.setEffectVolume( Number(this.effectVolumeInputElement.value) );
	}

	public getLoadedPercentage(): number {
		const totalAssets = this.audio.size + this.videos.size;
		let loadedAssets = 0;
		this.audio.forEach((audioObject: AbstractAudio) => {
			if (audioObject.isLoaded()) {
				loadedAssets++;
			}
		});
		this.videos.forEach((videoObject: AbstractVideo) => {
			if (videoObject.isLoaded()) {
				loadedAssets++;
			}
		});
		return (loadedAssets / totalAssets) * 100;
	}

	public getImages(): Map<string, AbstractImage> {
		return this.images;
	}

	public getAudio(): Map<string, AbstractAudio> {
		return this.audio;
	}

	public getVideos(): Map<string, AbstractVideo> {
		return this.videos;
	}

	public loadAssets(): void {
		this.audio.forEach((audioObject: AbstractAudio) => {
			audioObject.load();
		});
		this.videos.forEach((videoObject: AbstractVideo) => {
			videoObject.load();
		});
	}

	private setMusicVolume( volume: number ): void {
		this.musicVolume = volume;
		this.musicVolumeInputElement.value = String(this.musicVolume);
		this.musicVolumeValueElement.textContent = String(this.musicVolume);

		this.videos.forEach((videoObject: AbstractVideo) => {
			videoObject.getVideoElement().volume = this.musicVolume / 100;
		});
	}

	private setEffectVolume( volume: number ): void {
		this.effectvolume = volume;
		this.effectVolumeInputElement.value = String(this.effectvolume);
		this.effectVolumeValueElement.textContent = String(this.effectvolume);
	}
}
