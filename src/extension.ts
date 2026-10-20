import * as vscode from 'vscode';
import { classEdits } from './sort';

const CFG = 'organizeClassnames';

function enabledFor(doc: vscode.TextDocument): boolean {
  const cfg = vscode.workspace.getConfiguration(CFG, doc);
  const langs = cfg.get<string[]>('languages', []);
  return langs.includes(doc.languageId);
}

function editsFor(doc: vscode.TextDocument): vscode.TextEdit[] {
  return classEdits(doc.getText()).map((e) =>
    vscode.TextEdit.replace(new vscode.Range(doc.positionAt(e.start), doc.positionAt(e.end)), e.text));
}

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.workspace.onWillSaveTextDocument((event) => {
      const cfg = vscode.workspace.getConfiguration(CFG, event.document);
      if (!cfg.get<boolean>('onSave', true) || !enabledFor(event.document)) return;
      event.waitUntil(Promise.resolve(editsFor(event.document)));
    }),
    vscode.commands.registerCommand('organizeClassnames.sort', async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) return;
      const edits = editsFor(editor.document);
      if (!edits.length) { vscode.window.setStatusBarMessage('Class names already sorted', 2000); return; }
      await editor.edit((b) => edits.forEach((e) => b.replace(e.range, e.newText)));
      vscode.window.setStatusBarMessage(`Sorted ${edits.length} class attribute${edits.length === 1 ? '' : 's'}`, 2000);
    }),
  );
}

export function deactivate() {}
