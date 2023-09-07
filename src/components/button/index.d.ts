import { IconProps } from '../icon';
export type ControlsProps = {
    buttons: typeof Button[];
};
export declare const Controls: (props: ControlsProps) => void;
export type ButtonProps = {
    textContent?: string;
    action?(event: MouseEvent): void;
    icon?: IconProps;
    controls?: ControlsProps['buttons'];
};
export declare const Button: (props: ButtonProps) => any;
