import { CustomElement } from 'thorium-framework';
import { IconProps, IconContainerElement } from '../icon';
import { CustomElementDefultProps } from '../../components';
export type ControlsProps = {
    buttons: any[];
};
export type ControlsElement<Children = Record<string, CustomElement<Element, {}>>> = CustomElement<HTMLDivElement, {
    name: "controls";
    children: Children;
}>;
export declare const Controls: (props: ControlsProps) => ControlsElement;
export type ButtonTextElement = CustomElement<HTMLParagraphElement, {}>;
export type ButtonElement<ControlsChildren = Record<string, CustomElement<Element, {}>>> = CustomElement<HTMLButtonElement, {
    controls(): ControlsElement<ControlsChildren>;
    icon(): IconContainerElement;
    children: {
        icon?: IconContainerElement;
        controls?: ControlsElement<ControlsChildren>;
        text?: ButtonTextElement;
    };
}>;
export type ButtonProps = {
    textContent?: string;
    action?(event: MouseEvent): void;
    icon?: IconProps;
    controls?: ControlsProps['buttons'];
    className?: string;
} & CustomElementDefultProps;
export declare const Button: (props: ButtonProps) => ButtonElement;
