import { State } from 'thorium-framework';
import { CustomElementDefultProps } from '../';
export type WrapperItemProps = {};
export type WrapperOptions = {
    items: [State<string[]>, any];
    label?: string;
} & CustomElementDefultProps;
export declare const WrapperList: (props: WrapperOptions) => any;
