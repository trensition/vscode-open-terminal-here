# Open Terminal Here

A VS Code extension that opens a new terminal in the directory of the currently active file.

## Features

- Adds a command **Open Terminal Here** that launches a terminal in the folder of the active file.
- Names the new terminal after the file's folder (relative to the workspace when available).
- Command palette entry is available only when a file-backed editor is focused.

## Usage

1. Open a file in VS Code.
2. Run **Open Terminal Here** from the Command Palette (⇧⌘P / Ctrl+Shift+P).
3. A new terminal tab appears, using the directory of the active file as its working directory.

## Development

- `npm install` to install dependencies.
- `npm run compile` to build the extension.

### Run the extension locally

1. Install dependencies with `npm install`.
2. Start a build/watch process in a terminal with `npm run watch` (or run `npm run compile` for a one-time build).
3. Open this folder in VS Code and press **F5** (or run **Debug: Start Debugging**) to launch an Extension Development Host with the extension loaded.
4. In the Extension Development Host, open a file and run **Open Terminal Here** from the Command Palette to verify behavior.

### Bundle and deploy a VSIX

1. Ensure the extension is built: `npm run compile`.
2. Package the extension with [`vsce`](https://github.com/microsoft/vscode-vsce):
   - Install if needed: `npm install -g @vscode/vsce`.
   - Create the package: `npx @vscode/vsce package` (outputs a `.vsix` file in the project root).
3. Install the generated VSIX into VS Code with `code --install-extension <package-name>.vsix` (replace the file name as generated in step 2).

Publishing to the Marketplace follows the standard `vsce publish` flow using your publisher and Personal Access Token.
