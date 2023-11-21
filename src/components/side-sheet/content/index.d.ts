import { CustomElement } from 'thorium-framework';
import { ButtonElement } from '@thorium-components/button';
export type PageParams = {
    id: string;
    name: string;
    plugin: any;
};
export type PageControlElement = CustomElement<HTMLDivElement, {
    children: {
        "page-selector": ButtonElement<{
            "page-edit": ButtonElement;
            "page-delete": ButtonElement;
            "page-options": ButtonElement;
        }>;
    };
}>;
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
