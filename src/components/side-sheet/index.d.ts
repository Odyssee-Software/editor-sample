import { CustomElement } from 'thorium-framework';
export declare class _SideSheet {
    element: SideSheetElement;
    get container(): CustomElement<HTMLDivElement, {}>;
    constructor(props: {
        ref: SideSheetElement;
    });
    close(): void;
    static afterMounting(manager: any): (target: any) => _SideSheet;
}
export type SideSheetElement = CustomElement<HTMLDivElement, {
    close(): void;
}>;
export declare const SideSheet: (props: {
    pluginPages: any[];
}) => any;
