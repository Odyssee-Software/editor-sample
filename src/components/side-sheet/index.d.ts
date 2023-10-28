import { CustomElement } from 'thorium-framework';
import { State } from 'thorium-framework';
export declare class _SideSheet {
    element: SideSheetElement;
    get container(): SideSheetElement;
    constructor(props: {
        ref: SideSheetElement;
    });
    close(): void;
}
export type SideSheetElement = CustomElement<HTMLDivElement, {
    close(): void;
}>;
export declare const SideSheet: (props: {
    sideSheetManager: [State<_SideSheet>, (_SideSheet: any) => _SideSheet];
}) => any;
