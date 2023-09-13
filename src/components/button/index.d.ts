import { IconProps } from '../icon';
export type ControlsProps = {
    buttons: any[];
};
export declare const Controls: (props: ControlsProps) => any;
export type ButtonProps = {
    textContent?: string;
    action?(event: MouseEvent): void;
    icon?: IconProps;
    controls?: ControlsProps['buttons'];
};
export declare const Button: (props: ButtonProps) => any;
