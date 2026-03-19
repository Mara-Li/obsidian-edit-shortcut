# File Header Shortcuts: Edit Modes

Add a button to the file header in edit mode to switch between Source and Live Preview.

Doesn't work if Live Preview or the file header is disabled.

There are three settings:
- **Reverse button icons** — Display the next mode button instead of the current one. For example, if you are in Live Preview, it will display the Source icon instead of the Live Preview icon.
- **Include reading mode** — Include Reading mode in the switch. One button will cycle through a configurable order.
- **"All button" mode** — Each mode (Source, Live Preview, and Reading) is separated. <mark>This mode is not compatible with the two other options.</mark>

## All button mode

All icons will be displayed for each mode in the file header, like this:
![Obsidian file header with the default theme displaying the three icons for each mode](./docs/example.png)

The active mode will be highlighted, and the highlight will move when switching modes:
![Obsidian file header in Live Preview mode, displaying the three icons where the active mode is highlighted with the `is-active` class.](./docs/3mode_lp.png)
![Obsidian file header in Source mode, displaying the three icons where the active mode is highlighted with the `is-active` class.](./docs/3mode_source.png)
![Obsidian file header in Reading mode, displaying the three icons where the active mode is highlighted with the `is-active` class.](./docs/3mode_reading.png)

> [!note]
> The Reading button is the default button. Its icon will change when switching to one of the edit modes.


## Styling
The plugin uses the following CSS classes:
- `.edit-mode-button`: Button added in the file header
- `.edit-mode-hide`: Class used to hide the Reading button
- `.edit-mode-default-button`: Reading button in the three-mode behavior

Buttons in the three-mode layout will get the `is-active` class when necessary.

## 📥 Installation
- [x] From Obsidian's community plugins
- [x] Using BRAT with `https://github.com/Mara-Li/obsidian-shortcuts-LP_Source`
- [x] From the release page: 
    - Download the latest release
    - Unzip `shortcuts-edit-mode.zip` into the `.obsidian/plugins/` path
    - In Obsidian settings, reload the plugin
    - Enable the plugin
