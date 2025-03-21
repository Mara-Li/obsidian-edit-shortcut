import { type App, PluginSettingTab, Setting } from "obsidian";
import { ln } from "./i18n";
import type { ShortcutEditSettings } from "./interfaces";
import type ShortcutEditMode from "./main";

export class ShorcutEditTab extends PluginSettingTab {
	plugin: ShortcutEditMode;
	settings: ShortcutEditSettings;

	constructor(app: App, plugin: ShortcutEditMode) {
		super(app, plugin);
		this.plugin = plugin;
		this.settings = this.plugin.settings;
	}

	display(): void {
		const { containerEl } = this;
		containerEl.empty();
		const translation = {
			live: i18next.t("plugins.editor-status.edit-live-preview"),
			source: i18next.t("plugins.editor-status.edit-source"),
			showViewHeader: i18next.t("setting.appearance.option-show-view-header"),
			preview: i18next.t("setting.editor.option-default-new-tab-view-reading"),
		};

		new Setting(containerEl)
			.setName(ln.t("settings.reverseButton.title"))
			.setDesc(ln.t("settings.reverseButton.desc"))
			.addToggle((toggle) => {
				toggle.setValue(this.settings.reverseButtonGraphics).onChange(async (value) => {
					this.settings.reverseButtonGraphics = value;
					await this.plugin.saveSettings();
					this.plugin.app.workspace.trigger("layout-change");
				});
			});

		new Setting(containerEl)
			.setName(ln.t("settings.includeReadingMode.title"))
			.setDesc(ln.t("settings.includeReadingMode.desc"))
			.addToggle((toggle) => {
				toggle.setValue(this.settings.includeReadingMode).onChange(async (value) => {
					this.settings.includeReadingMode = value;
					if (!value) {
						this.settings.removeReadingButton = false;
						this.plugin.showDefaultButton();
					}
					await this.plugin.saveSettings();
					this.display();
					//refresh the view
					this.plugin.app.workspace.trigger("layout-change");
				});
			});

		if (this.settings.includeReadingMode) {
			new Setting(containerEl)
				.setName(ln.t("settings.removeButton"))
				.addToggle((toggle) => {
					toggle
						.setValue(this.settings.removeReadingButton ?? false)
						.onChange(async (value) => {
							this.settings.removeReadingButton = value;
							await this.plugin.saveSettings();
							if (value) this.plugin.hideDefaultButton();
							else this.plugin.showDefaultButton();
						});
				});

			const orders = this.settings.order ?? ["live", "source", "preview"];
			new Setting(containerEl).setHeading().setName(ln.t("settings.orderToggle"));
			for (const mode of orders) {
				const isFirst = orders[0] === mode;
				const isLast = orders[orders.length - 1] === mode;
				new Setting(containerEl)
					.setName(translation[mode as keyof typeof translation])
					.addButton((button) => {
						button
							.setDisabled(isFirst)
							.setIcon("chevron-up")
							.setTooltip("Move up")
							.onClick(async () => {
								const index = orders.indexOf(mode);
								orders.splice(index, 1);
								orders.splice(index - 1, 0, mode);
								this.settings.order = orders;
								await this.plugin.saveSettings();
								this.display();
							});
					})
					.addButton((button) => {
						button
							.setDisabled(isLast)
							.setIcon("chevron-down")
							.setTooltip("Move down")
							.onClick(async () => {
								const index = orders.indexOf(mode);
								orders.splice(index, 1);
								orders.splice(index + 1, 0, mode);
								this.settings.order = orders;
								await this.plugin.saveSettings();
								this.display();
							});
					});
			}
		}
	}
}
