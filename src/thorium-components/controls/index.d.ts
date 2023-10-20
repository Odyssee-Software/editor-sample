import { CustomElement } from "thorium-framework";
export type ControlsProps = {
    buttons: any[];
};
export type ControlsElement<Children = Record<string, CustomElement<Element, {}>>> = CustomElement<HTMLDivElement, {
    name: "controls";
    children: Children;
}>;
export declare const Controls: (props: ControlsProps) => ControlsElement;
