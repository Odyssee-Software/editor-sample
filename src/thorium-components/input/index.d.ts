import { CustomElement, NodeTemplate } from "thorium-framework";
import { CustomElementDefultProps } from '../index';
export type InputElement = CustomElement<HTMLDivElement, {
    value: string;
    input: CustomElement<HTMLInputElement, {}>;
    children: {
        input: CustomElement<HTMLInputElement, {}>;
    };
}>;
export declare const InputPatern: import("thorium-framework").CustomElementPatern<unknown, unknown>;
export declare const InputConnector: (connectorTemplate?: import("thorium-framework").ConnectorTemplate<any> | undefined) => NodeTemplate<any>;
export interface InputProps extends CustomElementDefultProps {
    type?: string;
    placeholder?: string;
    value?: string;
    min?: string;
    max?: string;
    onchange?(event: Event): void;
}
export declare const Input: (props: InputProps) => NodeTemplate<InputElement>;
