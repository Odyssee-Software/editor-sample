import { CustomElement } from 'thorium-framework';
import { ButtonElement } from '@thorium-components/button';
export type PageControlElement = CustomElement<HTMLDivElement, {
    children: {
        "page-selector": ButtonElement<{
            "page-edit": ButtonElement;
            "page-delete": ButtonElement;
            "page-options": ButtonElement;
        }>;
    };
}>;
export type TSideSheet = CustomElement<HTMLDivElement, {
    close(): void;
}>;
export declare const SideSheet: (props: {}) => any;
