import { CustomElement } from 'thorium-framework';
export type IconProps = {
    type: 'background' | 'mask';
    path: string;
};
export type IconElement = CustomElement<HTMLUnknownElement, {}>;
export type IconContainerElement = CustomElement<HTMLDivElement, {
    children: {
        icon: IconElement;
    };
}>;
export declare const Icon: (props: IconProps) => any;
