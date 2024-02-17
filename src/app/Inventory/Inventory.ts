import { AbstractItem } from "./Items/AbstractItem.js";

export class Inventory {
	private static instance: Inventory | null;

	private items: Array<AbstractItem> = [];

	public static getInstance(): Inventory {
		if (!this.instance) {
			this.instance = new this();
		}
		return this.instance;
	}

	public getItems(): Array<AbstractItem> {
		return this.items;
	}

	public getItem( index: number ): AbstractItem|null {
		return this[index] ?? null;
	}

	public addItem( item: AbstractItem ): void {
		this.items.push( item );
	}

	public deleteItem( index ): void {
		this.items.splice( index, 1 );
	}

	// eslint-disable-next-line @typescript-eslint/ban-types
	public hasItemOfType( itemType: Function ): boolean {
		for (let index = 0; index < this.items.length; index++) {
			if(this.items[index] instanceof itemType) {
				return true;
			}
		}
		return false;
	}
}
