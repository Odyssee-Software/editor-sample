import { CustomElement, NodeTemplate } from "thorium-framework";
export type IInspectorElement = CustomElement<HTMLDivElement, {
    header(): CustomElement<HTMLDivElement, {}>;
    content(): CustomElement<HTMLDivElement, {}>;
    render(template: NodeTemplate<any>): void;
    show(): void;
    hide(): void;
    children: {
        header: CustomElement<HTMLDivElement, {}>;
        content: CustomElement<HTMLDivElement, {}>;
    };
}>;
export declare const Inspector: () => any;
