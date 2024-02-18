import { DisplayOutputInterface } from './DisplayOutputInterface.js';
import { BiosStateDataInterface } from './State/BiosStateDataInterface.js';
import { HasStateDataInterface } from './State/HasStateDataInterface.js';
import { StateDataInterface } from './State/StateDataInterface.js';

export class Bios implements HasStateDataInterface, DisplayOutputInterface {
	private element: HTMLDivElement;

	constructor() {
		this.generateElement();
	}

	public getStateData(): StateDataInterface {
		return <BiosStateDataInterface>{};
	}

	public static fromStateData(stateData: BiosStateDataInterface): Bios {
		console.log(stateData);
		return new Bios();
	}

	public getElement(): HTMLElement {
		return this.element;
	}

	private generateElement(): void {
		const heading = document.createElement('h1');
		heading.innerText = 'Duckloader BIOS';
		heading.style.width = '100%';
		heading.style.fontSize = '40px';
		heading.style.textAlign = 'center';

		const selectBiosHeading = document.createElement('h2');
		selectBiosHeading.innerText = 'Select operating system';
		selectBiosHeading.style.width = '100%';
		selectBiosHeading.style.fontSize = '30px';
		selectBiosHeading.style.textAlign = 'center';

		// Hardcoded, please replace
		const operatingSystemButton = document.createElement('button');
		operatingSystemButton.innerText = 'DuckyOS';
		operatingSystemButton.style.borderWidth = '2px';
		operatingSystemButton.style.borderColor = '#00ff00';
		operatingSystemButton.style.backgroundColor = 'transparent';
		operatingSystemButton.style.color = '#00ff00';
		operatingSystemButton.style.padding = '10px';
		operatingSystemButton.style.cursor = 'pointer';
		const operatingSystemListItem = document.createElement('li');
		operatingSystemListItem.append(operatingSystemButton);

		const operatingSystemList = document.createElement('ul');
		operatingSystemList.style.margin = '0';
		operatingSystemList.style.padding = '0';
		operatingSystemList.style.listStyleType = 'none';
		operatingSystemList.append(operatingSystemListItem);

		const credits = document.createElement('footer');
		credits.innerText = 'Made by Mennowl in Portugeese';
		credits.style.width = '100%';
		credits.style.fontSize = '12px';
		credits.style.textAlign = 'center';
		credits.style.padding = '20px';

		this.element = document.createElement('div');
		this.element.id = 'bios';
		this.element.style.width = '100%';
		this.element.style.height = '100%';
		this.element.style.backgroundColor = 'black';
		this.element.style.color = '#00ff00';
		this.element.style.padding = '20px';
		this.element.style.display = 'flex';
		this.element.style.flexDirection = 'column';
		this.element.style.flexWrap = 'nowrap';
		this.element.style.justifyContent = 'flex-start';
		this.element.style.alignItems = 'center';
		this.element.append(
			heading,
			selectBiosHeading,
			operatingSystemList,
			credits,
		);
	}
}
