import { CustomElement } from 'thorium-framework';
export type PageParams = {
    id: string;
    name: string;
    plugin: any;
};
export type PageControlElement = CustomElement<HTMLDivElement, {}>;
export declare class _SideSheet_Content {
    element: any;
    get container(): CustomElement<HTMLDivElement, {}>;
    constructor(props: {
        ref: any;
    });
}
export declare const SideSheetContent: (props: {
    pluginPages: any[];
}) => any;
