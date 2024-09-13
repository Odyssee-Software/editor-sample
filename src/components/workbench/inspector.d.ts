import { CustomElement, INodeTemplate } from "thorium-framework";
export type IInspectorElement = CustomElement<HTMLDivElement, {
    header(): CustomElement<HTMLDivElement, {}>;
    content(): CustomElement<HTMLDivElement, {}>;
    render(template: INodeTemplate<any>): void;
    show(): void;
    hide(): void;
    children: {
        header: CustomElement<HTMLDivElement, {}>;
        content: CustomElement<HTMLDivElement, {}>;
    };
}>;
export declare const Inspector: () => any;
