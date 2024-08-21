import { Plugin } from "obsidian";

export default class FileHeaderShortcutsEditModes extends Plugin {

	async onload() {
		console.log(`[${this.manifest.name}] Loaded`)
		
	}

	onunload() {
		console.log(`[${this.manifest.name}] Unloaded`);
	}

}



