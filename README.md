# Open Terminal Here

A VS Code extension that opens a new terminal in the directory of the currently active file.

## Features

- Adds a command **Open Terminal Here** that launches a terminal in the folder of the active file.
- Names the new terminal after the file's folder (relative to the workspace when available).
- Command palette entry is available only when a file-backed editor is focused.

## Usage

1. Open a file or select a file/folder in VS Code.
2. Run **Open Terminal Here** from the Command Palette (⇧⌘P / Ctrl+Shift+P) or right-click and choose **Open Terminal Here** from the editor or Explorer context menu.
3. A new terminal tab appears, using the directory of the active file or selected item as its working directory.

## Development

- `npm install` to install dependencies.
- `npm run compile` to build the extension.

Packaging and publishing follow the standard VS Code extension workflow.
