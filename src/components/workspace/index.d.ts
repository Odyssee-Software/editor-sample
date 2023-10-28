import { NoteEditorProps } from "@components/note-editor";
import { _SideSheet } from "@components/side-sheet";
import { CustomElement, State } from 'thorium-framework';
export declare const APPAPI: {
    Workspace: () => {
        SideSheet: () => {};
        Editor: () => {};
    };
};
export declare class _Editor {
}
export declare class _Workspace {
    element: WorkspaceElement;
    get container(): HTMLElement | null;
    sideSheetManager: [State<_SideSheet>, (value: _SideSheet) => _SideSheet];
    editorManager: [State<_Editor>, (value: _Editor) => _Editor];
    get sideSheet(): _SideSheet;
    get editor(): _Editor;
    constructor(props: {
        ref: WorkspaceElement;
        sideSheetManager: [State<_SideSheet>, (value: _SideSheet) => _SideSheet];
        editorManager: [State<_Editor>, (value: _Editor) => _Editor];
    });
}
export type WorkspaceElement = CustomElement<HTMLDivElement, _Workspace>;
export interface WorkspaceProps {
    pluginPages?: any;
    pluginBlocks: NoteEditorProps['plugins'];
}
export declare const Workspace: (props: WorkspaceProps) => any;
