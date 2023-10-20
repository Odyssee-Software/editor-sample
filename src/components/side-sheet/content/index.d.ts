import { CustomElement } from 'thorium-framework';
import { ButtonElement } from '@thorium-components/button';
export type PageParams = {
    id: string;
    name: string;
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
export declare const SideSheetContent: (props: {}) => any;
