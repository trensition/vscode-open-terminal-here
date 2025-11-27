import * as path from 'path';
import * as vscode from 'vscode';

function getActiveFileCwd(activeEditor: vscode.TextEditor | undefined): { cwd: string; label: string } | null {
  if (!activeEditor || activeEditor.document.isUntitled || activeEditor.document.uri.scheme !== 'file') {
    return null;
  }

  const filePath = activeEditor.document.uri.fsPath;
  const cwd = path.dirname(filePath);
  const workspaceFolder = vscode.workspace.getWorkspaceFolder(activeEditor.document.uri);
  const relativePath = workspaceFolder ? path.relative(workspaceFolder.uri.fsPath, cwd) : undefined;
  const label = relativePath && relativePath !== '' ? relativePath : path.basename(cwd) || cwd;

  return { cwd, label };
}

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand('extension.openTerminalHere', () => {
    const cwdInfo = getActiveFileCwd(vscode.window.activeTextEditor);

    if (!cwdInfo) {
      vscode.window.showErrorMessage('Open Terminal Here is only available when a file is open.');
      return;
    }

    const terminal = vscode.window.createTerminal({ name: `Terminal: ${cwdInfo.label}`, cwd: cwdInfo.cwd });
    terminal.show();
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}
