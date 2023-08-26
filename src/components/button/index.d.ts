import { IconProps } from '../icon';
export declare const Button: (props: {
    textContent: string;
    action?(event: MouseEvent): void;
}) => any;
export declare const ButtonIcon: (props: {
    textContent?: string | undefined;
    action?(event: MouseEvent): void;
    icon: IconProps;
}) => any;
