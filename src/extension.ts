import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	console.log('Extension activated');
	let disposable = vscode.workspace.onWillSaveTextDocument((event) => {
		console.log(`Document will be saved: ${event.document.fileName}`);
		if (event.document.languageId === 'html' || event.document.languageId === 'javascript' || event.document.languageId === 'typescript') {
			event.waitUntil(sortClassNames(event.document));
		}
	});

	context.subscriptions.push(disposable);
}

async function sortClassNames(document: vscode.TextDocument): Promise<vscode.TextEdit[]> {
	console.log(`Sorting class names for document: ${document.fileName}`); 
	const text = document.getText();
	const classRegex = /class(?:Name)?="([^"]*)"/g;

	let edits: vscode.TextEdit[] = [];
	let match: RegExpExecArray | null;

	while ((match = classRegex.exec(text)) !== null) {
		const [fullMatch, classList] = match;
		const sortedClassList = classList.split(' ')
			.filter(Boolean)
			.sort()
			.join(' ');

		if (classList !== sortedClassList) {
			const startPos = document.positionAt(match.index + 7);
			const endPos = document.positionAt(match.index + fullMatch.length - 1);

			edits.push(vscode.TextEdit.replace(new vscode.Range(startPos, endPos), sortedClassList));
		}
	}

	return edits;
}

export function deactivate() { }