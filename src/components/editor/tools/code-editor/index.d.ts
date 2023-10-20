import { CustomElement, State } from 'thorium-framework';
import { OutputBlockData, OutputData } from '@editorjs/editorjs';
import { os } from '@neutralinojs/lib';
import { editorState } from '../../';
type EditorContainerElement = CustomElement<HTMLDivElement, {
    children: {
        "editor": CustomElement<HTMLDivElement, {}>;
    };
}>;
export declare const TypescriptEditor: (props: {
    editorState: State<CodeEditor>;
}) => EditorContainerElement;
export declare const StyleEditor: (props: {
    editorState: State<CodeEditor>;
}) => EditorContainerElement;
export declare const HTMLViewer: (props: {
    editorState: State<CodeEditor>;
}) => any;
export type CodeEditorElement = CustomElement<HTMLDivElement, {
    state: State<CodeEditor>;
    get_typescriptEditor(): CustomElement<HTMLElement, {}>;
    show_typescritEditor(): void;
    show_codeViewer(): void;
    get_styleEditor(): CustomElement<HTMLElement, {}>;
    show_styleEditor(): void;
    get_codeViewer(): CustomElement<HTMLElement, {}>;
    show_codeViewer(): void;
    hide_all(): void;
}>;
export interface ICodeBlockEditorConfigData extends OutputData {
    codeBlockId: `${string}-${string}-${string}-${string}-${string}`;
}
export interface ICodeBlockEditorConfig extends OutputBlockData {
    data: ICodeBlockEditorConfigData;
}
export interface IEnvironements {
    codeBlockId: string;
    _publicPath: string[];
    publicPath: string;
    _codeBlockEnvPath: string[];
    codeBlockEnvPath: string;
    _envPath: string[];
    envPath: string;
    _envSrcPath: string[];
    envSrcPath: string;
    _envDistPath: string[];
    envDistPath: string;
    _packageJsonPath: string[];
    packageJsonPath: string;
    _tsconfigSrcPath: string[];
    tsconfigSrcPath: string;
    _indexSrcPath: string[];
    indexSrcPath: string;
    _globalsDTsPath: string[];
    globalsDTsPath: string;
    _styleSrcPath: string[];
    styleSrcPath: string;
}
export declare const defineEnvironement: (codeBlockId: string) => IEnvironements;
export declare class CodeEditor {
    state: State<CodeEditor> | null;
    codeBlockId: ICodeBlockEditorConfigData['codeBlockId'];
    codeBlockEnvPaths: IEnvironements;
    watcherPidStateManager: [State<number>, (value: number) => number];
    get watcherIdState(): State<number>;
    set watcherId(pid: number);
    get watcherId(): number;
    static get toolbox(): {
        title: string;
        icon: string;
    };
    static get enableLineBreaks(): boolean;
    constructor(config: ICodeBlockEditorConfig);
    onChange(): void;
    ensureRepertoryIntegrity(): Promise<boolean>;
    launchCompilationWatcher(): Promise<os.SpawnedProcess>;
    compile(): void;
    updateViewer(): void;
    render(): CodeEditorElement;
    save(blockContent: CodeEditorElement): {
        codeBlockId: `${string}-${string}-${string}-${string}-${string}`;
    };
}
export {};
