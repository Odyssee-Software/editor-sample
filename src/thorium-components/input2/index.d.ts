import { NodeTemplate, CustomElement } from 'thorium-framework';
import { State } from 'thorium-framework/modules/states';
export type Input2Element = CustomElement<HTMLDivElement, {
    value: string;
    container: Input2Element["children"]["input-container"];
    input: Input2Element["container"]["children"]["input"];
    children: {
        "input-container": CustomElement<HTMLDivElement, {
            children: {
                "input": CustomElement<HTMLInputElement, {}>;
            };
        }>;
    };
}>;
export type _InputContainer = Input2Element['children']['input-container'];
export type _Input = _InputContainer['children']['input'];
export declare const Input2Patern: import("thorium-framework").CustomElementPatern<unknown, unknown>;
export declare const Input2Connector: (connectorTemplate?: import("thorium-framework").ConnectorTemplate<unknown> | undefined) => NodeTemplate<unknown>;
export interface Input2Props {
    label?: string;
    value: string | [State<string>, (value: string) => string];
}
export declare const Input2: (props: Input2Props) => NodeTemplate<Input2Element>;
