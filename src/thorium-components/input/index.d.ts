import { CustomElement, INodeTemplate } from "thorium-framework";
import { CustomElementDefultProps } from '../index';
export type InputElement = CustomElement<HTMLDivElement, {
    value: string;
    input: CustomElement<HTMLInputElement, {}>;
    children: {
        input: CustomElement<HTMLInputElement, {}>;
    };
}>;
export declare const InputPatern: import("thorium-framework").ICustomElementPatern<unknown, unknown>;
export declare const InputConnector: (connectorTemplate?: import("thorium-framework").IConnectorTemplate<any> | undefined) => INodeTemplate<any>;
export interface InputProps extends CustomElementDefultProps {
    type?: string;
    placeholder?: string;
    value?: string;
    min?: string;
    max?: string;
    onchange?(event: Event): void;
}
export declare const Input: (props: InputProps) => INodeTemplate<InputElement>;
