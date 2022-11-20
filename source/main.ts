'use strict';

import { workspace, Disposable, ExtensionContext } from 'vscode';
import { LanguageClient, LanguageClientOptions, SettingMonitor, ServerOptions, TransportKind, InitializeParams } from 'vscode-languageclient';
import { Trace } from 'vscode-jsonrpc';

export function activate(context: ExtensionContext) {

    let reni = 'a:/develop/Reni/dev/out/Debug/ReniLSP.exe';
    let reniServerOptions: ServerOptions = {
        run: { command: reni },
        debug: { command: reni }
    }

    // Options to control the language client
    let clientOptions: LanguageClientOptions = {
        documentSelector: [
            {
                language: "reni",
                scheme: "file"
            }
        ],
        synchronize: {
            configurationSection: 'reni.lang',
            fileEvents: workspace.createFileSystemWatcher('**/*.reni')
        },
    }

    // Create the language client and start the client.
    const client = new LanguageClient('reni.lang', 'reni language', reniServerOptions, clientOptions);
    client.trace = Trace.Verbose;
    let disposable = client.start();

    // Push the disposable to the context's subscriptions so that the
    // client can be deactivated on extension deactivation
    context.subscriptions.push(disposable);
}