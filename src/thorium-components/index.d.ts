import { CustomElement } from 'thorium-framework';
export type CustomMouseEvent = MouseEvent & {
    target: CustomElementTarget;
};
export type CustomElementTarget = CustomElement<Element, ({} & CustomElementDefultProps)>;
export type CustomElementDefultProps = {
    id?: string;
    name?: string;
    className?: string;
    childrens?: any[];
    _afterMounting?(target: any): void;
};
export * from './button';
export * from './controls';
export * from './divider';
export * from './icon';
export * from './contextual-menu';
export * from './input';
export * from './input2';
