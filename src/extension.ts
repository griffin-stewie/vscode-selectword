'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerTextEditorCommand('extension.selectWord', editor => {

        let tempSelections:vscode.Selection[] = [];

        for (const selection of editor.selections) {
            // the Position object gives you the line and character where the cursor is
            const position = selection.active;

            // Get word range 
            var range = editor.document.getWordRangeAtPosition(position);

            if (range === undefined || range.isEmpty) {
                tempSelections.push(selection);
                continue;
            }

            // Select word
            const wordSelection = new vscode.Selection(range.start, range.end);
            tempSelections.push(wordSelection);
        }

        if (tempSelections.length > 0) {
            editor.selections = tempSelections;            
        }
    });

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}

