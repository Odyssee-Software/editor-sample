import { CustomElement } from 'thorium-framework';
import { IconProps, IconContainerElement } from '../icon';
import { ControlsElement, ControlsProps } from '../controls';
import { CustomElementDefultProps } from '../';
export type ButtonTextElement = CustomElement<HTMLParagraphElement, {}>;
export type ButtonElement<ControlsChildren = Record<string, CustomElement<Element, {}>>> = CustomElement<HTMLButtonElement, {
    controls(): ControlsElement<ControlsChildren>;
    icon(): IconContainerElement;
    children: {
        icon?: IconContainerElement;
        controls?: ControlsElement<ControlsChildren>;
        text?: ButtonTextElement;
    };
    buttonElement: ButtonContentElement;
    textElement: ButtonContentTextElement;
    iconElement: any;
    controlsElement: any;
    text: string;
}>;
export type ButtonProps = {
    textContent?: string;
    action?(event: MouseEvent): void;
    icon?: IconProps;
    controls?: ControlsProps['buttons'];
    className?: string;
} & CustomElementDefultProps;
export type ButtonChildAreaElement = CustomElement<HTMLUnknownElement, {
    children: {
        ['button']: any;
    };
}>;
export type ButtonContentTextElement = CustomElement<HTMLParagraphElement, {}>;
export type ButtonContentElement = CustomElement<HTMLButtonElement, {
    children: {
        ['icon']: {};
        ['controls']: {};
        ['text']: ButtonContentTextElement;
    };
}>;
export declare const ButtonPatern: import("thorium-framework").CustomElementPatern<unknown, unknown>;
export declare const ButttonConnector: (connectorTemplate?: import("thorium-framework").ConnectorTemplate<any> | undefined) => import("thorium-framework").NodeTemplate<any>;
export declare const Button: (props: ButtonProps) => ButtonElement;
