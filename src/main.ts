import { Plugin, type FileView } from "obsidian";

export default class ShortcutEditMode extends Plugin {
	button!: {
		live: {
			icon: string;
			tooltip: string;
		};
		source: {
			icon: string;
			tooltip: string;
		};
	};
	async onload() {
		console.log(`[${this.manifest.name}] Loaded`);
		const translation = {
			switch: i18next.t("interface.menu.toggle-source-mode"),
			live: i18next.t("plugins.editor-status.edit-live-preview"),
			source: i18next.t("plugins.editor-status.edit-source"),
		};

		this.button = {
			live: {
				icon: "pencil-ruler",
				tooltip: translation.live,
			},
			source: {
				icon: "code",
				tooltip: translation.source,
			},
		};

		//add a button in the file header when switching between edit modes

		this.registerEvent(
			this.app.workspace.on("layout-change", () => {
				//get if file is opened in edit mode
				this.removeAction();
				const lpState = this.app.workspace.getActiveFileView();
				if (lpState && lpState.getState().mode === "source") {
					const mode = lpState.getState().source === true ? "source" : "live";
					this.reloadButton(mode, lpState);
				}
			})
		);
	}

	onunload() {
		this.removeAction();
		console.log(`[${this.manifest.name}] Unloaded`);
	}

	removeAction() {
		const action = document.querySelectorAll(".edit-mode-button");
		action.forEach((el) => {
			el.remove();
		});
	}

	addButton(mode: "source" | "live", lpState: FileView) {
		const action = lpState.addAction(
			this.button[mode].icon,
			this.button[mode].tooltip,
			() => {
				this.app.commands.executeCommandById("editor:toggle-source");
			}
		);
		action.addClass("edit-mode-button");
	}

	reloadButton(mode: "source" | "live", lpState: FileView) {
		this.removeAction();
		this.addButton(mode, lpState);
	}
}
