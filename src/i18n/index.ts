import { moment } from "obsidian";

import * as en from "./locales/en.json" with { type: "json" };
import * as fr from "./locales/fr.json" with { type: "json" };

export const resources = {
	fr,
	en,
};
const localeUsed: string = window.localStorage.language || moment.locale();
export const translationLanguage = Object.keys(resources).find(
	(i) => i.toLocaleLowerCase() == localeUsed.toLowerCase()
)
	? localeUsed.toLowerCase()
	: "en";

export const ln = i18next.createInstance();
