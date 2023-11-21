import { CustomElement } from 'thorium-framework';
type EditorContainerElement = CustomElement<HTMLDivElement, {
    children: {
        "editor": CustomElement<HTMLDivElement, {}>;
    };
}>;
export declare const TypescriptEditor: () => EditorContainerElement;
export declare const StyleEditor: () => EditorContainerElement;
export type CodeEditorElement = CustomElement<HTMLDivElement, {
    get_typescriptEditor(): CustomElement<Element, {}>;
    show_typescritEditor(): void;
    show_styleEditor(): void;
}>;
export declare class CodeEditor {
<<<<<<< Updated upstream
=======
    context: import("thorium-store-context/dist/store-context").IStoreContext;
    codeBlockId: ICodeBlockEditorConfigData['codeBlockId'];
    codeBlockEnvPaths: IEnvironements;
    watcherPidStateManager: import("thorium-store-context/dist/store-context").IStoreState<number>;
    codeEditor: import("thorium-store-context/dist/store-context").IStoreState<null>;
    get watcherIdState(): import("thorium-framework/modules/states").TState<number>;
    set watcherId(pid: number);
    get watcherId(): number;
>>>>>>> Stashed changes
    static get toolbox(): {
        title: string;
        icon: string;
    };
    static get enableLineBreaks(): boolean;
    render(): CodeEditorElement;
    save(blockContent: any): {
        url: any;
    };
}
export {};
