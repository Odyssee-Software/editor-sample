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
