"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = __importStar(require("vscode"));
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
function activate(context) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "easy-tkinter" is now active!');
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    const disposable = vscode.commands.registerCommand('easy-tkinter.main', async () => {
        // The code you place here will be executed every time your command is executed
        // Display a message box to the user
        const active_editor_path = await getAcitveEditor();
        if (!active_editor_path) {
            vscode.window.showErrorMessage(vscode.l10n.t('src.extension.no_active_editor'));
            return;
        }
        ;
        const directory_path = path.dirname(active_editor_path);
        const quickpick = vscode.window.createQuickPick();
        quickpick.title = vscode.l10n.t('src.extension.command.main.quickpick.title');
        quickpick.placeholder = vscode.l10n.t('src.extension.command.main.quickpick.placeholder');
        quickpick.items = [
            { label: '0. ', description: '---------------------' },
            { label: '1. ', description: vscode.l10n.t('src.extension.command.main.quickpick.1.desc') },
            { label: '2. ', description: vscode.l10n.t('src.extension.command.main.quickpick.2.desc') },
            { label: '3. ', description: vscode.l10n.t('src.extension.command.main.quickpick.3.desc') },
            { label: '4. ', description: vscode.l10n.t('src.extension.command.main.quickpick.4.desc') },
            { label: '5. ', description: vscode.l10n.t('src.extension.command.main.quickpick.5.desc') },
            { label: '6. ', description: vscode.l10n.t('src.extension.command.main.quickpick.6.desc') },
            { label: '7. ', description: vscode.l10n.t('src.extension.command.main.quickpick.7.desc') },
            { label: '8. ', description: vscode.l10n.t('src.extension.command.main.quickpick.8.desc') },
            { label: '9. ', description: vscode.l10n.t('src.extension.command.main.quickpick.9.desc') },
        ];
        quickpick.onDidAccept(async () => {
            const selectedop = quickpick.selectedItems[0];
            if (selectedop) {
                quickpick.dispose();
            }
            ;
            switch (selectedop.label) {
                case '0. ':
                    {
                        break;
                    }
                    ;
                case '1. ':
                    {
                        await copyFolder(genPathIn('resource'), genPath(directory_path), ['.gitkeep']);
                        break;
                    }
                    ;
                case '2. ':
                    {
                        const copy_command = 'virtualenv venv';
                        copyToClipboard(copy_command, `${vscode.l10n.t('src.extension.command.main.quickpick.hint')}${copy_command}`);
                        break;
                    }
                    ;
                case '3. ':
                    {
                        const copy_command = 'venv\\Scripts\\activate';
                        copyToClipboard(copy_command, `${vscode.l10n.t('src.extension.command.main.quickpick.hint')}${copy_command}`);
                        break;
                    }
                    ;
                case '4. ':
                    {
                        const copy_command = 'pip install pyinstaller';
                        copyToClipboard(copy_command, `${vscode.l10n.t('src.extension.command.main.quickpick.hint')}${copy_command}`);
                        break;
                    }
                    ;
                case '5. ':
                    {
                        const copy_command = 'pip freeze > requirements.txt';
                        copyToClipboard(copy_command, `${vscode.l10n.t('src.extension.command.main.quickpick.hint')}${copy_command}`);
                        break;
                    }
                    ;
                case '6. ':
                    {
                        break;
                    }
                    ;
                case '7. ':
                    {
                        const copy_command = 'python easy_tkinter_main.py';
                        copyToClipboard(copy_command, `${vscode.l10n.t('src.extension.command.main.quickpick.hint')}${copy_command}`);
                        break;
                    }
                    ;
                case '8. ':
                    {
                        break;
                    }
                    ;
                case '9. ':
                    {
                        const copy_command = 'pyinstaller easy_tkinter_main.spec';
                        copyToClipboard(copy_command, `${vscode.l10n.t('src.extension.command.main.quickpick.hint')}${copy_command}`);
                        break;
                    }
                    ;
            }
            ;
        });
        quickpick.show();
    });
    context.subscriptions.push(disposable);
}
// This method is called when your extension is deactivated
function deactivate() { }
async function getAcitveEditor() {
    const activeEditor = vscode.window.activeTextEditor;
    if (activeEditor) {
        return activeEditor.document.uri.fsPath;
    }
    return undefined;
}
;
async function copyFolder(source, target, excludeFiles) {
    // 创建目标文件夹
    await fs.promises.mkdir(target, { recursive: true });
    // 获取源文件夹的内容
    const files = await fs.promises.readdir(source, { withFileTypes: true });
    for (const file of files) {
        const sourcePath = path.join(source, file.name);
        const targetPath = path.join(target, file.name);
        // 检查是否为需要排除的文件
        if (excludeFiles.includes(file.name)) {
            continue;
        }
        if (file.isDirectory()) {
            // 如果是目录，则递归复制
            await copyFolder(sourcePath, targetPath, excludeFiles);
        }
        else {
            // 如果是文件，则直接复制
            await fs.promises.copyFile(sourcePath, targetPath);
        }
    }
}
;
async function copyToClipboard(text, hint) {
    await vscode.env.clipboard.writeText(text);
    vscode.window.showInformationMessage(hint);
}
;
////////////////////////////
function genPath(...args) {
    return path.join(...args);
}
;
function genPathIn(...args) {
    return path.join(__dirname, '..', ...args);
}
;
//# sourceMappingURL=extension.js.map