import { CustomElement } from "thorium-framework";
import { CustomElementDefultProps } from "..";
import { ButtonElement } from '@thorium-components/button';
import { DividerElement } from '@thorium-components/divider';
export type ContextualMenuElement = CustomElement<HTMLDivElement, {}>;
export type ContextualMenuProps = {
    target: Element;
    position: 'top' | 'right' | 'bottom' | 'left';
    childrens: ButtonElement | DividerElement[];
    afterMouning?(target: CustomElement<HTMLDivElement, {}>): void;
} & CustomElementDefultProps;
export declare const ContextualMenu: (props: ContextualMenuProps) => ContextualMenuElement;
