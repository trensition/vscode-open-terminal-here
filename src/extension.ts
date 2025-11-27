import * as path from 'path';
import * as vscode from 'vscode';

type CwdInfo = { cwd: string; label: string } | null;

async function getCwdFromResource(resource: vscode.Uri): Promise<CwdInfo> {
  if (resource.scheme !== 'file') {
    return null;
  }

  const stat = await vscode.workspace.fs.stat(resource);
  const cwd = stat.type & vscode.FileType.Directory ? resource.fsPath : path.dirname(resource.fsPath);
  const workspaceFolder = vscode.workspace.getWorkspaceFolder(resource);
  const relativePath = workspaceFolder ? path.relative(workspaceFolder.uri.fsPath, cwd) : undefined;
  const label = relativePath && relativePath !== '' ? relativePath : path.basename(cwd) || cwd;

  return { cwd, label };
}

async function getActiveFileCwd(activeEditor: vscode.TextEditor | undefined): Promise<CwdInfo> {
  if (!activeEditor || activeEditor.document.isUntitled || activeEditor.document.uri.scheme !== 'file') {
    return null;
  }

  return getCwdFromResource(activeEditor.document.uri);
}

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand('extension.openTerminalHere', async (resource?: vscode.Uri) => {
    const cwdInfo = resource
      ? await getCwdFromResource(resource)
      : await getActiveFileCwd(vscode.window.activeTextEditor);

    if (!cwdInfo) {
      vscode.window.showErrorMessage('Open Terminal Here is only available for files and folders.');
      return;
    }

    const terminal = vscode.window.createTerminal({ name: `Terminal: ${cwdInfo.label}`, cwd: cwdInfo.cwd });
    terminal.show();
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}
