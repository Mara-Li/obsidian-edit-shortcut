import { type App, Modal, Setting, sanitizeHTMLToDom } from "obsidian";

import { ln } from "./i18n";

export class IgnoreModals extends Modal {
	constructor(app: App, onSubmit: (result: boolean) => void) {
		super(app);

		this.setContent(
			sanitizeHTMLToDom(
				`<p>${ln.t("ignoreModals.desc", {
					showViewHeader: i18next.t("setting.appearance.option-show-view-header"),
				})}</p>
				<p>${ln.t("ignoreModals.validation")}</p>`
			)
		);

		new Setting(this.contentEl)
			.addButton((btn) =>
				btn
					.setWarning()
					.setButtonText(ln.t("common.yes"))
					.onClick(() => {
						onSubmit(true);
						this.close();
					})
			)
			.addButton((btn) =>
				btn.setButtonText(ln.t("common.no")).onClick(() => {
					onSubmit(false);
					this.close();
				})
			);
	}
}
