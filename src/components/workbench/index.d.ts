import { CustomElement } from 'thorium-framework';
import { State } from 'thorium-framework/modules/states';
import EditorJS, { ToolConfig, ToolConstructable, ToolSettings, BlockToolConstructable, BlockToolConstructorOptions } from '@editorjs/editorjs';
import { ExternalToolSettings } from '@editorjs/editorjs/types/tools';
export { ToolConfig, ToolConstructable, ToolSettings, BlockToolConstructable, BlockToolConstructorOptions, ExternalToolSettings };
export type TEditorStateManager = [State<IEditor | null>, (value: IEditor | null) => IEditor | null];
export interface IEditor {
    configuration: {
        id: string;
        name: string;
        content: any[];
        type?: any;
    };
    editor: EditorJS;
}
export interface INoteEditorBlock<T> {
    config: T | null;
    toolbox: {
        title: string;
        icon: string;
    };
    enableLineBreaks: boolean;
    settings: any[];
    render(): CustomElement<any, any>;
    save(): Record<string, any>;
}
export interface IConfiguredNoteEditorBlock extends ExternalToolSettings {
}
export type NoteEditorBlockConf = ToolConfig;
export declare const configureNoteEditorBlock: (binder: ToolConstructable, config: NoteEditorBlockConf) => IConfiguredNoteEditorBlock;
export declare function createNoteEditorBlock(binder: ToolConstructable): ToolConstructable;
export declare class _Workbench {
    element: any;
    get container(): CustomElement<HTMLDivElement, {}>;
    editorManager: any;
    get editor(): any;
    set editor(value: any);
    get states(): {
        editor: any;
    };
    constructor(props: {
        ref: any;
        editorManager: any;
    });
    static afterMounting(plugins: any): (target: any) => any;
}
export interface WorkbenchProps {
    plugins: Record<string, (ToolConstructable | ToolSettings)>;
}
export declare const WorkbenchContext: () => any;
export declare const Workbench: (props: WorkbenchProps) => any;
