import { WorkbenchProps } from "@components/workbench";
import { CustomElement } from 'thorium-framework';
export declare class _Workspace {
    element: WorkspaceElement;
    get container(): HTMLElement | null;
    workbenchManager: any;
    get workbench(): any;
    set workbench(value: any);
    get states(): {
        workbench: any;
    };
    constructor(props: {
        ref: WorkspaceElement;
        workbenchManager: any;
    });
}
export type WorkspaceElement = CustomElement<HTMLDivElement, _Workspace>;
export interface WorkspaceProps {
    pluginPages: any[];
    pluginBlocks: WorkbenchProps['plugins'];
}
export declare const WorkspaceContext: () => void;
export declare const Workspace: (props: WorkspaceProps) => any;
