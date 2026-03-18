export type Button = {
	icon: string;
	tooltip: string;
};

export interface ShortcutEditSettings {
	includeReadingMode: boolean;
	reverseButtonGraphics: boolean;
	removeReadingButton?: boolean;
	ignoreWarning?: boolean;
	order?: Modes[];
	allButtonMode: boolean;
}

export const DEFAULT_SETTINGS: ShortcutEditSettings = {
	includeReadingMode: false,
	reverseButtonGraphics: false,
	allButtonMode: false,
};

export type Modes = "live" | "source" | "preview";
