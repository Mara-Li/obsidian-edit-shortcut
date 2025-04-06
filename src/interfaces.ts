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
}

export const DEFAULT_SETTINGS: ShortcutEditSettings = {
	includeReadingMode: false,
	reverseButtonGraphics: false,
};

export type Modes = "live" | "source" | "preview";
