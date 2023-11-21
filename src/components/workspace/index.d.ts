import { WorkbenchProps } from "@components/workbench";
export interface WorkspaceProps {
    pluginPages: any[];
    pluginBlocks: WorkbenchProps['plugins'];
}
export declare const Workspace: (props: WorkspaceProps) => any;
