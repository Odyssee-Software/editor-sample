import { ToolConstructable, ToolSettings } from "@editorjs/editorjs";
interface IEditorPlugin {
    title: string;
    type: string;
    import: any[];
    export: any[];
    blocks: Record<string, (ToolConstructable | ToolSettings)>;
}
export declare class _plugin implements IEditorPlugin {
    get title(): string;
    get type(): string;
    get import(): any[];
    get export(): any[];
    get blocks(): Record<string, (ToolConstructable | ToolSettings)>;
    constructor();
}
export type EditorPlugin = Partial<IEditorPlugin> & typeof _plugin & Partial<typeof _plugin> & _plugin;
export {};
