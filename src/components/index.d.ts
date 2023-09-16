import { CustomElement } from 'thorium-framework';
export type CustomMouseEvent = MouseEvent & {
    target: CustomElementTarget;
};
export type CustomElementTarget = CustomElement<Element, ({} & CustomElementDefultProps)>;
export type CustomElementDefultProps = {
    id?: string;
    name?: string;
    className?: string;
};
