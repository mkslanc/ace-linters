import "ace-code/esm-resolver";
import {AceLanguageClient} from "ace-linters/build/ace-language-client";
import {addFormatCommand, createEditorWithLSP} from "../utils";
import {typescriptContent} from "../docs-example/typescript-example";
import {LanguageClientConfig} from "ace-linters/types/types/language-service";
import {createEditSession} from "ace-code";


let modes = [
    {name: "typescript", mode: "ace/mode/typescript", content: typescriptContent},
]
const serverData: LanguageClientConfig = {
    module: () => import("ace-linters/build/language-client"),
    modes: "typescript",
    type: "socket",
    socket: new WebSocket("ws://localhost:3030/typescript"),
}

let languageProvider = AceLanguageClient.for(serverData, {
    functionality: {
        //documentHighlights: false,
        //signatureHelp: false,
    }
});

const editor= createEditorWithLSP(modes[0], 0, languageProvider);

addFormatCommand(languageProvider);




/////// fileAPI part


// Import the necessary types
interface FileSystemFileHandle {
    getFile: () => Promise<File>;
}

interface FileSystemDirectoryHandle {
    getDirectory: (name: string, options?: { create?: boolean }) => Promise<FileSystemDirectoryHandle>;
    getFile: (name: string, options?: { create?: boolean }) => Promise<FileSystemFileHandle>;
    entries: () => AsyncIterableIterator<FileSystemHandle>;
}

// Function to open a file
async function openFile() {
    // Check for File System Access API support
    if (!('showOpenFilePicker' in window)) {
        console.error('File System Access API is not supported in this browser.');
        return;
    }

    try {
        // Open the file picker
        const [fileHandle]: FileSystemFileHandle[] = await (window as any).showOpenFilePicker();
        const file = await fileHandle.getFile();
        const content = await readFileContent(file);
        languageProvider.closeDocument(editor.session);
        
        let session = createEditSession(content, "ace/mode/typescript");
        session["documentUri"] = file.name;
        editor.setSession(session);
        
        document.getElementById('titleId').innerText = file.name;
        console.log(`File: ${file.name}`);
        console.log(`Content: ${content}`);
    } catch (error) {
        console.error('Error opening file:', error);
    }
}

async function openDirectory() {
    // Check for File System Access API support
    if (!('showDirectoryPicker' in window)) {
        console.error('File System Access API is not supported in this browser.');
        return;
    }

    try {
        // Open the directory picker
        const directoryHandle: FileSystemDirectoryHandle = await (window as any).showDirectoryPicker();

        // Read the contents of the directory
        await loadRecursively(directoryHandle, "")
    } catch (error) {
        console.error('Error opening directory:', error);
    }
}

async function loadRecursively(directoryHandle: FileSystemDirectoryHandle, path: string) {
    for await (const entry of directoryHandle.entries()) {
        const entryPath = `${path}/${entry[0]}`;
        if (entry[1].kind === 'file') {
            const fileHandle = entry[1];
            const file = await fileHandle.getFile();
            console.log(`File: ${entryPath}`);
            // Uncomment below if you want to read file content
            // const content = await readFileContent(file);
            // console.log(`Content: ${content}`);
        } else if (entry[1].kind === 'directory') {
            const directory = entry[1];
            console.log(`Directory: ${entryPath}`);
            await loadRecursively(directory, entryPath);
        }
    }
}

// Function to read file content
async function readFileContent(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = () => reject(reader.error);
        reader.readAsText(file);
    });
}

document.getElementById('openDirectoryButton')?.addEventListener('click', openDirectory);
document.getElementById('openFileButton')?.addEventListener('click', openFile);