import { CustomElement, State } from 'thorium-framework';
import EditorJS, { ToolConfig, ToolConstructable, ToolSettings, BlockToolConstructable, BlockToolConstructorOptions } from '@editorjs/editorjs';
import { ExternalToolSettings } from '@editorjs/editorjs/types/tools';
import { _Editor } from '@components/workspace';
export { ToolConfig, ToolConstructable, ToolSettings, BlockToolConstructable, BlockToolConstructorOptions, ExternalToolSettings };
export type TEditorStateManager = [State<IEditor | null>, (value: IEditor | null) => IEditor | null];
export interface IEditor {
    configuration: {
        pageId: string;
        pageName: string;
        content: any[];
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
export interface NoteEditorProps {
    noteEditorManager: [State<_Editor>, (_NoteEditor: any) => _Editor];
    plugins: Record<string, (ToolConstructable | ToolSettings)>;
}
export declare const NoteEditor: (props: NoteEditorProps) => any;
