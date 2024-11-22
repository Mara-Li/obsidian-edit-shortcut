export type Button = {
	icon: string;
	tooltip: string;
}

export interface ShortcutEditSettings {
	includeReadingMode: boolean;
	removeReadingButton?: boolean;
	order?: Modes[];
}

export const DEFAULT_SETTINGS: ShortcutEditSettings = {
	includeReadingMode: false,
}

export type Modes = "live" | "source" | "preview";
