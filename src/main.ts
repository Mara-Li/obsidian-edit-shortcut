import {
	type FileView,
	Notice,
	Plugin,
	type WorkspaceLeaf,
	sanitizeHTMLToDom,
} from "obsidian";
import {
	type Button,
	DEFAULT_SETTINGS,
	type Modes,
	type ShortcutEditSettings,
} from "./interfaces";
import { ShorcutEditTab } from "./settings";

export default class ShortcutEditMode extends Plugin {
	settings!: ShortcutEditSettings;
	button!: {
		live: Button;
		source: Button;
		preview?: Button;
	};

	toggleMode(lpState: FileView) {
		const mode = this.getMode(lpState);
		if (this.settings.includeReadingMode) {
			const next = this.getNext(mode);
			if (next === "preview" || mode === "preview")
				this.app.commands.executeCommandById("markdown:toggle-preview");
			if (
				(mode === "live" && next === "source") ||
				(mode === "source" && next === "live")
			) {
				this.app.commands.executeCommandById("editor:toggle-source");
			} else {
				this.app.commands.executeCommandById("editor:toggle-source");
				sleep(1).then(() => {
					this.app.commands.executeCommandById("editor:toggle-source");
				});
			}
		} else this.app.commands.executeCommandById(`editor:toggle-source`);
	}

	async onload() {
		console.log(`[${this.manifest.name}] Loaded`);
		await this.loadSettings();
		this.addSettingTab(new ShorcutEditTab(this.app, this));

		const translation = {
			live: i18next.t("plugins.editor-status.edit-live-preview"),
			source: i18next.t("plugins.editor-status.edit-source"),
			showViewHeader: i18next.t("setting.appearance.option-show-view-header"),
			preview: i18next.t("setting.editor.option-default-new-tab-view-reading"),
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
			preview: {
				icon: "book-open",
				tooltip: translation.preview,
			},
		};

		//verify if live-preview/file-header is enabled
		const config = this.app.vault.config;
		const errorMessage = function (type: "livePreview" | "showViewHeader") {
			const isDisabled =
				type === "livePreview" ? translation.live : translation.showViewHeader;
			const text = `<span class="error">Error: « <u>${isDisabled}</u> » is disabled. Enable it in settings.</span>`;
			return sanitizeHTMLToDom(text);
		};
		if (config.livePreview === false || config.showViewHeader === false) {
			new Notice(
				errorMessage(config.livePreview === false ? "livePreview" : "showViewHeader"),
				0
			);
		}

		if (this.settings.removeReadingButton && this.settings.includeReadingMode) {
			this.hideDefaultButton();
		}

		this.enableMode();

		this.registerEvent(
			this.app.workspace.on("active-leaf-change", (leaf) => {
				this.setOnlyIfNotExists(leaf);
			})
		);
		this.registerEvent(
			this.app.workspace.on("layout-change", () => {
				this.removeAction();
				this.hideDefaultButton();
				this.enableMode();
			})
		);

		this.addCommand({
			id: "switch-mode",
			name: "Switch mode",
			checkCallback: (checking: boolean) => {
				const lpState = this.app.workspace.getActiveFileView();
				if (lpState) {
					if (!checking) {
						this.toggleMode(lpState);
					}
					return true;
				}
				return false;
			},
		});
	}

	hideDefaultButton() {
		if (this.settings.removeReadingButton && this.settings.includeReadingMode) {
			const button = document.querySelector(
				`.clickable-icon.view-action[aria-label*="${i18next.t("interface.menu.read-view")}"], .clickable-icon.view-action[aria-label*="${i18next.t("interface.menu.edit-view")}"]`
			);
			if (button) button.classList.add("edit-mode-hide");
		}
	}

	showDefaultButton() {
		const button = document.querySelector(
			`.clickable-icon.view-action[aria-label*="${i18next.t("interface.menu.read-view")}"], .clickable-icon.view-action[aria-label*="${i18next.t("interface.menu.edit-view")}"]`
		);
		if (button) button.classList.remove("edit-mode-hide");
	}

	setOnlyIfNotExists(leaf?: WorkspaceLeaf | null) {
		const view = leaf?.view;
		if (view) {
			const viewState = view.getState() as Record<string, unknown>;
			if (this.settings.includeReadingMode) {
				//@ts-ignore
				const viewAction = view.actionsEl?.querySelector(".edit-mode-button");
				if (!viewAction) this.enableMode();
			} else if (viewState.mode === "source") {
				//@ts-ignore
				const viewAction = view.actionsEl?.querySelector(".edit-mode-button");
				if (!viewAction) this.enableMode();
			}
		}
	}

	onunload() {
		this.removeAction();
		console.log(`[${this.manifest.name}] Unloaded`);
		this.showDefaultButton();
	}

	enableMode() {
		const lpState = this.app.workspace.getActiveFileView();
		if (lpState) {
			if (this.settings.includeReadingMode) {
				this.addButton(this.getMode(lpState), lpState);
			} else if (lpState.getState().mode === "source") {
				const mode = lpState.getState().source === true ? "source" : "live";
				this.addButton(mode, lpState);
			}
		}
	}

	getMode(lpState: FileView): Modes {
		const actualMode = lpState.getState().mode;
		if (actualMode === "source")
			return lpState.getState().source === true ? "source" : "live";
		return "preview";
	}

	getNext(actualMode: Modes) {
		const order = this.settings.order ?? ["live", "source", "preview"];
		const index = order.indexOf(actualMode);
		let next = index + 1;
		if (next >= order.length) next = 0;
		return order[next];
	}

	getPrevious(actualMode: Modes) {
		const order = this.settings.order ?? ["live", "source", "preview"];
		const index = order.indexOf(actualMode);
		let previous = index - 1;
		if (previous < 0) previous = order.length - 1;
		return order[previous];
	}

	removeAction() {
		const action = document.querySelectorAll(".edit-mode-button");
		action.forEach((el) => {
			el.remove();
		});
	}

	addButton(mode: Modes, lpState: FileView) {
		if (!this.button) new Error("Button is not defined");
		const action = lpState.addAction(
			this.button[mode]!.icon,
			this.button[mode]!.tooltip,
			() => {
				this.toggleMode(lpState);
			}
		);
		action.addClass("edit-mode-button");
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
