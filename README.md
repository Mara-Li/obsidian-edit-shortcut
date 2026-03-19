# File Header Shortcuts: Edit Modes

Add a button in file header in edit mode, to switch between source & live-preview.

Doesn't work if LP or file header is disabled

There are three settings:
- **Reverse button icons** — Display the next "mode" button in place of the current mode. For example, if you are in live preview, it will display the source icon instead of the live preview icon.
- **Include reading mode** — Include reading mode in the switch. One button will swap between a configurable order.
- **"All button" mode** — Each mode (source, live, and reading) are separated. <mark>This mode is not compatible with the two other option.</mark>

## All button mode

All icons will be displayed for each modes, in the file header, like this:
![Obsidian file header with default theme displaying the three icones for each modes](./docs/example.png)

The active mode will be highlighted and the hightlight move when switching the mode:
//@todo


## Styling
The plugin will use the following css class:
- `.edit-mode-button`: Button added in the file header
- `.edit-mode-hide`: Settings to hide the reading button
- `.edit-mode-default-button`: Reading button in the three mode behavior

The button in the three mode button will get the `is-active` class when necessary.

## 📥 Installation
- [x] From Obsidian's community plugins
- [x] Using BRAT with `https://github.com/Mara-Li/obsidian-shortcuts-LP_Source`
- [x] From the release page: 
    - Download the latest release
    - Unzip `shortcuts-edit-mode.zip` in `.obsidian/plugins/` path
    - In Obsidian settings, reload the plugin
    - Enable the plugin
